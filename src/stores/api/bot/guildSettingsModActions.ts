import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import { GuildSettingsModActions } from '@prisma/client';
import { useAppState } from '@/stores/appState';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

export const useGuildSettingsModActionsStore = defineStore('guildSettingsModActions', {
	state: () => ({
		guildSettingsModActions: null as GuildSettingsModActions | null
	}),
	getters: {
		guildID(state) {
			return state.guildSettingsModActions?.id || useAppState().selectedGuild?.id || null;
		}
	},
	actions: {
		async fetch() {
			if (!this.guildID) return;
			const response = await botAPI.get(`/guilds/${this.guildID}/settings/mod-actions`);
			this.$patch({ guildSettingsModActions: response.data.data.guildSettingsModActions as GuildSettingsModActions });
			return this;
		},
		async update() {
			if (!this.guildID) return;
			const response = await botAPI.post(`/guilds/${this.guildID}/settings/mod-actions`, { data: { guildSettingsModActions: this.guildSettingsModActions } });
			this.$patch({ guildSettingsModActions: response.data.data.guildSettingsModActions as GuildSettingsModActions });
			return this;
		}
	},
	persist: true
});