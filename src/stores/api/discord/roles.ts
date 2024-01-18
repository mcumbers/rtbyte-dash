import { defineStore } from 'pinia';
import { useAppState } from '@/stores/appState';

export interface APIRole {
	guild: string,
	icon: string | null,
	unicodeEmoji: string | null,
	id: string,
	name: string,
	color: string | number,
	hoist: boolean,
	rawPosition: number,
	permissions: string | null,
	managed: boolean,
	mentionable: boolean,
	flags: number,
	tags: string | null,
	createdTimestamp: number
};

export const useRolesStore = defineStore('role', {
	state: () => ({
		roles: [] as APIRole[]
	}),
	getters: {
		guildID() {
			return useAppState().selectedGuild?.id || null;
		}
	},
	actions: {
		async fetchAll() {
			if (!this.guildID) return;
			const response = await useAppState().botAPI!.get(`/guilds/${this.guildID}/roles`);

			if (!response.data || !response.data.data || !response.data.data.roles) return this;

			this.$patch({ roles: response.data.data.roles as APIRole[] });
			return this;
		}
	},
	persist: true
});