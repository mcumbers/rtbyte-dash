<script setup lang="ts">
import { useTheme } from 'vuetify'
import axios, { Axios, AxiosError } from 'axios';

import darkThemeLogo from '@images/wordmark-dark.svg?raw'
import lightThemeLogo from '@images/wordmark-light.svg?raw'
const vuetifyTheme = useTheme()
const logo = computed(() => {
	return vuetifyTheme.global.name.value === 'light'
		? lightThemeLogo
		: darkThemeLogo
})

import type { LoginData } from '@sapphire/plugin-api';

async function exchangeCodeForAccessToken() {
	const codeSearchParam = new URL(window.location.href).searchParams.get('code');

	try {
		const response = await axios.post('http://localhost:4000/oauth/callback', {
			code: codeSearchParam
		});

		console.log(response);

		// Now store data somewhere so you can access it later.
		localStorage.setItem('discord-data', JSON.stringify(response.data));

		// Lastly, send the user back to the home page or similar:
		window.location.replace('/');

	} catch (error) {
		console.log(error);
	}
}

onMounted(async () => {
	await exchangeCodeForAccessToken();
})
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
