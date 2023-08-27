import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import { GuildSettings } from '@prisma/client';
import { useAppState } from '@/stores/appState';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

export const useGuildSettingsStore = defineStore('guildSettings', {
	state: () => ({
		guildSettings: null as GuildSettings | null
	}),
	getters: {
		guildID(state) {
			return state.guildSettings?.id || useAppState().selectedGuild?.id || null;
		}
	},
	actions: {
		async fetch() {
			if (!this.guildID) return;
			const response = await botAPI.get(`/guilds/${this.guildID}/settings`);
			this.$patch({ guildSettings: response.data.data.guildSettings });
			return this;
		},
		async update() {
			if (!this.guildID) return;
			const response = await botAPI.post(`/guilds/${this.guildID}/settings`, { data: { guildSettings: this.guildSettings } });
			this.$patch({ guildSettings: response.data.data.guildSettings });
			return this;
		}
	},
	persist: true
});