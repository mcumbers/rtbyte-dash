<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAppState } from '@/stores/appState';
const appState = useAppState();
import { useLoginDataStore } from '@/stores/api/oauth/loginData';
const loginData = useLoginDataStore();
// Return user to guild selection if no guild selected
if (!appState.selectedGuild) router.push({ name: 'guilds' });

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
			<h3>Coming Soon...</h3>
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
