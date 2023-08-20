import { defineStore } from 'pinia';

export interface UserData {
	id: string,
	username: string,
	avatar: string,
	avatarURL?: string,
	discriminator: string,
	public_flags: number,
	flags: number,
	banner: string,
	accent_color: string,
	global_name: string,
	avatar_decoration_data: any,
	banner_color: string,
	mfa_enabled: boolean,
	locale: string,
	premium_type: number
}

export interface GuildData {
	id: string,
	name: string,
	icon: string,
	owner: boolean,
	permissions: string,
	features: string[],
	botInGuild: boolean,
	canManageServer: boolean
}

export const useLoginDataStore = defineStore('loginData', {
	state: () => ({ userData: null as UserData | null, userGuilds: [] as GuildData[] }),
	getters: {},
	actions: {
		avatarURL(userData: UserData) {
			const fileExt: string = userData.avatar.startsWith('a_') ? 'gif' : 'png';
			return `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.${fileExt}`;
		},
		iconURL(guildData: GuildData) {
			const fileExt: string = guildData.icon.startsWith('a_') ? 'gif' : 'png';
			return `https://cdn.discordapp.com/icons/${guildData.id}/${guildData.icon}.${fileExt}`;
		}
	},
	persist: true
});