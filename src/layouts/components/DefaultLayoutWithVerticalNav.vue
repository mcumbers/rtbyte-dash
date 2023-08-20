<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter()
import { useLoginDataStore } from '@/stores/loginData';
const loginData = useLoginDataStore();

// Send browser to Login page if not logged in
if (!loginData.userData || !loginData.userData.id) router.push({ name: 'login' });

import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

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

				<VSpacer />

				<IconBtn class="me-2" href="https://rtbyte.xyz/discord" target="_blank" rel="noopener noreferrer">
					<VIcon icon="mdi-discord" />
				</IconBtn>

				<NavbarThemeSwitcher class="me-2" />

				<UserProfile v-if="loginData.userData" v-bind="{ userData: loginData.userData }" />
			</div>
		</template>

		<template #vertical-nav-content>
			<VerticalNavLink :item="{
				title: 'Servers',
				icon: 'mdi-home-outline',
				to: '/guilds',
			}" />
			<VerticalNavLink :item="{
				title: 'My Account',
				icon: 'mdi-account-cog-outline',
				to: '/account',
			}" />

			<!-- 👉 Pages -->
			<VerticalNavSectionTitle :item="{
				heading: 'Pages',
			}" />
			<VerticalNavLink :item="{
				title: 'Login',
				icon: 'mdi-login',
				to: '/login',
			}" />
			<VerticalNavLink :item="{
				title: 'Register',
				icon: 'mdi-account-plus-outline',
				to: '/register',
			}" />
			<VerticalNavLink :item="{
				title: 'Error',
				icon: 'mdi-information-outline',
				to: '/no-existence',
			}" />

			<!-- 👉 User Interface -->
			<VerticalNavSectionTitle :item="{
				heading: 'User Interface',
			}" />
			<VerticalNavLink :item="{
				title: 'Typography',
				icon: 'mdi-alpha-t-box-outline',
				to: '/typography',
			}" />
			<VerticalNavLink :item="{
				title: 'Icons',
				icon: 'mdi-eye-outline',
				to: '/icons',
			}" />
			<VerticalNavLink :item="{
				title: 'Cards',
				icon: 'mdi-credit-card-outline',
				to: '/cards',
			}" />
			<VerticalNavLink :item="{
				title: 'Tables',
				icon: 'mdi-table',
				to: '/tables',
			}" />
			<VerticalNavLink :item="{
				title: 'Form Layouts',
				icon: 'mdi-form-select',
				to: '/form-layouts',
			}" />
		</template>

		<!-- 👉 Pages -->
		<slot />

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
