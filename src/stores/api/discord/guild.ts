import { defineStore } from 'pinia';
import { useAppState } from '@/stores/appState';

export type APIGuild = {
	id: string,
	name: string,
	icon: string | null,
	features: string[],
	commands: string[],
	members: string[],
	channels: string[],
	bans: string[],
	roles: string[],
	stageInstances: string[],
	invites: string[],
	scheduledEvents: string[],
	autoModerationRules: string[],
	shardId: number,
	splash: string | null,
	banner: string | null,
	description: string | null,
	verificationLevel: number,
	vanityURLCode: string | null,
	nsfwLevel: number,
	premiumSubscriptionCount: number,
	discoverySplash: string | null,
	memberCount: number,
	large: boolean,
	premiumProgressBarEnabled: boolean,
	applicationId: string | null,
	afkTimeout: number | null,
	afkChannelId: string | null,
	systemChannelId: string | null,
	premiumTier: number,
	widgetEnabled: boolean | null,
	widgetChannelId: string | null,
	explicitContentFilter: number,
	mfaLevel: number,
	joinedTimestamp: number,
	defaultMessageNotifications: number,
	systemChannelFlags: number,
	maximumMembers: number,
	maximumPresences: number | null,
	maxVideoChannelUsers: number,
	maxStageVideoChannelUsers: number,
	approximateMemberCount: number | null,
	approximatePresenceCount: number | null,
	vanityURLUses: number | null,
	rulesChannelId: string | null,
	publicUpdatesChannelId: string | null,
	preferredLocale: string,
	safetyAlertsChannelId: string | null,
	ownerId: string,
	emojis: string[],
	stickers: string[],
	createdTimestamp: number,
	nameAcronym: string,
	iconURL: string | null,
	splashURL: string | null,
	discoverySplashURL: string | null,
	bannerURL: string | null
};

export const useGuildStore = defineStore('guild', {
	state: () => ({
		guild: null as APIGuild | null
	}),
	getters: {
		guildID(state) {
			return state.guild?.id || useAppState().selectedGuild?.id || null;
		}
	},
	actions: {
		async fetch() {
			if (!this.guildID) return;
			const response = await useAppState().botAPI!.get(`/guilds/${this.guildID}`);

			if (!response.data || !response.data.data || !response.data.data.guild) return this;

			this.$patch({ guild: response.data.data.guild as APIGuild });
			return this;
		}
	},
	persist: true
});