<script setup lang="ts">
interface Props {
	guildData: GuildData | null
}
const props = defineProps<Props>()

import { botInviteString } from '@/lib/util/helpers';
import { useLoginDataStore, GuildData } from '@/stores/loginData';
const loginData = useLoginDataStore();

const guildIcon = computed(() => props.guildData ? loginData.iconURL(props.guildData) : '');

import { useAppState } from '@/stores/appState';
const appState = useAppState();

const isSelected = computed(() => props.guildData?.id === appState.selectedGuild?.id);

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
			<div class="pb-5" v-if="!isSelected">
				<!-- Bright button showing if guild can be managed and bot is in guild -->
				<VBtn v-if="props.guildData.botInGuild && props.guildData.canManageServer"
					style="left: 50%; transform: translateX(-50%)" @click="appState.selectGuild(props.guildData)">
					Manage Server
				</VBtn>
				<!-- Dim button if bot can be added to guild -->
				<VBtn variant="tonal" :href=botInviteString(props.guildData) target="_blank"
					v-if="!props.guildData.botInGuild" :disabled="!props.guildData.canManageServer"
					style="left: 50%; transform: translateX(-50%)">
					Add To Server
				</VBtn>
				<!-- Dim & Disabled button if user can't manage guild -->
				<VBtn v-if="props.guildData.botInGuild && !props.guildData.canManageServer" variant="tonal" disabled
					style="left: 50%; transform: translateX(-50%)">
					Manage Server
				</VBtn>
				<!-- Tooltip on button hover if user can't add bot to guild  -->
				<VTooltip v-if="!props.guildData.botInGuild && !props.guildData.canManageServer" activator="parent"
					open-delay="100" scroll-strategy="close">
					Ask an Administrator to add RTByte to this server!
				</VTooltip>
				<!-- Tooltip on button hover if user can't manage server -->
				<VTooltip v-if="props.guildData.botInGuild && !props.guildData.canManageServer" activator="parent"
					open-delay="100" scroll-strategy="close">
					You don't have permission to manage this server.
				</VTooltip>
			</div>
			<!-- Button displayed when this guild is selected -->
			<div class="pb-5" v-if="isSelected">
				<VBtn style="left: 50%; transform: translateX(-50%)" disabled>
					Managing Server...
				</VBtn>
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
