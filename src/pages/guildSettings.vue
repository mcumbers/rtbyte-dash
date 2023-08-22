<script lang="ts" setup>
import { useAppState } from '@/stores/appState';
const appState = useAppState();
import { useGuildSettingsStore } from '@/stores/API Data/guildSettings';
const guildSettingsStore = useGuildSettingsStore();

let guildSettingsLocal = ref({ ...guildSettingsStore.guildSettings })

const resetForm = () => {
	guildSettingsLocal.value = { ...guildSettingsStore.guildSettings }
}

async function updateSettings() {
	guildSettingsStore.$patch({ guildSettings: guildSettingsLocal.value });
	await guildSettingsStore.update();
	return resetForm();
}

onMounted(async () => {
	await guildSettingsStore.fetch(appState.selectedGuild?.id);
});

</script>

<template>
	<VCard v-for="setting, value in guildSettingsStore.guildSettings">
		<VCardTitle>
			{{ setting }}
		</VCardTitle>
		<VCardText>
			{{ value }}
		</VCardText>
	</VCard>
</template>
