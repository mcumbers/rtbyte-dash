<script setup lang="ts">
import darkThemeLogo from '@images/wordmark-dark.svg?raw'
import lightThemeLogo from '@images/wordmark-light.svg?raw'
import { VerticalNavLink, VerticalNavSectionTitle } from '@layouts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const logo = computed(() => {
	return vuetifyTheme.global.name.value === 'light'
		? lightThemeLogo
		: darkThemeLogo
})
</script>

<template>
	<!-- 👉 Nav header -->
	<div class="nav-header">
		<RouterLink to="/" class="app-logo d-flex align-center gap-x-3 app-title-wrapper w-75">
			<!-- ℹ️ You can also use img tag or VImg here -->
			<div class="d-flex" v-html="logo" />
		</RouterLink>
	</div>

	<!-- 👉 Nav items -->
	<ul>
		<VerticalNavLink :item="{
			title: 'Servers',
			to: 'index',
			icon: { icon: 'mdi-home-outline' }
		}" />
		<VerticalNavLink :item="{
			title: 'My Account',
			to: 'account',
			icon: { icon: 'mdi-account-cog-outline' }
		}" />
		<!-- 👉 Pages -->
		<VerticalNavSectionTitle :item="{ heading: 'Pages' }" />
		<VerticalNavLink :item="{
			title: 'Login',
			to: 'login',
			target: '_blank',
			icon: { icon: 'mdi-login' }
		}" />
		<VerticalNavLink :item="{
			title: 'Register',
			to: 'register',
			target: '_blank',
			icon: { icon: 'mdi-account-plus-outline' }
		}" />

		<!-- ℹ️ This path doesn't exist so 404 route will catch this undefined path -->
		<VerticalNavLink :item="{
			title: 'Error',
			to: { path: '/error' },
			target: '_blank',
			icon: { icon: 'mdi-alert-circle-outline' }
		}" />

		<!-- 👉 User Interface -->
		<VerticalNavSectionTitle :item="{ heading: 'User Interface' }" />

		<VerticalNavLink :item="{
			title: 'Typography',
			to: 'typography',
			icon: { icon: 'mdi-alpha-t-box-outline' }
		}" />
		<VerticalNavLink :item="{
			title: 'Icons',
			to: 'icons',
			icon: { icon: 'mdi-eye-outline' }
		}" />
		<VerticalNavLink :item="{
			title: 'Cards',
			to: 'card-basic',
			icon: { icon: 'mdi-credit-card-outline' }
		}" />
		<VerticalNavLink :item="{
			title: 'Tables',
			to: 'tables',
			icon: { icon: 'mdi-table' }
		}" />
		<VerticalNavLink :item="{
			title: 'Form Layouts',
			to: 'form-layouts',
			icon: { icon: 'mdi-form-select' }
		}" />
	</ul>
</template>
