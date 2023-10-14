import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import { GuildSettingsInfoLogs } from '@prisma/client';
import { useAppState } from '@/stores/appState';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

export const useGuildSettingsInfoLogsStore = defineStore('guildSettingsInfoLogs', {
	state: () => ({
		guildSettingsInfoLogs: null as GuildSettingsInfoLogs | null
	}),
	getters: {
		guildID(state) {
			return state.guildSettingsInfoLogs?.id || useAppState().selectedGuild?.id || null;
		}
	},
	actions: {
		async fetch() {
			if (!this.guildID) return;
			const response = await botAPI.get(`/guilds/${this.guildID}/settings/info-logs`);
			this.$patch({ guildSettingsInfoLogs: response.data.data.guildSettingsInfoLogs as GuildSettingsInfoLogs });
			return this;
		},
		async update() {
			if (!this.guildID) return;
			const response = await botAPI.post(`/guilds/${this.guildID}/settings/info-logs`, { data: { guildSettingsInfoLogs: this.guildSettingsInfoLogs } });
			this.$patch({ guildSettingsInfoLogs: response.data.data.guildSettingsInfoLogs as GuildSettingsInfoLogs });
			return this;
		}
	},
	persist: true
});