import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import { BotGlobalSettings } from '@prisma/client';
import { useLoginDataStore } from '@/stores/api/oauth/loginData';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

export const useBotGlobalSettingsStore = defineStore('botGlobalSettings', {
	state: () => ({
		botGlobalSettings: null as BotGlobalSettings | null
	}),
	getters: {
		botID(state) {
			return state.botGlobalSettings?.id || useLoginDataStore().botData?.id || null;
		}
	},
	actions: {
		async fetch() {
			if (!this.botID) return;
			const response = await botAPI.get(`/bot/${this.botID}/settings`);
			this.$patch({ botGlobalSettings: response.data.data.botGlobalSettings as BotGlobalSettings });
			return this;
		},
		async update() {
			if (!this.botID) return;
			const response = await botAPI.post(`/bot/${this.botID}/settings`, { data: { botGlobalSettings: this.botGlobalSettings } });
			this.$patch({ botGlobalSettings: response.data.data.botGlobalSettings as BotGlobalSettings });
			return this;
		}
	},
	persist: true
});