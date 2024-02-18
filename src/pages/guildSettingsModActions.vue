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
									<VCol cols="6" class="pl-8 pt-6">
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
								<VRow>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member Bans in the Mod Log" inset
											:disabled="!guildSettingsModActionsLocal.modLogChannel"
											v-model="guildSettingsModActionsLocal.banLog" />
										<VSwitch label="Log Member Unbans in the Mod Log" inset
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
								<VRow>
									<VCol cols="12" md="6" class="pl-8 pt-6">
										<VSwitch label="Log Member Kicks in the Mod Log" inset
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
