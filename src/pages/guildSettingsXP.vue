<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAppState } from '@/stores/appState';
const appState = useAppState();
import { useLoginDataStore } from '@/stores/api/oauth/loginData';
const loginData = useLoginDataStore();

// Return user to guild selection if no guild selected
if (!appState.selectedGuild) router.push({ name: 'guilds' });
import { iconURL } from '@/lib/util/helpers';
import GuildChannelSelect from '@/components/GuildChannelSelect.vue';
import GuildRoleSelect from '@/components/GuildRoleSelect.vue';
import TemplateMessageEditor from '@/components/TemplateMessageEditor.vue';

import { useGuildSettingsXPStore } from '@/stores/api/bot/guildSettingsXP';
const guildSettingsXPStore = useGuildSettingsXPStore();

let guildSettingsXPLocal = ref({ ...guildSettingsXPStore.guildSettingsXP });

import type { AvailablePlaceholders } from '@/lib/util/constants';
const availablePlaceholders: AvailablePlaceholders = ['BOT_NAME', 'BOT_MENTION', 'GUILD_NAME', 'GUILD_SIZE', 'MEMBER_NAME', 'MEMBER_MENTION', 'USER_USERNAME', 'USER_MENTION', 'XP_TOTAL', 'XP_LEVEL_XP', 'XP_LEVEL', 'MESSAGE'];

const canImportFromMee6 = computed(() => {
	if (guildSettingsXPLocal.value && guildSettingsXPLocal.value.mee6ImportTimeNext) {
		return (new Date() > guildSettingsXPLocal.value.mee6ImportTimeNext);
	}
	// Should do a check to see if Mee6 is in this server... TODO
	return true;
});

const resetForm = () => {
	guildSettingsXPLocal.value = { ...guildSettingsXPStore.guildSettingsXP };
};

async function updateSettings() {
	guildSettingsXPStore.$patch({ guildSettingsXP: guildSettingsXPLocal.value });
	await guildSettingsXPStore.update();
	return resetForm();
};

async function mee6Import() {
	await guildSettingsXPStore.mee6ImportXP();
	return resetForm();
}

onMounted(async () => {
	if (!guildSettingsXPStore.guildSettingsXP) await guildSettingsXPStore.fetch();
	resetForm();
});

// Return user to guild selection if guild selection cleared on this page
appState.$subscribe(() => {
	if (!appState.selectedGuild) router.push({ name: 'guilds' });
});
</script>

