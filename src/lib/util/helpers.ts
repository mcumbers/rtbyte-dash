import { UserData, GuildData } from "./types";

export function avatarURL(userData: UserData) {
	return `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
}

export function iconURL(guildData: GuildData) {
	return `https://cdn.discordapp.com/icons/${guildData.id}/${guildData.icon}.png`;
}