import { defineStore } from 'pinia';
import { BotGlobalSettings } from '@prisma/client';
import { useLoginDataStore } from '@/stores/api/oauth/loginData';
import { useAppState } from '@/stores/appState';

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
			const response = await useAppState().botAPI!.get(`/bot/${this.botID}/settings`);
			this.$patch({ botGlobalSettings: response.data.data.botGlobalSettings as BotGlobalSettings });
			return this;
		},
		async update() {
			if (!this.botID) return;
			const response = await useAppState().botAPI!.post(`/bot/${this.botID}/settings`, { data: { botGlobalSettings: this.botGlobalSettings } });
			this.$patch({ botGlobalSettings: response.data.data.botGlobalSettings as BotGlobalSettings });
			return this;
		}
	},
	persist: true
});