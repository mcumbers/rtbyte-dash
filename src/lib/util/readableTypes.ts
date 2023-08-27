import { MeasurementSystem, LanguageTag, ModActionType } from "@prisma/client";
import { ChannelType } from 'discord.js';

export type ReadableGuildChannelType = {
	value: ChannelType,
	display: string
}

export const ReadableGuildChannelTypes: Array<ReadableGuildChannelType> = [
	{ value: 0, display: "Text Channel" }, // GuildText
	{ value: 1, display: "DM" }, // DM
	{ value: 2, display: "Voice Channel" }, // GuildVoice
	{ value: 3, display: "Group DM" }, // GroupDM
	{ value: 4, display: "Category" }, // GuildCategory
	{ value: 5, display: "Announcement/News Channel" }, // GuildAnnouncement & GuildNews
	{ value: 10, display: "Announcement/News Thread" }, // AnnouncementThread & GuildNewsThread
	{ value: 11, display: "Public Thread" }, // PublicThread & GuildPublicThread
	{ value: 12, display: "Private Thread" }, // PrivateThread & GuildPrivateThread
	{ value: 13, display: "Stage Channel" }, // GuildStageVoice
	{ value: 14, display: "Directory" }, // GuildDirectory
	{ value: 15, display: "Forum" } // GuildForum
];

export type ReadableMeasurementSystem = {
	value: MeasurementSystem,
	display: string
}

export const ReadableMeasurementSystems: Array<ReadableMeasurementSystem> = [
	{ value: MeasurementSystem.IMPERIAL, display: "Imperial" },
	{ value: MeasurementSystem.METRIC, display: "Metric" },
];

export type ReadableLanguageTag = {
	value: LanguageTag,
	display: string
}

export const ReadableLanguageTags: Array<ReadableLanguageTag> = [
	{ value: LanguageTag.bg_BG, display: 'Bulgarian (Bulgaria)' },
	{ value: LanguageTag.cs_CZ, display: 'Czech (Czech Republic)' },
	{ value: LanguageTag.da_DK, display: 'Danish (Denmark)' },
	{ value: LanguageTag.de_DE, display: 'German (Germany)' },
	{ value: LanguageTag.el_GR, display: 'Greek (Greece)' },
	{ value: LanguageTag.en_GB, display: 'English (United Kingdom)' },
	{ value: LanguageTag.en_US, display: 'English (United States)' },
	{ value: LanguageTag.fi_FI, display: 'Finnish (Finland)' },
	{ value: LanguageTag.fr_FR, display: 'French (France)' },
	{ value: LanguageTag.hi_IN, display: 'Hindi (India)' },
	{ value: LanguageTag.hr_HR, display: 'Croatian (Croatia)' },
	{ value: LanguageTag.hu_HU, display: 'Hungarian (Hungary)' },
	{ value: LanguageTag.it_IT, display: 'Italian (Italy)' },
	{ value: LanguageTag.ja_JP, display: 'Japanese (Japan)' },
	{ value: LanguageTag.ko_KR, display: 'Korean (Korea)' },
	{ value: LanguageTag.lt_LT, display: 'Lithuanian (Lithuania)' },
	{ value: LanguageTag.nb_NO, display: 'Norwegian (Bokm?l) (Norway)' },
	{ value: LanguageTag.nl_NL, display: 'Dutch (Netherlands)' },
	{ value: LanguageTag.pl_PL, display: 'Polish (Poland)' },
	{ value: LanguageTag.pt_BR, display: 'Portuguese (Brazil)' },
	{ value: LanguageTag.ro_RO, display: 'Romanian (Romania)' },
	{ value: LanguageTag.ru_RU, display: 'Russian (Russia)' },
	{ value: LanguageTag.sv_SE, display: 'Swedish (Sweden)' },
	{ value: LanguageTag.th_TH, display: 'Thai (Thailand)' },
	{ value: LanguageTag.tr_TR, display: 'Turkish (Turkey)' },
	{ value: LanguageTag.uk_UA, display: 'Ukrainian (Ukraine)' },
	{ value: LanguageTag.vi_VN, display: 'Vietnamese (Viet Nam)' },
	{ value: LanguageTag.zh_CN, display: 'Chinese (S)' }
];

export type ReadableModActionType = {
	value: ModActionType,
	display: string
}

export const ReadableModActionTypes: Array<ReadableModActionType> = [
	{ value: ModActionType.BAN, display: 'Ban' },
	{ value: ModActionType.UNBAN, display: 'Unban' },
	{ value: ModActionType.KICK, display: 'Kick' },
	{ value: ModActionType.MUTE, display: 'Mute' },
	{ value: ModActionType.UNMUTE, display: 'Unmute' },
	{ value: ModActionType.PURGE, display: 'Purge' },
	{ value: ModActionType.VCBAN, display: 'Voice Chat Ban' },
	{ value: ModActionType.VCUNBAN, display: 'Voice Chat Unban' },
	{ value: ModActionType.VCKICK, display: 'Voice Chat Kick' },
	{ value: ModActionType.FILTER_ANTI_INVITE, display: 'Chat Filter: Anti-Invite' },
	{ value: ModActionType.FILTER_MENTION_SPAM, display: 'Chat Filter: Mention Spam' },
	{ value: ModActionType.FILTER_CHAT, display: 'Chat Filter: Word or Phrase' },
	{ value: ModActionType.FILTER_USERNAME, display: 'Chat Filter: Username or Nickname' },
];