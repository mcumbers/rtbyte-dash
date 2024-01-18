import { defineStore } from 'pinia';
import { useAppState } from '@/stores/appState';

export type APIMember = {
	guildId: string,
	joinedTimestamp: number,
	premiumSinceTimestamp: number | null,
	nickname: string | null,
	pending: boolean,
	communicationDisabledUntilTimestamp: number | null,
	userId: string,
	avatar: string | null,
	flags: number,
	displayName: string,
	roles: string[],
	avatarURL: string | null,
	displayAvatarURL: string
};

export const useGuildMembersStore = defineStore('guildMember', {
	state: () => ({
		guildMembers: [] as APIMember[]
	}),
	getters: {
		guildID() {
			return useAppState().selectedGuild?.id || null;
		}
	},
	actions: {
		async fetch() {
			if (!this.guildID) return;
			const response = await useAppState().botAPI!.get(`/guilds/${this.guildID}/members`);

			if (!response.data || !response.data.data || !response.data.data.guildMembers) return this;

			this.$patch({ guildMembers: response.data.data.guildMembers as APIMember[] });
			return this;
		}
	},
	persist: true
});