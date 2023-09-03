import { UserData, GuildData } from "@/stores/api/oauth/loginData";
import { BotID, BotPermissions, BotOwners } from "@/lib/util/constants";
import { APIGuildChannel } from "@/stores/api/discord/guildChannels";

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
	// Perhaps we can leave it as an option in UserSettings... Maybe... TODO
	// const fileExt: string = guildData.icon.startsWith('a_') ? 'gif' : 'png';
	// return `https://cdn.discordapp.com/icons/${guildData.id}/${guildData.icon}.${fileExt}`;
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

// These are just here for the sorting function below
const textChannelTypes = [0, 5, 15];
// const voiceChannelTypes = [ChannelType.GuildVoice, ChannelType.GuildStageVoice];

export function clientStyleChannelSort(inputChannels: Array<APIGuildChannel>) {
	// First, make sure we don't have any threads--they don't have position properties
	const allChannels = inputChannels.filter((channel) => channel.type !== 12 && channel.type !== 11);
	const levelZero = [...allChannels].filter((channel) => !channel.parent);
	const levelOne: { parentID: string, children: Array<APIGuildChannel> }[] = [];

	levelZero.forEach((l0Channel) => {
		// Now we'll build collections of nested channels and group them by their parent
		const l1Channels = [...allChannels].filter((l1Channel) => l1Channel.parent === l0Channel.id);
		// Now we'll run our three-way sort on these channels
		// Special Channels (eg: Forums/Stages) can only exist in categories
		// They can also freely mix with their respective types (Forums w/ Text, Stages w/ Voice)
		// So we do a slightly different sort for child channels than for parent/non-nested ones
		l1Channels.sort((a, b) => {
			const chATypeScore = textChannelTypes.includes(a.type) ? 1 : 0;
			const chBTypeScore = textChannelTypes.includes(b.type) ? 1 : 0;
			return chATypeScore - chBTypeScore || a.position - b.position || a.createdTimestamp - b.createdTimestamp;
		});
		levelOne.push({ parentID: l0Channel.id, children: l1Channels });
	});

	// And we'll run our more strict three-way sort on the parent/non-nested channels
	levelZero.sort((a, b) => {
		return a.type - b.type || a.position - b.position || a.createdTimestamp - b.createdTimestamp
	});

	const sortedChannels: APIGuildChannel[] = [];

	// Now that everything's sorted, we're just pushing every channel into an array in order
	levelZero.forEach((channel) => {
		sortedChannels.push(channel);
		const childrenContainer = levelOne.find((obj) => obj.parentID === channel.id);
		if (!childrenContainer || !childrenContainer?.children.length) return;
		childrenContainer.children.forEach((childChannel) => {
			sortedChannels.push(childChannel);
		});
	});

	return sortedChannels;
}
