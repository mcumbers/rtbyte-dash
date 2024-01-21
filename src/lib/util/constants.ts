export interface BotInfo {
	id: string,
	name: string,
	apiHost: string,
	redirect: string
}

export type Placeholder = 'BOT_NAME' | 'BOT_MENTION' | 'GUILD_NAME' | 'GUILD_SIZE' | 'MEMBER_NAME' | 'MEMBER_MENTION' | 'USER_USERNAME' | 'USER_MENTION' | 'CHANNEL_NAME' | 'CHANNEL_MENTION' | 'XP_TOTAL' | 'XP_LEVEL_XP' | 'XP_LEVEL' | 'MESSAGE';

export type AvailablePlaceholders = Placeholder[];

// TODO: Calculate actual needed Bot Permissions
// This currently requests Administrator perms at all times
export const BotPermissions: string = '8';

export const DefaultBotID: string = '1141471276268011740';

export const BotConnections: Map<string, BotInfo> = new Map([
	['1141471276268011740', { id: '1141471276268011740', name: 'stickbot indev', apiHost: 'http://localhost:4000', redirect: 'http://localhost:5173/oauth/register?id=1141471276268011740' }],
	['284970288700194818', { id: '284970288700194818', name: 'stickbot', apiHost: 'https://api.stickbot.stickman.codes', redirect: 'https://stickbot.stickman.codes/oauth/register?id=284970288700194818' }],
	['1167655485529403553', { id: '1167655485529403553', name: 'ChairBot', apiHost: 'https://api.joov.sitson.me', redirect: 'https://joov.sitson.me/oauth/register?id=1167655485529403553' }]
]);
