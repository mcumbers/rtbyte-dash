import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import { GuildSettingsInfoLogs } from '@prisma/client';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

export const useGuildSettingsInfoLogsStore = defineStore('guildSettingsInfoLogs', {
	state: () => ({
		guildSettingsInfoLogs: null as GuildSettingsInfoLogs | null
	}),
	getters: {},
	actions: {
		async fetch(guildID?: string) {
			if (!guildID) guildID = this.guildSettingsInfoLogs?.id;
			const response = await botAPI.get(`/guilds/${guildID}/settings/info-logs`);
			this.$patch({ guildSettingsInfoLogs: response.data.data.guildSettingsInfoLogs });
			return this;
		},
		async update() {
			const response = await botAPI.post(`/guilds/${this.guildSettingsInfoLogs?.id}/settings/info-logs`, { data: { guildSettingsInfoLogs: this.guildSettingsInfoLogs } });
			this.$patch({ guildSettingsInfoLogs: response.data.data.guildSettingsInfoLogs });
			return this;
		}
	},
	persist: true
});