<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAppState } from '@/stores/appState';
const appState = useAppState();
// Return user to guild selection if no guild selected
if (!appState.selectedGuild) router.push({ name: 'guilds' });

import { ReadableLanguageTags, ReadableMeasurementSystems } from '@/lib/util/readableTypes';
import { iconURL } from '@/lib/util/helpers';

import { useGuildChannelsStore, type APIGuildChannel } from '@/stores/api/discord/guildChannels';
const guildChannelsStore = useGuildChannelsStore();

import GuildChannelSelect from '@/components/GuildChannelSelect.vue';

import { useGuildSettingsStore } from '@/stores/api/bot/guildSettings';
const guildSettingsStore = useGuildSettingsStore();

let guildSettingsLocal = ref({ ...guildSettingsStore.guildSettings });

const resetForm = () => {
	guildSettingsLocal.value = { ...guildSettingsStore.guildSettings }
}

async function updateSettings() {
	guildSettingsStore.$patch({ guildSettings: guildSettingsLocal.value });
	await guildSettingsStore.update();
	return resetForm();
}

onMounted(async () => {
	if (!guildSettingsStore.guildSettings) await guildSettingsStore.fetch();
	if (!guildChannelsStore.guildChannels.length) await guildChannelsStore.fetchAll();
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
			<VCard title="Server Settings">
				<VCardText class="d-flex flex-row mb-6">
					<!-- 👉 Avatar -->
					<VAvatar color="background" size="x-large">
						<VImg :src="iconURL(appState.selectedGuild!)" />
					</VAvatar>
					<h3 class="ma-2 pa-2 pt-3">
						{{ appState.selectedGuild?.name }}
					</h3>
				</VCardText>

				<VDivider />

				<VCardText>
					<!-- Form -->
					<VForm class="mt-6">
						<VRow>
							<!-- Language -->
							<VCol cols="12" md="6">
								<VSelect v-model="guildSettingsLocal.chatLanguage" label="Language"
									:items="ReadableLanguageTags" item-title="display" item-value="value" />
							</VCol>

							<!-- Measurement Units -->
							<VCol cols="12" md="6">
								<VSelect v-model="guildSettingsLocal.chatMeasurementUnits" label="Measurement Units"
									:items="ReadableMeasurementSystems" item-title="display" item-value="value" />
							</VCol>

							<VDivider class="ma-6 mb-8" />

							<!-- Share Guild Info -->
							<VRow match-height>
								<VCol cols="12" md="6">
									<VCardTitle>
										Share Server Info
									</VCardTitle>
									<VCardText>
										Choose to share detailed information about your Server with the Developers of
										RTByte. Basic information sharing can't be disabled, as it's necessary to monitor
										the health of the Bot.
									</VCardText>
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<div>
										<VSwitch label="Share Server Info" inset :model-value="true" disabled />
										<VTooltip activator="parent" location="start">
											Basic information sharing can't be disabled
										</VTooltip>
									</div>
									<VSwitch label="Share Detailed Server Info" inset
										v-model="guildSettingsLocal.shareGuildInfoDetailed" />
								</VCol>
							</VRow>

							<!-- Share Command Usage -->
							<VRow match-height>
								<VCol cols="12" md="6">
									<VCardTitle>
										Share Command Usage
									</VCardTitle>
									<VCardText>
										Choose to share information about commands used in your Server with the Developers
										of RTByte.
									</VCardText>
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Share Command Usage" inset
										v-model="guildSettingsLocal.shareGuildCommandUsage" />
									<VSwitch label="Share Detailed Command Usage" inset
										:disabled="!guildSettingsLocal.shareGuildCommandUsage"
										v-model="guildSettingsLocal.shareGuildCommandUsageDetailed" />
								</VCol>
							</VRow>

							<VDivider class="ma-6 mb-8" />

							<!-- Share Ban Info -->
							<VRow match-height>
								<VCol cols="12" md="6">
									<VCardTitle>
										Share Ban Info
									</VCardTitle>
									<VCardText>
										Choose to share information about users you've banned with other Discord Servers
										that
										use RTByte.
									</VCardText>
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Share Guild Bans" inset v-model="guildSettingsLocal.shareGuildBans" />
									<VSwitch label="Share Guild Ban Details" inset
										:disabled="!guildSettingsLocal.shareGuildBans"
										v-model="guildSettingsLocal.shareGuildBansDetailed" />
								</VCol>
							</VRow>

							<VRow match-height>
								<!-- Share Moderation Activity -->
								<VCol cols="12" md="6">
									<VCardTitle>
										Share Moderation Activity
									</VCardTitle>
									<VCardText>
										Choose to share information about non-ban moderation activity with other Discord
										Servers that use RTByte.
									</VCardText>
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Share Guild Moderation Activity" inset
										v-model="guildSettingsLocal.shareGuildModeration" />
									<VSwitch label="Share Guild Moderation Activity Details" inset
										:disabled="!guildSettingsLocal.shareGuildModeration"
										v-model="guildSettingsLocal.shareGuildModerationDetailed" />
								</VCol>
							</VRow>

							<VDivider class="ma-6 mb-8" />

							<VRow>
								<VCol cols="12">
									<VRow match-height>
										<VCol cols="6">
											<VCardTitle>
												Server Welcome Messages
											</VCardTitle>
										</VCol>
										<VCol cols="6" class="pl-8 pt-6">
											<VSwitch label="Send a Welcome Message to Users joining the Server" inset
												v-model="guildSettingsLocal.greetingWelcomeEnabled" />
										</VCol>
									</VRow>
									<VRow match-height v-if="guildSettingsLocal.greetingWelcomeEnabled">
										<VCol cols="6" class="pl-8 pr-6">
											<VTextField label="Welcome Message"
												v-model="guildSettingsLocal.greetingWelcomeMessage" />
										</VCol>
										<VCol cols="6" class="pl-8 pr-6">
											<GuildChannelSelect label="Welcome Message Channel"
												v-model="(guildSettingsLocal.greetingWelcomeChannel as string)" clearable />
										</VCol>
									</VRow>
								</VCol>
							</VRow>

							<VRow>
								<VCol cols="12">
									<VRow match-height>
										<VCol cols="6">
											<VCardTitle>
												Server Goodbye Messages
											</VCardTitle>
										</VCol>
										<VCol cols="6" class="pl-8 pt-6">
											<VSwitch label="Say Goodbye to Users Leaving the Server" inset
												v-model="guildSettingsLocal.greetingGoodbyeEnabled" />
										</VCol>
									</VRow>
									<VRow match-height v-if="guildSettingsLocal.greetingGoodbyeEnabled">
										<VCol cols="6" class="pl-8 pr-6">
											<VTextField label="Goodbye Message"
												v-model="guildSettingsLocal.greetingGoodbyeMessage" />
										</VCol>
										<VCol cols="6" class="pl-8 pr-6">
											<GuildChannelSelect label="Goodbye Message Channel"
												v-model="(guildSettingsLocal.greetingGoodbyeChannel as string)" clearable />
										</VCol>
									</VRow>
								</VCol>
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

	<VCardTitle>
		PLACEHOLDER
	</VCardTitle>

	<VCard>
		<VCardText>
			{{ guildSettingsLocal.greetingWelcomeChannel }}
		</VCardText>
	</VCard>
</template>
