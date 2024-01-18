import { defineStore } from 'pinia';
import { GuildSettingsXP } from '@prisma/client';
import { useAppState } from '@/stores/appState';

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
			const response = await useAppState().botAPI!.get(`/guilds/${this.guildID}/settings/xp`);
			this.$patch({ guildSettingsXP: response.data.data.guildSettingsXP as GuildSettingsXP });
			return this;
		},
		async update() {
			if (!this.guildID) return;
			const response = await useAppState().botAPI!.post(`/guilds/${this.guildID}/settings/xp`, { data: { guildSettingsXP: this.guildSettingsXP } });
			this.$patch({ guildSettingsXP: response.data.data.guildSettingsXP as GuildSettingsXP });
			return this;
		},
		async mee6ImportXP() {
			if (!this.guildID) return;
			const response = await useAppState().botAPI!.get(`/guilds/${this.guildID}/actions/xp/mee6-import-xp`);
			// TODO: Error handling here. Emit event to tell user why update failed?
			// If import succeeded, settings will have been updated.
			if (response.status === 200) return await this.fetch();
		}
	},
	persist: true
});