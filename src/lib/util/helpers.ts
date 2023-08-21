import { UserData, GuildData } from "@/stores/loginData";
import { BotID, BotPermissions, BotOwners } from "./constants";

export function isBotOwner(userData: UserData) {
	return BotOwners.includes(userData.id);
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
