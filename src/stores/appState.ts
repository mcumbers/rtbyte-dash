import { defineStore } from 'pinia';
import { GuildData } from '@/stores/api/oauth/loginData';
import { useGuildSettingsStore } from '@/stores/api/bot/guildSettings';
import { useGuildSettingsInfoLogsStore } from '@/stores/api/bot/guildSettingsInfoLogs';
import { useGuildSettingsModActionsStore } from '@/stores/api/bot/guildSettingsModActions';
import { useGuildChannelsStore } from './api/discord/guildChannels';

export const useAppState = defineStore('appState', {
	state: () => ({
		selectedGuild: null as GuildData | null
	}),
	getters: {},
	actions: {
		selectGuild(guild: GuildData) {
			useGuildSettingsStore().$reset();
			useGuildSettingsInfoLogsStore().$reset();
			useGuildSettingsModActionsStore().$reset();
			useGuildChannelsStore().$reset();
			return this.$patch({ selectedGuild: guild });
		},
		clearSelectedGuild() {
			useGuildSettingsStore().$reset();
			useGuildSettingsInfoLogsStore().$reset();
			useGuildSettingsModActionsStore().$reset();
			useGuildChannelsStore().$reset();
			return this.$patch({ selectedGuild: null });
		}
	},
	persist: true
});