export interface BotInfo {
	id: string,
	name: string,
	apiHost: string,
	redirect: string
}

// TODO: Calculate actual needed Bot Permissions
// This currently requests Administrator perms at all times
export const BotPermissions: string = '8';

export const DefaultBotID: string = '284970288700194818';

export const BotConnections: Map<string, BotInfo> = new Map([
	['1141471276268011740', { id: '1141471276268011740', name: 'stickbot indev', apiHost: 'http://localhost:4000', redirect: 'http://localhost:5173/oauth/register?id=1141471276268011740' }],
	['284970288700194818', { id: '284970288700194818', name: 'stickbot', apiHost: 'https://stickbot.stickman.codes', redirect: 'https://stickbot.stickman.codes/oauth/register?id=284970288700194818' }],
	['1167655485529403553', { id: '1167655485529403553', name: 'ChairBot', apiHost: 'https://api.joov.sitson.me', redirect: 'https://joov.sitson.me/oauth/register?id=1167655485529403553' }]
]);
