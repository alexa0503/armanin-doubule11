import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'hash',
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('./views/Home.vue')
		},
		{
			path: '/invite',
			name: 'invite',
			component: () => import('./views/Invite.vue')
		},
		{
			path: '/item/:id?',
			name: 'item',
			component: () => import('./views/Item.vue')
		},
		{
			path: '/photo',
			name: 'photo',
			component: () => import('./views/Photo.vue')
		},
		{
			path: '/result',
			name: 'result',
			component: () => import('./views/Result.vue')
		},
		{
			path: '/buy/:id',
			name: 'buy',
			component: () => import('./views/Buy.vue')
		}
	]
});
