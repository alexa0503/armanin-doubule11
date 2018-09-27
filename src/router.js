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
			path: '/items',
			name: 'items',
			component: () => import('./views/Items.vue')
		},
		{
			path: '/photo',
			name: 'photo',
			component: () => import('./views/Photo.vue')
		},
		{
			path: '/list/:id/:had?',
			name: 'list',
			component: () => import('./views/List.vue')
		},
		{
			path: '/result',
			name: 'result',
			component: () => import('./views/Result.vue')
		}
	]
});
