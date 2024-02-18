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

import { useGuildSettingsModActionsStore } from '@/stores/api/bot/guildSettingsModActions';
const guildSettingsModActionsStore = useGuildSettingsModActionsStore();

let guildSettingsModActionsLocal = ref({ ...guildSettingsModActionsStore.guildSettingsModActions });

const resetForm = () => {
	guildSettingsModActionsLocal.value = { ...guildSettingsModActionsStore.guildSettingsModActions };
};

async function updateSettings() {
	guildSettingsModActionsStore.$patch({ guildSettingsModActions: guildSettingsModActionsLocal.value });
	await guildSettingsModActionsStore.update();
	return resetForm();
};

onMounted(async () => {
	if (!guildSettingsModActionsStore.guildSettingsModActions) await guildSettingsModActionsStore.fetch();
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
			<VCard title="Server Mod Action Settings">
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
						<VRow>
							<!-- Mod Log Channels -->
							<VRow>
								<VCol cols="12">
									<VCardTitle>
										Mod Log Channels
									</VCardTitle>
								</VCol>
								<VRow>
									<VCol cols="6" class="pl-8 pt-6">
										<GuildChannelSelect label="Private Mod Log Channel"
											v-model="(guildSettingsModActionsLocal.modLogChannel as string)" clearable />
									</VCol>
									<VCol cols="6" class="pr-8 pt-6">
										<GuildChannelSelect label="Public Mod Log Channel"
											v-model="(guildSettingsModActionsLocal.modLogChannelPublic as string)"
											clearable />
									</VCol>
								</VRow>
							</VRow>

							<VDivider class="ma-6 mb-8" />

							<!-- Ban Settings -->
							<VRow>
								<VCol cols="12">
									<VCardTitle>
										Ban Settings
									</VCardTitle>
								</VCol>
								<VRow match-height>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member Bans in the Private Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannel"
											v-model="guildSettingsModActionsLocal.banLog" />
										<VSwitch label="Log Member Unbans in the Private Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannel"
											v-model="guildSettingsModActionsLocal.unbanLog" />
									</VCol>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member Bans in the Public Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannelPublic"
											v-model="guildSettingsModActionsLocal.banLogPublic" />
										<VSwitch label="Log Member Unbans in the Public Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannelPublic"
											v-model="guildSettingsModActionsLocal.unbanLogPublic" />
									</VCol>
								</VRow>
							</VRow>

							<VDivider class="ma-6 mb-8" />

							<!-- Kick Settings -->
							<VRow>
								<VCol cols="12">
									<VCardTitle>
										Kick Settings
									</VCardTitle>
								</VCol>
								<VRow match-height>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member Kicks in the Private Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannel"
											v-model="guildSettingsModActionsLocal.kickLog" />
									</VCol>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member Kicks in the Public Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannelPublic"
											v-model="guildSettingsModActionsLocal.kickLogPublic" />
									</VCol>
								</VRow>
							</VRow>

							<VDivider class="ma-6 mb-8" />

							<!-- Mute Settings -->
							<VRow>
								<VCol cols="12">
									<VCardTitle>
										Timeout Settings
									</VCardTitle>
								</VCol>
								<VRow match-height>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member Timeouts in the Private Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannel"
											v-model="guildSettingsModActionsLocal.muteLog" />
										<VSwitch label="Log Member UnTimeouts in the Private Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannel"
											v-model="guildSettingsModActionsLocal.unmuteLog" />
									</VCol>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member Timeouts in the Public Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannelPublic"
											v-model="guildSettingsModActionsLocal.muteLogPublic" />
										<VSwitch label="Log Member UnTimeouts in the Public Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannelPublic"
											v-model="guildSettingsModActionsLocal.unmuteLogPublic" />
									</VCol>
								</VRow>
							</VRow>

							<VDivider class="ma-6 mb-8" />

							<!-- Purge Settings -->
							<VRow>
								<VCol cols="12">
									<VCardTitle>
										Purge Settings
									</VCardTitle>
								</VCol>
								<VRow match-height>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Message Purges in the Private Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannel"
											v-model="guildSettingsModActionsLocal.purgeLog" />
									</VCol>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Message Purges in the Public Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannelPublic"
											v-model="guildSettingsModActionsLocal.purgeLogPublic" />
									</VCol>
								</VRow>
							</VRow>

							<VDivider class="ma-6 mb-8" />

							<!-- VCBan Settings -->
							<VRow>
								<VCol cols="12">
									<VCardTitle>
										Voice Chat Ban Settings
									</VCardTitle>
								</VCol>
								<VRow match-height>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member VC Bans in the Private Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannel"
											v-model="guildSettingsModActionsLocal.vcBanLog" />
										<VSwitch label="Log Member VC Unbans in the Private Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannel"
											v-model="guildSettingsModActionsLocal.vcUnbanLog" />
									</VCol>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member VC Bans in the Public Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannelPublic"
											v-model="guildSettingsModActionsLocal.vcBanLogPublic" />
										<VSwitch label="Log Member VC Unbans in the Public Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannelPublic"
											v-model="guildSettingsModActionsLocal.vcUnbanLogPublic" />
									</VCol>
								</VRow>
							</VRow>

							<VDivider class="ma-6 mb-8" />

							<!-- VCKick Settings -->
							<VRow>
								<VCol cols="12">
									<VCardTitle>
										Voice Chat Kick Settings
									</VCardTitle>
								</VCol>
								<VRow match-height>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member VC Kicks in the Private Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannel"
											v-model="guildSettingsModActionsLocal.vcKickLog" />
									</VCol>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member VC Kicks in the Public Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannelPublic"
											v-model="guildSettingsModActionsLocal.vcKickLogPublic" />
									</VCol>
								</VRow>
							</VRow>

							<VDivider class="ma-6 mb-8" />

							<!-- Warning Settings -->
							<VRow>
								<VCol cols="12">
									<VCardTitle>
										Warning Settings
									</VCardTitle>
								</VCol>
								<VRow match-height>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member Warnings in the Private Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannel"
											v-model="guildSettingsModActionsLocal.warnLog" />
									</VCol>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member Warnings in the Public Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannelPublic"
											v-model="guildSettingsModActionsLocal.warnLogPublic" />
									</VCol>
								</VRow>
							</VRow>

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
	<VRow v-if="loginData.userData?.isBotOwner">
		<VCol cols="12">
			<VCard title="PLACEHOLDER">
				<VRow v-for="value, setting in guildSettingsModActionsLocal">
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
