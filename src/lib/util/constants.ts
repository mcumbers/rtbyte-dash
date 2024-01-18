export interface BotInfo {
	id: string,
	name: string,
	apiHost: string,
	redirect: string
}

// TODO: Calculate actual needed Bot Permissions
// This currently requests Administrator perms at all times
export const BotPermissions: string = '8';

export const DefaultBotID: string = '';

export const BotConnections: Map<string, BotInfo> = new Map([
	['', { id: '', name: '', apiHost: '', redirect: '' }]
]);
