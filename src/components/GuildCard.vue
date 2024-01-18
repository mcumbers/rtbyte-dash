<script setup lang="ts">
interface Props {
	guildData: GuildData | null
}
const props = defineProps<Props>()

import { botInviteString } from '@/lib/util/helpers';
import { GuildData } from '@/stores/api/oauth/loginData';
import { iconURL } from '@/lib/util/helpers';

import { useAppState } from '@/stores/appState';
const appState = useAppState();

const guildIcon = computed(() => props.guildData ? iconURL(props.guildData) : '');

const isSelected = computed(() => {
	if (!props.guildData) return false;
	if (!appState.selectedGuild) return false;
	if (props.guildData.id !== appState.selectedGuild.id) return false;
	return true;
});

function selectGuild() {
	appState.selectGuild(props.guildData!);
}

const tooltipText = computed(() => {
	if (!props.guildData) return null;
	if (props.guildData.canManageServer) return null;
	if (props.guildData.botInGuild) return 'You don\'t have permission to manage this server.';
	return `Ask an Administrator to add ${useAppState().botInfo?.name} to this server!`;
});

const buttonText = computed(() => {
	if (!props.guildData) return null;
	if (props.guildData.botInGuild) return 'Manage Server';
	return 'Add to Server';
});

</script>

<template>
	<VCol cols="12" md="3">
		<!-- If guildData is provided -->
		<VCard v-if="props.guildData" :variant="isSelected ? 'outlined' : undefined" :disabled="isSelected">
			<VCardText class="position-relative text-center">
				<!-- Guild Image -->
				<VAvatar size="75" class="avatar-center" color="#2B2D31">
					<VImg :src="guildIcon" />
				</VAvatar>

				<!-- Guild Name, Subtitle & Action Button -->
				<div class="d-flex text-center flex-wrap pt-5">
					<div class="me-2 mb-2">
						<VCardTitle class="text-wrap">{{ props.guildData.name }}</VCardTitle>
					</div>
				</div>
			</VCardText>
			<div class="pb-5">
				<!-- Dim & Disabled button if user can't manage guild -->
				<VBtn v-if="buttonText || isSelected"
					:variant="!props.guildData.canManageServer || !props.guildData.botInGuild ? 'tonal' : undefined"
					:disabled="!props.guildData.canManageServer || isSelected"
					:href="!props.guildData.botInGuild ? botInviteString(props.guildData) : undefined"
					style="left: 50%; transform: translateX(-50%)" @click="selectGuild()">
					{{ isSelected ? 'Selected' : buttonText }}
				</VBtn>
				<VTooltip v-if="tooltipText" activator="parent" open-delay="100" scroll-strategy="close">
					{{ tooltipText }}
				</VTooltip>
			</div>
		</VCard>
		<!-- If guildData is not provided -->
		<VCard v-if="!props.guildData">
			<VCardText class="position-relative text-center">
				<!-- Cancel Icon w/ Red Background -->
				<VAvatar class="avatar-center" color="primary" size="100">
					<VIcon icon="mdi-cancel" size="75%" />
				</VAvatar>
				<!-- Message saying User has no Guilds -->
				<div class="d-flex text-center flex-wrap pt-5">
					<div class="me-2 mb-2">
						<VCardTitle class="text-wrap">You aren't in any Discord Servers.</VCardTitle>
					</div>
				</div>
			</VCardText>
		</VCard>
	</VCol>
</template>

<style lang="scss" scoped></style>
