import Vue from 'vue';
import Vuex from 'vuex';
// import { fs } from 'fs';
import { userUrl } from './utils/api';

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		itemId: 2,
		loading: false,
		image: null,
		canvas: null,
		maxImgSize: 2000,
		frameImgs: '',
		goNow: false,
		user: null
	},
	mutations: {
		setItemId(state, id) {
			state.itemId = id;
		},
		image(state, image) {
			state.image = image;
		},
		user(state, user) {
			state.user = user;
			localStorage.setItem('user', user);
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
		user: (state) => {
			if (state.user) {
				return state.user;
			} else if (localStorage.getItem('user')) {
				return localStorage.getItem('user');
			} else {
				return null;
			}
		},
		loading: (state) => state.loading,
		frameImgs: (state) => state.frameImgs,
		goNow: (state) => state.goNow,
		image: (state) => state.image,
		canvas: (state) => {
			if (state.canvas) {
				return state.canvas;
			} else if (localStorage.getItem('canvas')) {
				return localStorage.getItem('canvas');
			} else {
				return null;
			}
		},
		maxImgSize: (state) => state.maxImgSize
	},
	actions: {
		getUser({ commit, state }) {
			return new Promise((resolve, reject) => {
				if (!state.user) {
					window.axios
						.get(userUrl)
						.then((res) => {
							window.console.log(res);
							if (res.data.ret == 0) {
								commit('user', res.data.data);
								return resolve(res.data.data);
							} else {
								return reject('error');
							}
						})
						.catch((err) => {
							return reject(err.response);
						});
				}
			});
		},
		loading({ commit }, loading) {
			commit('loading', loading);
		},
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
			commit('loading', true);
			if (files[0] !== undefined) {
				if (files[0].name.lastIndexOf('.') <= 0) {
					return;
				}
				let fr = new FileReader();
				fr.readAsDataURL(files[0]);
				fr.addEventListener('load', () => {
					var image = new Image();
					image.onload = function() {
						var width = this.width;
						var height = this.height;
						let maxImgSize;
						let screenWidth = window.screen.width || document.documentElement.width;
						if (width > height) {
							maxImgSize = Math.ceil(width / height * screenWidth);
						} else {
							maxImgSize = Math.ceil(height / width * screenWidth);
						}
						window.console.log(maxImgSize);
						// let r1 = height / width;
						// //let h1 = 354;
						// //let w1 = 325;
						// let w2 = window.screen.width || document.documentElement.width;
						// let r2 = 300 / w2;
						// let r3 = 300 / height;
						// let r4 = w2 / width;
						// if (r1 > r2) {
						// 	maxImgSize = Math.ceil(height * r4) + 1;
						// } else {
						// 	maxImgSize = Math.ceil(width * r3) + 1;
						// }
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
