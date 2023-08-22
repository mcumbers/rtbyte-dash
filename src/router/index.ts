import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', redirect: '/guilds' },
		{
			path: '/',
			component: () => import('../layouts/default.vue'),
			children: [
				{
					path: 'guilds',
					name: 'guilds',
					component: () => import('../pages/guilds.vue'),
				},
				{
					path: 'account',
					name: 'account',
					component: () => import('../pages/account.vue'),
				},
				{
					path: 'guild-settings',
					name: 'guild-settings',
					component: () => import('../pages/guildSettings.vue'),
				},
				{
					path: 'icons',
					component: () => import('../pages/icons.vue'),
				},
				{
					path: 'cards',
					component: () => import('../pages/cards.vue'),
				},
				{
					path: 'tables',
					component: () => import('../pages/tables.vue'),
				},
				{
					path: 'form-layouts',
					component: () => import('../pages/form-layouts.vue'),
				},
			],
		},
		{
			path: '/',
			component: () => import('../layouts/blank.vue'),
			children: [
				{
					path: 'login',
					name: 'login',
					component: () => import('../pages/login.vue'),
				},
				{
					path: 'logout',
					name: 'logout',
					component: () => import('../pages/logout.vue'),
				},
				{
					path: 'oauth/register',
					name: 'oauth register',
					component: () => import('../pages/oauth/register.vue'),
				},
				{
					path: '/:pathMatch(.*)*',
					component: () => import('../pages/[...all].vue'),
				},
			],
		},
	],
})

export default router
