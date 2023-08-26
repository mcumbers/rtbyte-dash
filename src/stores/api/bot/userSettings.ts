import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import { UserSettings } from '@prisma/client';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

export const useUserSettingsStore = defineStore('userSettings', {
	state: () => ({
		userSettings: null as UserSettings | null
	}),
	getters: {},
	actions: {
		async fetch(userID?: string) {
			if (!userID) userID = this.userSettings?.id;
			const response = await botAPI.get(`/users/${userID}/settings`);
			this.$patch({ userSettings: response.data.data.userSettings });
			return this;
		},
		async update() {
			const response = await botAPI.post(`/users/${this.userSettings?.id}/settings`, { data: { userSettings: this.userSettings } });
			this.$patch({ userSettings: response.data.data.userSettings });
			return this;
		}
	},
	persist: true
});