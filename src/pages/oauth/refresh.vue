<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
import { useLoginDataStore } from '@/stores/api/oauth/loginData';
const loginData = useLoginDataStore();

import { useTheme } from 'vuetify';
const vuetifyTheme = useTheme();
import darkThemeLogo from '@images/wordmark-dark.svg?raw';
import lightThemeLogo from '@images/wordmark-light.svg?raw';
const logo = computed(() => {
	return vuetifyTheme.global.name.value === 'light'
		? lightThemeLogo
		: darkThemeLogo
});

const errorTimeout = 3 * 1000;
const errorRedirect = 5 * 1000;

let showError = false;

onMounted(async () => {
	const fetchedData = await loginData.refreshData();
	if (fetchedData?.userData?.id) return router.push({ name: 'guilds' });

	setTimeout(() => {
		showError = true;
		setTimeout(() => {
			return router.push({ name: 'login' });
		}, errorRedirect);
	}, errorTimeout);
});
</script>



<template>
	<div class="auth-wrapper d-flex align-center justify-center pa-4">
		<!-- Regular Card -->
		<VCard class="auth-card pa-4 pt-7" max-width="448" v-if="!showError">
			<VCardItem class="justify-center">
				<template #prepend>
					<div class="d-flex">
						<div v-html="logo"></div>
					</div>
				</template>
			</VCardItem>

			<VCardText class="pt-2">
				<h5 class="text-h5 font-weight-semibold mb-1">
					Logging into the stickBot Dashboard...
				</h5>
			</VCardText>
		</VCard>
		<!-- Error Card -->
		<VCard class="auth-card pa-4 pt-7" max-width="448" v-if="showError">
			<VCardItem class="justify-center">
				<template #prepend>
					<div class="d-flex">
						<div v-html="logo"></div>
					</div>
				</template>
			</VCardItem>

			<VCardText v-if="showError">
				<h1 class="text-center ma-5">
					Whoops! Something went wrong...
				</h1>
				<span class="text-caption">
					We couldn't log you in properly. Sending you back to Login.
				</span>
			</VCardText>
		</VCard>
	</div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
