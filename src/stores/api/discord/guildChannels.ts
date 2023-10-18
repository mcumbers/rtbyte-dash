import { defineStore } from 'pinia';
import { BotAPIHost } from '@/lib/util/constants';
import { GuildSettings } from '@prisma/client';
import { useAppState } from '@/stores/appState';
import { type ChannelType } from 'discord.js';
import axios from 'axios';
const botAPI = axios.create({ baseURL: BotAPIHost, withCredentials: true });

export interface APIGuildChannel {
	type: number,
	guild: string,
	guildId: string,
	permissionOverwrites: string[],
	flags: number,
	id: string,
	name: string,
	rawPosition: number,
	parentId: string[],
	createdTimestamp: number,
	messages: string[],
	threads: string[],
	nsfw: boolean,
	topic: string[],
	rateLimitPerUser: number,
	lastPinTimestamp: number[],
	lastMessageId: string[],
	rtcRegion: string[],
	bitrate: number,
	userLimit: number,
	videoQualityMode: number[],
	availableTags: string[],
	defaultReactionEmoji: string[],
	defaultThreadRateLimitPerUser: string[],
	defaultAutoArchiveDuration: number[],
	defaultSortOrder: string[],
	defaultForumLayout: number
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

			this.$patch({ guildChannels: response.data.data.channels as APIGuildChannel[] });
			return this;
		}
	},
	persist: true
});