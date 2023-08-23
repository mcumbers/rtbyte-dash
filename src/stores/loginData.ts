import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

export interface UserData {
	id: string,
	username: string,
	avatar: string,
	avatarURL?: string,
	discriminator: string,
	public_flags: number,
	flags: number,
	banner: string,
	accent_color: string,
	global_name: string,
	avatar_decoration_data: any,
	banner_color: string,
	mfa_enabled: boolean,
	locale: string,
	premium_type: number
}

export interface GuildData {
	id: string,
	name: string,
	icon: string,
	owner: boolean,
	permissions: string,
	features: string[],
	botInGuild: boolean,
	canManageServer: boolean
}

export const useLoginDataStore = defineStore('loginData', {
	state: () => ({ userData: null as UserData | null, userGuilds: [] as GuildData[], lastRefresh: 0 as Number }),
	getters: {},
	actions: {
		async login(oAuthCode: string) {
			try {
				// Post the oAuth Code to the bot to authenticate
				const response = await botAPI.post('/oauth/callback', { code: oAuthCode });

				// Grab the login data from the response, and put it in our app's store
				this.$patch({ userData: response.data.user, userGuilds: response.data.guilds, lastRefresh: Date.now() });

				return this;
			} catch (error) {
				console.log(error);
			}
		},
		async logOut() {
			try {
				// Tell the bot to invalidate our token
				await botAPI.post('/oauth/logout');
			} catch (error) {
				console.log(error);
			}
		},
		async refreshData() {
			try {
				// Post the oAuth Code to the bot to authenticate
				const response = await botAPI.post('/oauth/refresh');

				// Grab the login data from the response, and put it in our app's store
				this.$patch({ userData: response.data.user, userGuilds: response.data.guilds, lastRefresh: Date.now() });
			} catch (error) {
				console.log(error);
			}

			return this;
		}
	},
	persist: true
});