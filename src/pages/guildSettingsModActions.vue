<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAppState } from '@/stores/appState';
const appState = useAppState();
// Return user to guild selection if no guild selected
if (!appState.selectedGuild) router.push({ name: 'guilds' });

import { useGuildSettingsModActionsStore } from '@/stores/API Data/guildSettingsModActions';
const guildSettingsModActionsStore = useGuildSettingsModActionsStore();

let guildSettingsModActionsLocal = ref({ ...guildSettingsModActionsStore.guildSettingsModActions });

const resetForm = () => {
	guildSettingsModActionsLocal.value = { ...guildSettingsModActionsStore.guildSettingsModActions }
}

async function updateSettings() {
	guildSettingsModActionsStore.$patch({ guildSettingsModActions: guildSettingsModActionsLocal.value });
	await guildSettingsModActionsStore.update();
	return resetForm();
}

onMounted(async () => {
	if (!guildSettingsModActionsStore.guildSettingsModActions) await guildSettingsModActionsStore.fetch(appState.selectedGuild!.id);
	resetForm();
});

// Return user to guild selection if guild selection cleared on this page
appState.$subscribe(() => {
	if (!appState.selectedGuild) router.push({ name: 'guilds' });
});
</script>

<template>
	<VCard v-for="value, setting in guildSettingsModActionsLocal">
		<VCardTitle>
			{{ setting }}
		</VCardTitle>
		<VCardText>
			{{ value }}
		</VCardText>
	</VCard>
</template>
