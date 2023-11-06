import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import { GuildSettingsXP } from '@prisma/client';
import { useAppState } from '@/stores/appState';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

export const useGuildSettingsXPStore = defineStore('guildSettingsXP', {
	state: () => ({
		guildSettingsXP: null as GuildSettingsXP | null
	}),
	getters: {
		guildID(state) {
			return state.guildSettingsXP?.id || useAppState().selectedGuild?.id || null;
		}
	},
	actions: {
		async fetch() {
			if (!this.guildID) return;
			const response = await botAPI.get(`/guilds/${this.guildID}/settings/xp`);
			this.$patch({ guildSettingsXP: response.data.data.guildSettingsXP as GuildSettingsXP });
			return this;
		},
		async update() {
			if (!this.guildID) return;
			const response = await botAPI.post(`/guilds/${this.guildID}/settings/xp`, { data: { guildSettingsXP: this.guildSettingsXP } });
			this.$patch({ guildSettingsXP: response.data.data.guildSettingsXP as GuildSettingsXP });
			return this;
		}
	},
	persist: true
});