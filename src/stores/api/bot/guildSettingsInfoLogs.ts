import { defineStore } from 'pinia';
import { GuildSettingsInfoLogs } from '@prisma/client';
import { useAppState } from '@/stores/appState';

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
			const response = await useAppState().botAPI!.get(`/guilds/${this.guildID}/settings/info-logs`);
			this.$patch({ guildSettingsInfoLogs: response.data.data.guildSettingsInfoLogs as GuildSettingsInfoLogs });
			return this;
		},
		async update() {
			if (!this.guildID) return;
			const response = await useAppState().botAPI!.post(`/guilds/${this.guildID}/settings/info-logs`, { data: { guildSettingsInfoLogs: this.guildSettingsInfoLogs } });
			this.$patch({ guildSettingsInfoLogs: response.data.data.guildSettingsInfoLogs as GuildSettingsInfoLogs });
			return this;
		}
	},
	persist: true
});