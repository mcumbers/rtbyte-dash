<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { GuildData, useLoginDataStore } from '@/stores/api/oauth/loginData';
const loginData = useLoginDataStore();
import { useBotGlobalSettingsStore } from '@/stores/api/bot/botGlobalSettings';
const botGlobalSettingsStore = useBotGlobalSettingsStore();
import { useAppState } from '@/stores/appState';
const appState = useAppState();

const controlGuild = loginData.userGuilds.find((guild) => guild.id === botGlobalSettingsStore.botGlobalSettings?.controlGuildID);
appState.selectGuild(controlGuild as GuildData);

import GuildChannelSelect from '@/components/GuildChannelSelect.vue';

// Return user to guild selection if not a bot owner
if (!loginData.userData?.isBotOwner) router.push({ name: 'guilds' });

let botGlobalSettingsLocal = ref({ ...botGlobalSettingsStore.botGlobalSettings });

const resetForm = () => {
	botGlobalSettingsLocal.value = { ...botGlobalSettingsStore.botGlobalSettings };
};

async function updateSettings() {
	botGlobalSettingsStore.$patch({ botGlobalSettings: botGlobalSettingsLocal.value });
	await botGlobalSettingsStore.update();
	return resetForm();
};

onMounted(async () => {
	if (!botGlobalSettingsStore.botGlobalSettings) await botGlobalSettingsStore.fetch();
	resetForm();
});

// Return user to guild selection if guild selection cleared on this page
appState.$subscribe(() => {
	if (!appState.selectedGuild) router.push({ name: 'guilds' });
});
</script>

<template>
	<VRow v-if="loginData.userData?.isBotOwner">
		<VCol cols="12">
			<VCard title="Bot Settings">
				<VCardText class="d-flex flex-row mb-6">
					<!-- 👉 Avatar -->
					<VAvatar color="background" size="x-large">
						<VImg :src="(loginData.botData?.avatarURL as string)" />
					</VAvatar>
					<h3 class="ma-2 pa-2 pt-3">
						{{ loginData.botData?.username }}
					</h3>
				</VCardText>

				<VDivider />

				<VCardText>
					<!-- Form -->
					<VForm class="mt-6">
						<VRow>
							<VCol cols="12" md="6" class="pr-8">
								<GuildChannelSelect label="Private Global Log Channel"
									v-model="(botGlobalSettingsLocal.globalLogChannelPrivate as string)" clearable />
							</VCol>
							<VCol cols="12" md="6" class="pr-8">
								<GuildChannelSelect label="Public Global Log Channel"
									v-model="(botGlobalSettingsLocal.globalLogChannelPublic as string)" clearable />
							</VCol>

							<VDivider class="ma-6 mb-8" />

							<!-- Ban Settings -->
							<VRow>
								<VCol cols="12">
									<VCardTitle>
										Ban Settings
									</VCardTitle>
								</VCol>
								<VRow match-height>
									<VCol cols="12" md="6" class="pl-12 pt-6">
										<VSwitch label="Log Command Executions in the Private Global Log" inset
											:disabled="!botGlobalSettingsLocal.globalLogChannelPrivate"
											v-model="botGlobalSettingsLocal.globalLogCommandExecution" />
									</VCol>
									<VCol cols="12" md="6" class="pl-12 pt-6">
										<VSwitch label="Log Failed Command Executions in the Private Global Log" inset
											:disabled="!botGlobalSettingsLocal.globalLogChannelPrivate"
											v-model="botGlobalSettingsLocal.globalLogCommandExecutionFailure" />
									</VCol>
								</VRow>
							</VRow>

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
				<VRow v-for="value, setting in botGlobalSettingsLocal">
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
