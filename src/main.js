import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';

import router from './router';
import store from './store';
import './stylus/app.styl';
import { loginUrl } from './utils/api';
window.axios = require('axios');

// axios 拦截器
window.axios.interceptors.request.use(
	(config) => {
		config.withCredentials = true;
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
// store.dispatch('getUser').then(() => {}).catch(() => {
// 	window.location.href = loginUrl;
// });
if (process.env.NODE_ENV !== 'development') {
	router.beforeEach((to, from, next) => {
		let n = next;
		if (!store.getters.user || !store.getters.user.uid) {
			store
				.dispatch('getUser')
				.then(() => {
					n();
				})
				.catch(() => {
					window.location.href = loginUrl;
				});
		} else {
			next();
		}
	});
}

require('./utils/touch.js');
new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
