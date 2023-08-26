import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import { GuildSettingsModActions } from '@prisma/client';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

export const useGuildSettingsModActionsStore = defineStore('guildSettingsModActions', {
	state: () => ({
		guildSettingsModActions: null as GuildSettingsModActions | null
	}),
	getters: {},
	actions: {
		async fetch(guildID?: string) {
			if (!guildID) guildID = this.guildSettingsModActions?.id;
			const response = await botAPI.get(`/guilds/${guildID}/settings/mod-actions`);
			this.$patch({ guildSettingsModActions: response.data.data.guildSettingsModActions });
			return this;
		},
		async update() {
			const response = await botAPI.post(`/guilds/${this.guildSettingsModActions?.id}/settings/mod-actions`, { data: { guildSettingsModActions: this.guildSettingsModActions } });
			this.$patch({ guildSettingsModActions: response.data.data.guildSettingsModActions });
			return this;
		}
	},
	persist: true
});