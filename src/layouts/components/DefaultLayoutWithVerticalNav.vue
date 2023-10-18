<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

import { useLoginDataStore } from '@/stores/api/oauth/loginData';
const loginData = useLoginDataStore();

import { useUserSettingsStore } from '@/stores/api/bot/userSettings';
const userSettingsStore = useUserSettingsStore();

import { useAppState } from '@/stores/appState';
const appState = useAppState();

import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue';

// Components
import Footer from '@/layouts/components/Footer.vue';
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue';
import UserProfile from '@/layouts/components/UserProfile.vue';
import SelectedGuild from '@/components/SelectedGuild.vue';

const botDisabled = computed(() => {
	return userSettingsStore.userSettings?.disableBot;
});

onMounted(async () => {
	// Force a logout -> login redirect if loginData isn't present or usable
	if (!loginData.userData || !loginData.userData.id) router.push({ name: 'logout' });
	// Fetch user's bot settings
	if (!userSettingsStore.userSettings) await userSettingsStore.fetch();
	// If user has opted out of bot interactions, only let them access Account Settings
	if (userSettingsStore.userSettings?.disableBot && route.path !== '/account-settings') router.push({ name: 'account-settings' });
});

watch(route, () => {
	// If user has opted out of bot interactions, only let them access Account Settings
	if (userSettingsStore.userSettings?.disableBot && route.path !== '/account-settings') router.push({ name: 'account-settings' });
	// Force a logout -> login redirect if loginData isn't present or usable
	if (!loginData.userData || !loginData.userData.id) router.push({ name: 'logout' });
});
</script>

<template>
	<VerticalNavLayout>
		<!-- 👉 navbar -->
		<template #navbar="{ toggleVerticalOverlayNavActive }">
			<div class="d-flex h-100 align-center">
				<!-- 👉 Vertical nav toggle in overlay mode -->
				<IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
					<VIcon icon="mdi-menu" />
				</IconBtn>

				<SelectedGuild v-if="appState.selectedGuild" :guildData="appState.selectedGuild" />

				<VSpacer />

				<IconBtn class="me-2" href="http://stickman.codes/discord" target="_blank" rel="noopener noreferrer">
					<VIcon icon="ic-baseline-discord" />
					<VTooltip activator="parent" open-delay="1000" scroll-strategy="close">
						stickBot Support Discord
					</VTooltip>
				</IconBtn>

				<IconBtn class="me-2" @click="loginData.refreshData()">
					<VIcon icon="mdi-refresh" />
					<VTooltip activator="parent" open-delay="1000" scroll-strategy="close">
						Refresh Discord Data
					</VTooltip>
				</IconBtn>

				<NavbarThemeSwitcher class="me-2" />

				<UserProfile v-if="loginData.userData" :userData="loginData.userData" />
			</div>
		</template>

		<template #vertical-nav-content>
			<VerticalNavLink :item="{
				title: 'Servers',
				icon: 'mdi-home-outline',
				to: '/guilds',
			}" :class="botDisabled ? 'disabled' : undefined" />
			<VerticalNavLink :item="{
				title: 'Account Settings',
				icon: 'mdi-account-cog-outline',
				to: '/account-settings',
			}" />

			<!-- 👉 Pages -->
			<VerticalNavSectionTitle :item="{
				heading: 'Bot Settings',
			}" />
			<div>
				<VTooltip activator="parent" v-if="!appState.selectedGuild" location="bottom">
					Select a Server to access Settings
				</VTooltip>
				<VerticalNavLink :item="{
					title: 'Server Settings',
					icon: 'ic-baseline-discord',
					to: '/settings'
				}" :class="appState.selectedGuild ? undefined : 'disabled'" />
				<VerticalNavLink :item="{
					title: 'Info Logs Settings',
					icon: 'mdi-form-select',
					to: '/settings/info-logs',
				}" :class="appState.selectedGuild ? undefined : 'disabled'" />
				<VerticalNavLink :item="{
					title: 'Mod Actions Settings',
					icon: 'mdi-moderator-outline',
					to: '/settings/mod-actions',
				}" :class="appState.selectedGuild ? undefined : 'disabled'" />
			</div>
			<!-- Developer Settings -->
			<VerticalNavSectionTitle :item="{
				heading: 'Developer Settings',
			}" v-if="loginData.userData?.isBotOwner" />
			<div v-if="loginData.userData?.isBotOwner">
				<VerticalNavLink :item="{
					title: 'Global Bot Settings',
					icon: 'ic-baseline-discord',
					to: '/settings/bot-global'
				}" />
				<div>
					<VTooltip activator="parent" v-if="!appState.selectedGuild" location="bottom">
						Select a Server to access this
					</VTooltip>
					<VerticalNavLink :item="{
						title: 'Guild Data Viewer',
						icon: 'ic-baseline-discord',
						to: '/debug/guild-data-viewer'
					}" :class="appState.selectedGuild ? undefined : 'disabled'" />
				</div>
			</div>
		</template>

		<!-- 👉 Pages -->
		<slot v-if="loginData.userData?.isBotOwner" />
		<VRow v-if="!loginData.userData?.isBotOwner">
			<VCard>
				<VCardTitle class="ma-4">
					stickBot Dashboard Disabled
				</VCardTitle>
				<VCardText class="ma-4">
					<p>Thanks for your interest in stickBot!</p>
					<p>Unfortunately, the dashboard is currently in closed alpha, and you don't have access to use it.</p>
					<p>If you'd like updates on when you can use the stickBot Dashboard, please join our Discord!</p>
				</VCardText>
				<VBtn href="http://stickman.codes/discord" target="_blank" class="mb-10"
					style="left: 50%; transform: translateX(-50%)">
					stickBot Discord
				</VBtn>
			</VCard>
		</VRow>

		<!-- 👉 Footer -->
		<template #footer>
			<Footer />
		</template>
	</VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
	border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
	border-radius: 6px;
	block-size: 1.5625rem;
	line-height: 1.3125rem;
	padding-block: 0.125rem;
	padding-inline: 0.25rem;
}
</style>
