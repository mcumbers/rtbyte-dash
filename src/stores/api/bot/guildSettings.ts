import { defineStore } from 'pinia';
import { GuildSettings } from '@prisma/client';
import { useAppState } from '@/stores/appState';

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
			const response = await useAppState().botAPI!.get(`/guilds/${this.guildID}/settings`);
			this.$patch({ guildSettings: response.data.data.guildSettings as GuildSettings });
			return this;
		},
		async update() {
			if (!this.guildID) return;
			const response = await useAppState().botAPI!.post(`/guilds/${this.guildID}/settings`, { data: { guildSettings: this.guildSettings } });
			this.$patch({ guildSettings: response.data.data.guildSettings as GuildSettings });
			return this;
		}
	},
	persist: true
});