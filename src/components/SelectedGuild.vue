<script setup lang="ts">
interface Props {
	guildData: GuildData
}
const props = defineProps<Props>()

import { GuildData } from '@/stores/loginData';
import { iconURL } from '@/lib/util/helpers';

const guildIcon = computed(() => iconURL(props.guildData));

import { useAppState } from '@/stores/appState';
const appState = useAppState();

import { useGuildSettingsStore } from '@/stores/API Data/guildSettings';
const guildSettingsStore = useGuildSettingsStore();

import { useGuildSettingsInfoLogsStore } from '@/stores/API Data/guildSettingsInfoLogs';
const guildSettingsInfoLogsStore = useGuildSettingsInfoLogsStore();

function clearSelectedGuild() {
	appState.clearSelectedGuild();
	guildSettingsStore.$reset();
	guildSettingsInfoLogsStore.$reset();
}

</script>

<template>
	<VHover open-delay="100">
		<template v-slot:default="{ isHovering, props }">
			<div v-bind="props">
				<VAvatar color="error">
					<VIcon icon="mdi-cancel" size="90%" @click="clearSelectedGuild()" />
					<VImg :src="guildIcon" v-if="!isHovering" transition="fade-transition" />
				</VAvatar>
				<VTooltip activator="parent" open-delay="100">
					Deselect Server
				</VTooltip>
			</div>
		</template>
	</VHover>
	<h3 class="pl-3">{{ guildData.name }}</h3>
</template>

<style></style>