<template>
	<VRow v-if="appState.selectedGuild">
		<VCol cols="12">
			<VCard title="Server XP & Levels Settings">
				<VCardText class="d-flex flex-row mb-6">
					<!-- 👉 Avatar -->
					<VAvatar color="background" size="x-large">
						<VImg :src="iconURL(appState.selectedGuild!)" />
					</VAvatar>
					<h3 class="ma-2 pa-2 pt-3">
						{{ appState.selectedGuild.name }}
					</h3>
				</VCardText>

				<VDivider />

				<VCardText>
					<!-- Form -->
					<VForm class="mt-6">
						<VRow match-height>

							<VCol cols="12" md="6" class="pl-8 pt-4">
								<VSwitch label="Enable XP & Levels System" inset v-model="guildSettingsXPLocal.enabled" />
								<VSwitch label="Reset XP for Users who Leave the Server" inset
									:disabled="!guildSettingsXPLocal.enabled"
									v-model="guildSettingsXPLocal.purgeOnMemberLeave" />
								<VSwitch label="Hide Users who have Left the Server from the Leaderboard" inset
									:disabled="!guildSettingsXPLocal.enabled"
									v-model="guildSettingsXPLocal.hideOnMemberLeave" />
							</VCol>

							<VDivider class="ma-6 mb-8" />

							<VCol cols="12" md="6" class="pl-8 pt-4">
								<VSwitch label="Members Only Earn XP In Certain Channels" inset
									:disabled="!guildSettingsXPLocal.enabled || guildSettingsXPLocal.channelBlocklistEnabled"
									v-model="guildSettingsXPLocal.channelAllowlistEnabled" />
							</VCol>
							<VCol cols="12" md="6" class="pr-8">
								<GuildChannelSelect label="Channels to Earn XP"
									v-model="(guildSettingsXPLocal.channelAllowlist as string[])"
									:disabled="!guildSettingsXPLocal.channelAllowlistEnabled" clearable multiple />
							</VCol>

							<VDivider class="ma-6 mb-8" />

							<VCol cols="12" md="6" class="pl-8 pt-4">
								<VSwitch label="Members Earn XP Except In Certain Channels" inset
									:disabled="!guildSettingsXPLocal.enabled || guildSettingsXPLocal.channelAllowlistEnabled"
									v-model="guildSettingsXPLocal.channelBlocklistEnabled" />
							</VCol>
							<VCol cols="12" md="6" class="pr-8">
								<GuildChannelSelect label="Channels not to Earn XP"
									v-model="(guildSettingsXPLocal.channelBlocklist as string[])"
									:disabled="!guildSettingsXPLocal.channelBlocklistEnabled" clearable multiple />
							</VCol>

							<VDivider class="ma-6 mb-8" />

							<VCol cols="12" md="6" class="pl-8 pt-4">
								<VSwitch label="Members Must Have Specific Role(s) to Earn XP" inset
									v-model="guildSettingsXPLocal.roleAllowlistEnabled" />
							</VCol>
							<VCol cols="12" md="6" class="pr-8">
								<GuildRoleSelect label="Roles Required to Earn XP"
									v-model="(guildSettingsXPLocal.roleAllowlist as string[])"
									:disabled="!guildSettingsXPLocal.roleAllowlistEnabled" clearable multiple />
							</VCol>

							<VDivider class="ma-6 mb-8" />

							<VCol cols="12" md="6" class="pl-8 pt-4">
								<VSwitch label="Members With Specific Role(s) Cannot Earn XP" inset
									v-model="guildSettingsXPLocal.roleBlocklistEnabled" />
							</VCol>
							<VCol cols="12" md="6" class="pr-8">
								<GuildRoleSelect label="Roles Blocked from Earning XP"
									v-model="(guildSettingsXPLocal.roleBlocklist as string[])"
									:disabled="!guildSettingsXPLocal.roleBlocklistEnabled" clearable multiple />
							</VCol>

							<VDivider class="ma-6 mb-8" />

							<VCol cols="12" md="6" class="pl-8 pt-4">
								<VSwitch label="Notify Members when they Level Up" inset
									v-model="guildSettingsXPLocal.levelUpNotifiy" />

								<VSwitch label="Send Members a DM when they Level Up" inset
									:disabled="!guildSettingsXPLocal.levelUpNotifiy"
									v-model="guildSettingsXPLocal.levelUpNotifyDM" />

								<VSwitch label="Reply to the Member's Last Message when they Level Up" inset
									:disabled="!guildSettingsXPLocal.levelUpNotifiy"
									v-model="guildSettingsXPLocal.levelUpNotifyReply" />
							</VCol>
							<VCol cols="12" md="6" class="pr-8">
								<GuildChannelSelect label="Send a Message to a specific Channel when Members Level Up"
									v-model="(guildSettingsXPLocal.levelUpNotifyChannel as string)"
									:disabled="!guildSettingsXPLocal.levelUpNotifiy" clearable />
							</VCol>
							<VCol cols="12" class="pr-8" v-if="guildSettingsXPLocal.levelUpNotifiy">
								<TemplateMessageEditor v-model="(guildSettingsXPLocal.levelUpNotifiyMessage as string)"
									:available-placeholders="availablePlaceholders" label="Level Up Message" clearable
									:disabled="!guildSettingsXPLocal.levelUpNotifiy" />
							</VCol>

							<VDivider class="ma-6 mb-8" />

							<!-- Form Actions -->
							<VCol cols="12" class="d-flex flex-wrap gap-4">
								<VBtn @click.prevent="updateSettings()">
									Save changes
								</VBtn>
								<VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm()">
									Reset
								</VBtn>
							</VCol>
						</VRow>
					</VForm>
				</VCardText>
			</VCard>
		</VCol>
	</VRow>

	<VRow v-if="appState.selectedGuild">
		<VCol cols="12">
			<VCard title="MEE6 XP Import">
				<VCardText>
					<VCol cols="12" class="d-flex flex-wrap gap-4">
						<VBtn @click.prevent="mee6Import()" :disabled="!canImportFromMee6">
							Import Mee6 XP
						</VBtn>
					</VCol>
				</VCardText>
			</VCard>
		</VCol>
	</VRow>

	<VRow v-if="loginData.userData?.isBotOwner">
		<VCol cols="12">
			<VCard title="PLACEHOLDER">
				<VRow v-for="value, setting in guildSettingsXPLocal">
					<VCol cols="12">
						<VCardTitle>
							{{ setting }}
						</VCardTitle>
						<VCardText>
							{{ value }}
						</VCardText>
					</VCol>
				</VRow>
			</VCard>
		</VCol>
	</VRow>
</template>
