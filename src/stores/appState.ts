import { defineStore } from 'pinia';
import { GuildData } from './loginData';

export const useAppState = defineStore('appState', {
	state: () => ({
		selectedGuild: null as GuildData | null
	}),
	getters: {},
	actions: {
		selectGuild(guild: GuildData) {
			return this.$patch({ selectedGuild: guild });
		},
		clearSelectedGuild() {
			return this.$patch({ selectedGuild: null });
		}
	},
	persist: true
});