import { UserData, GuildData } from "@/stores/loginData";
import { BotOwners } from "./constants";

export function isBotOwner(userData: UserData) {
	return BotOwners.includes(userData.id);
}

export function botInviteString(guildData: GuildData | null) {
	const botInvite: URL = new URL('https://discord.com/oauth2/authorize');
	const paramsArr = [
		['scope', 'bot'],
		['client_id', '1141471276268011740'],
		['redirect_uri', 'http://localhost:5173/'],
		['permissions', '8']
	];
	if (guildData) paramsArr.push(['guild_id', guildData.id]);
	botInvite.search = new URLSearchParams(paramsArr).toString();

	return botInvite.toString();
}
