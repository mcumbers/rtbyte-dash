import { UserData, GuildData } from "@/stores/api/oauth/loginData";
import { BotID, BotPermissions, BotOwners } from "@/lib/util/constants"

export function isBotOwner(userData: UserData) {
	return BotOwners.includes(userData.id);
}

export function avatarURL(userData: UserData) {
	const fileExt: string = userData.avatar.startsWith('a_') ? 'gif' : 'png';
	return `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.${fileExt}`;
}

export function iconURL(guildData: GuildData) {
	// Using this, we can show animated guild icons if the guild has one
	// I'm currently disabling it, though, because it DOUBLES the render time on the guild select page
	// const fileExt: string = guildData.icon.startsWith('a_') ? 'gif' : 'png';
	return `https://cdn.discordapp.com/icons/${guildData.id}/${guildData.icon}.png`;
}

export function botInviteString(guildData: GuildData | null) {
	const botInvite: URL = new URL('https://discord.com/oauth2/authorize');
	const paramsArr = [
		['scope', 'bot'],
		['client_id', BotID],
		['permissions', BotPermissions]
	];
	if (guildData) paramsArr.push(['guild_id', guildData.id]);
	botInvite.search = new URLSearchParams(paramsArr).toString();

	return botInvite.toString();
}
