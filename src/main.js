import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';

import router from './router';
import store from './store';
import './stylus/app.styl';

window.axios = require('axios');
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
window.axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

Vue.filter('stringLimit', function(value, len = 28) {
	if (value && value.length > len) {
		value = value.substring(0, len) + '...';
	}
	return value;
});

require('./utils/touch.js');
new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
