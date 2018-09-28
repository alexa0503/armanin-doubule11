import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';

import router from './router';
import store from './store';
import './stylus/app.styl';
import { loginUrl } from './utils/api';
window.axios = require('axios');
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// window.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
// window.axios.defaults.withCredentials = true;
// axios 拦截器
window.axios.interceptors.request.use(
	(config) => {
		// config.withCredentials = true;
		config.headers['X-Requested-With'] = 'XMLHttpRequest';
		config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);
window.axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			switch (error.response.status) {
				case 403:
				case 401:
					window.location.href = loginUrl;
					break;
				default:
			}
		}
		return Promise.reject(error); // 返回接口返回的错误信息
	}
);
Vue.config.productionTip = false;

Vue.filter('stringLimit', function(value, len = 22) {
	if (value && value.length > len) {
		value = value.substring(0, len) + '...';
	}
	return value;
});
let debug = true;
if (!store.getters.user || debug) {
	store.dispatch('getUser').then(() => {}).catch(() => {
		// alert('授权失败' + err);
	});
}
require('./utils/touch.js');
new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
