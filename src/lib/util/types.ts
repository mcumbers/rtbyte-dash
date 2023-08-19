export interface DiscordData {
	userData: UserData,
	userGuilds: GuildData[]
}

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