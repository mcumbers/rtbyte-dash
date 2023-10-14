<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAppState } from '@/stores/appState';
const appState = useAppState();
// Return user to guild selection if no guild selected
if (!appState.selectedGuild) router.push({ name: 'guilds' });
import { iconURL } from '@/lib/util/helpers';

import { useGuildSettingsInfoLogsStore } from '@/stores/api/bot/guildSettingsInfoLogs';
const guildSettingsInfoLogsStore = useGuildSettingsInfoLogsStore();

let guildSettingsInfoLogsLocal = ref({ ...guildSettingsInfoLogsStore.guildSettingsInfoLogs });

import GuildChannelSelect from '@/components/GuildChannelSelect.vue';

const resetForm = () => {
	guildSettingsInfoLogsLocal.value = { ...guildSettingsInfoLogsStore.guildSettingsInfoLogs };
};

async function updateSettings() {
	guildSettingsInfoLogsStore.$patch({ guildSettingsInfoLogs: guildSettingsInfoLogsLocal.value });
	await guildSettingsInfoLogsStore.update();
	return resetForm();
};

onMounted(async () => {
	if (!guildSettingsInfoLogsStore.guildSettingsInfoLogs) await guildSettingsInfoLogsStore.fetch();
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
			<VCard title="Server Info Log Settings">
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
							<!-- Info Log Channel -->
							<VCol cols="12" md="6">
								<GuildChannelSelect label="Info Log Channel"
									v-model="(guildSettingsInfoLogsLocal.infoLogChannel as string)" clearable />
							</VCol>

							<VDivider class="ma-6 mb-8" />

							<!-- Share Command Usage -->
							<VRow match-height>
								<VCol cols="12" md="6">
									<VCardTitle>
										Server Log Events
									</VCardTitle>
									<VCardText>
										Choose which events should trigger a message in the Server's info log.
									</VCardText>
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Log when Channels are Created" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.channelCreateLog" />
									<VSwitch label="Log when Channels are Deleted" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.channelDeleteLog" />
									<VSwitch label="Log when Channels are Updated" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.channelUpdateLog" />
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Log when Emoji are Created" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.emojiCreateLog" />
									<VSwitch label="Log when Emoji are Deleted" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.emojiDeleteLog" />
									<VSwitch label="Log when Emoji are Updated" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.emojiUpdateLog" />
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Log when Users join the Server" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.guildMemberAddLog" />
									<VSwitch label="Log when Users leave the Server" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.guildMemberRemoveLog" />
									<VSwitch label="Log when Users in the Server are Updated" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.guildMemberUpdateLog" />
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Log when Bots are added to the Server" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.guildBotAddLog" />
									<VSwitch label="Log when the Server's Info is Updated" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.guildUpdateLog" />
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Log when Server Events are Created" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.guildScheduledEventCreateLog" />
									<VSwitch label="Log when Server Events are Deleted" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.guildScheduledEventDeleteLog" />
									<VSwitch label="Log when Server Events are Updated" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.guildScheduledEventUpdateLog" />
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Log when Server Invites are Created" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.inviteCreateLog" />
									<VSwitch label="Log when Server Invites are Deleted" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.inviteDeleteLog" />
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Log when Messages are Deleted" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.messageDeleteLog" />
									<VSwitch label="Log when Messages are Updated" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.messageUpdateLog" />
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Log when Roles are Created" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.roleCreateLog" />
									<VSwitch label="Log when Roles are Deleted" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.roleDeleteLog" />
									<VSwitch label="Log when Roles are Updated" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.roleUpdateLog" />
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Log when Stage Instances are Created" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.stageInstanceCreateLog" />
									<VSwitch label="Log when Stage Instances are Deleted" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.stageInstanceDeleteLog" />
									<VSwitch label="Log when Stage Instances are Updated" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.stageInstanceUpdateLog" />
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Log when Stickers are Created" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.stickerCreateLog" />
									<VSwitch label="Log when Stickers are Deleted" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.stickerDeleteLog" />
									<VSwitch label="Log when Stickers are Updated" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.stickerUpdateLog" />
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Log when Threads are Created" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.threadCreateLog" />
									<VSwitch label="Log when Threads are Deleted" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.threadDeleteLog" />
									<VSwitch label="Log when Threads are Updated" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.threadUpdateLog" />
								</VCol>
								<VCol cols="12" md="6" class="pl-8 pt-6">
									<VSwitch label="Log when Webhooks are Created" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.webhookCreateLog" />
									<VSwitch label="Log when Webhooks are Deleted" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.webhookDeleteLog" />
									<VSwitch label="Log when Webhooks are Updated" inset
										:disabled="!guildSettingsInfoLogsLocal.infoLogChannel"
										v-model="guildSettingsInfoLogsLocal.webhookUpdateLog" />
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
</template>
