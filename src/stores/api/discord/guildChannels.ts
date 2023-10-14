import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import { GuildSettings } from '@prisma/client';
import { useAppState } from '@/stores/appState';
import { type ChannelType } from 'discord.js';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

export interface APIGuildChannel {
	id: string,
	guild: string,
	name: string,
	type: ChannelType,
	nsfw: boolean | null,
	parent: string | null,
	position: number,
	createdTimestamp: number
}

export const useGuildChannelsStore = defineStore('guildChannels', {
	state: () => ({
		guildChannels: [] as APIGuildChannel[]
	}),
	getters: {
		guildID(state) {
			return state.guildChannels[0]?.guild || useAppState().selectedGuild?.id || null;
		}
	},
	actions: {
		async fetchAll() {
			if (!this.guildID) return;
			const response = await botAPI.get(`/guilds/${this.guildID}/channels`);

			if (!response.data.data || !response.data.data.channels || !response.data.data.channels.length) return this;

			const channelsArr: APIGuildChannel[] = [...this.guildChannels];

			for await (const resChannel of response.data.data.channels) {
				channelsArr.push({
					id: resChannel.id,
					guild: resChannel.guild,
					name: resChannel.name,
					type: resChannel.type,
					nsfw: resChannel.nsfw || null,
					parent: resChannel.parentId || null,
					position: resChannel.rawPosition,
					createdTimestamp: resChannel.createdTimestamp
				} as APIGuildChannel);
			}

			this.$patch({ guildChannels: channelsArr });
			return this;
		}
	},
	persist: true
});