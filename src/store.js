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
						// var width = this.width;
						// var height = this.height;
						// let maxImgSize;
						// let r1 = height / width;
						// let r2 = 325 / 354;
						// let r3 = 325 / height;
						// let r4 = 354 / width;
						// if (r1 > r2) {
						// 	maxImgSize = Math.ceil(height * r4) + 1;
						// } else {
						// 	maxImgSize = Math.ceil(width * r3) + 1;
						// }
						// commit('maxImgSize', maxImgSize);
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
