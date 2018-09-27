import Vue from 'vue';
import Vuex from 'vuex';
// import { fs } from 'fs';
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		itemId: 2,
		loading: false,
		image: null,
		canvas: null,
		maxImgSize: 2000,
		frameImgs: '',
		goNow: false
	},
	mutations: {
		setItemId(state, id) {
			state.itemId = id;
		},
		image(state, image) {
			state.image = image;
		},
		loading(state, loading) {
			state.loading = loading;
		},
		canvas(state, canvas) {
			localStorage.setItem('canvas', canvas);
			state.canvas = canvas;
		},
		maxImgSize(state, maxImgSize) {
			state.maxImgSize = maxImgSize;
		},
		frameImgs(state, imgs) {
			state.frameImgs = imgs;
		}
	},
	getters: {
		itemId: (state) => state.itemId,
		loading: (state) => state.loading,
		frameImgs: (state) => state.frameImgs,
		goNow: (state) => state.goNow,
		image: (state) => state.image,
		canvas: (state) => {
			if (state.canvas) {
				return state.canvas;
			} else if (localStorage.getItem('canvas')) {
				return localStorage.getItem('canvas');
			}
		},
		maxImgSize: (state) => state.maxImgSize
	},
	actions: {
		chooseItem({ commit }, id) {
			commit('setItemId', id);
		},
		goNow({ state }, g) {
			state.goNow = g;
		},
		initFrames({ commit }, imgs) {
			commit('frameImgs', imgs);
		},
		upload({ commit }, data) {
			return new Promise((resolve, reject) => {
				if (data) {
					resolve(data);
					commit('canvas', data);
				} else {
					reject();
				}
			});
			// 上传
		},
		filePicked({ commit }, files) {
			commit('image', null);
			if (files[0] !== undefined) {
				if (files[0].name.lastIndexOf('.') <= 0) {
					return;
				}
				let fr = new FileReader();
				fr.readAsDataURL(files[0]);
				fr.addEventListener('load', () => {
					var image = new Image();
					image.onload = function() {
						let width = this.width;
						let height = this.height;
						let h1 = 354;
						let w1 = 325;
						let maxImgSize;
						let r1 = height / width;
						let r2 = h1 / w1;

						let w2 = window.screen.width || document.documentElement.width;
						let h2 = r1 * w2;

						// let r3 = h1 / height;
						// let r4 = w1 / width;
						if (r1 > r2) {
							// maxImgSize = Math.ceil(h2 * r4) + 1;
							maxImgSize = h2;
						} else {
							// maxImgSize = Math.ceil(w2 * r3) + 1;
							maxImgSize = w2;
						}
						commit('maxImgSize', maxImgSize);
						commit('loading', false);
					};
					image.src = fr.result;
					commit('image', fr.result);
				});
			} else {
				commit('image', null);
				commit('loading', false);
			}
		}
	}
});
