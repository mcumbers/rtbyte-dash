<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAppState } from '@/stores/appState';
const appState = useAppState();
import { useGuildSettingsStore } from '@/stores/API Data/guildSettings';
const guildSettingsStore = useGuildSettingsStore();

onMounted(() => {
	if (!appState.selectedGuild) router.push('guilds');
});

onUpdated(() => {
	if (!appState.selectedGuild) router.push('guilds');
});

let guildSettingsLocal = ref({ ...guildSettingsStore.guildSettings })

const resetForm = () => {
	guildSettingsLocal.value = { ...guildSettingsStore.guildSettings }
}

async function updateSettings() {
	guildSettingsStore.$patch({ guildSettings: guildSettingsLocal.value });
	await guildSettingsStore.update();
	return resetForm();
}
</script>

<template>
	<VCard v-for="value, setting in guildSettingsStore.guildSettings">
		<VCardTitle>
			{{ setting }}
		</VCardTitle>
		<VCardText>
			{{ value }}
		</VCardText>
	</VCard>
</template>
