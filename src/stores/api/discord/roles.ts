import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import { useAppState } from '@/stores/appState';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

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
		async fetch() {
			if (!this.guildID) return;
			const response = await botAPI.get(`/guilds/${this.guildID}/roles`);

			if (!response.data || !response.data.data || !response.data.data.roles) return this;

			console.log(response.data.data.roles);

			this.$patch({ roles: response.data.data.roles as APIRole[] });
			return this;
		}
	},
	persist: true
});