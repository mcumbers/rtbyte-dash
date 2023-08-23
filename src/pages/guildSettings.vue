<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAppState } from '@/stores/appState';
const appState = useAppState();
// Return user to guild selection if no guild selected
if (!appState.selectedGuild) router.push({ name: 'guilds' });

import { useGuildSettingsStore } from '@/stores/API Data/guildSettings';
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
	if (!guildSettingsStore.guildSettings) await guildSettingsStore.fetch(appState.selectedGuild!.id);
	resetForm();
});

// Return user to guild selection if guild selection cleared on this page
appState.$subscribe(() => {
	if (!appState.selectedGuild) router.push({ name: 'guilds' });
});
</script>

<template>
	<VCard v-for="value, setting in guildSettingsLocal">
		<VCardTitle>
			{{ setting }}
		</VCardTitle>
		<VCardText>
			{{ value }}
		</VCardText>
	</VCard>
</template>
