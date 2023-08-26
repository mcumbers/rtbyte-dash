import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import { GuildSettings } from '@prisma/client';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

export const useGuildSettingsStore = defineStore('guildSettings', {
	state: () => ({
		guildSettings: null as GuildSettings | null
	}),
	getters: {},
	actions: {
		async fetch(guildID?: string) {
			if (!guildID) guildID = this.guildSettings?.id;
			const response = await botAPI.get(`/guilds/${guildID}/settings`);
			this.$patch({ guildSettings: response.data.data.guildSettings });
			return this;
		},
		async update() {
			const response = await botAPI.post(`/guilds/${this.guildSettings?.id}/settings`, { data: { guildSettings: this.guildSettings } });
			this.$patch({ guildSettings: response.data.data.guildSettings });
			return this;
		}
	},
	persist: true
});