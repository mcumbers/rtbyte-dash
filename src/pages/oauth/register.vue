<script setup lang="ts">
import axios from 'axios';
import { useTheme } from 'vuetify';
const vuetifyTheme = useTheme();
import { useLoginDataStore } from '@/stores/loginData';
const loginData = useLoginDataStore();

import darkThemeLogo from '@images/wordmark-dark.svg?raw';
import lightThemeLogo from '@images/wordmark-light.svg?raw';

const logo = computed(() => {
	return vuetifyTheme.global.name.value === 'light'
		? lightThemeLogo
		: darkThemeLogo
});

async function exchangeCodeForAccessToken() {
	// Grab the oAuth Code from URL Params
	const codeSearchParam = new URL(window.location.href).searchParams.get('code');

	try {
		// Post the oAuth Code to the bot to authenticate
		const response = await axios.post('http://localhost:4000/oauth/callback', {
			code: codeSearchParam
		});

		// Grab the login data from the response, and put it in our app's store
		loginData.$patch({ userData: response.data.user, userGuilds: response.data.transformedGuilds });

		// Send the user back to index
		window.location.replace('/');

	} catch (error) {
		console.log(error);
	}
}

onMounted(async () => {
	await exchangeCodeForAccessToken();
});
</script>



<template>
	<div class="auth-wrapper d-flex align-center justify-center pa-4">
		<VCard class="auth-card pa-4 pt-7" max-width="448">
			<VCardItem class="justify-center">
				<template #prepend>
					<div class="d-flex">
						<div v-html="logo" />
					</div>
				</template>
			</VCardItem>

			<VCardText class="pt-2">
				<h5 class="text-h5 font-weight-semibold mb-1">
					Logging into the RTByte Dashboard...
				</h5>
			</VCardText>
		</VCard>
	</div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
