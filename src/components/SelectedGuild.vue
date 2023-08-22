<script setup lang="ts">
interface Props {
	guildData: GuildData
}
const props = defineProps<Props>()

import { GuildData, useLoginDataStore } from '@/stores/loginData';
const loginData = useLoginDataStore();

const guildIcon = computed(() => loginData.iconURL(props.guildData));

import { useAppState } from '@/stores/appState';
const appState = useAppState();

</script>

<template>
	<VHover open-delay="500">
		<template v-slot:default="{ isHovering, props }">
			<div v-bind="props">
				<VAvatar color="error">
					<VIcon icon="mdi-cancel" size="90%" @click="appState.clearSelectedGuild()" />
					<VImg :src="guildIcon" v-if="!isHovering" transition="fade-transition" />
				</VAvatar>
				<VTooltip activator="parent" open-delay="500">
					Deselect Server
				</VTooltip>
			</div>
		</template>
	</VHover>
	<h3 class="pl-3">{{ guildData.name }}</h3>
</template>

<style></style>
