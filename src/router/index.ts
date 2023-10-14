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
					path: 'account-settings',
					name: 'account-settings',
					component: () => import('../pages/account.vue'),
				},
				{
					path: 'settings',
					name: 'settings',
					component: () => import('../pages/guildSettings.vue'),
				},
				{
					path: 'settings/info-logs',
					name: 'settings-info-logs',
					component: () => import('../pages/guildSettingsInfoLogs.vue'),
				},
				{
					path: 'settings/mod-actions',
					name: 'settings-mod-actions',
					component: () => import('../pages/guildSettingsModActions.vue'),
				},
				{
					path: 'settings/bot-global',
					name: 'settings-bot-global',
					component: () => import('../pages/botSettings.vue'),
				},
				{
					path: 'debug/guild-data-viewer',
					name: 'debug-guild-data-viewer',
					component: () => import('../pages/guildDataViewer.vue'),
				}
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
