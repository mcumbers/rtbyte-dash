<script setup lang="ts">
interface Props {
	guildData: GuildData
}
const props = defineProps<Props>()

import { GuildData } from '@/stores/api/oauth/loginData';
import { iconURL } from '@/lib/util/helpers';

const guildIcon = computed(() => iconURL(props.guildData));

import { useAppState } from '@/stores/appState';
const appState = useAppState();

function clearSelectedGuild() {
	appState.clearSelectedGuild();
}

</script>

<template>
	<VHover open-delay="100">
		<template v-slot:default="{ isHovering, props }">
			<div v-bind="props">
				<VAvatar color="error">
					<VIcon icon="mdi-cancel" v-if="isHovering" size="75%" @click="clearSelectedGuild()" />
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
