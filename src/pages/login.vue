<script setup lang="ts">
import { useTheme } from 'vuetify';

import darkThemeLogo from '@images/wordmark-dark.svg?raw';
import lightThemeLogo from '@images/wordmark-light.svg?raw';
const vuetifyTheme = useTheme();
const logo = computed(() => {
	return vuetifyTheme.global.name.value === 'light'
		? lightThemeLogo
		: darkThemeLogo
});

const DiscordOauthURL = `https://discord.com/oauth2/authorize`;


const oauthURL = new URL(DiscordOauthURL);
oauthURL.search = new URLSearchParams([
	['redirect_uri', 'http://localhost:5173/oauth/register'],
	['response_type', 'code'],
	['scope', ['identify', 'guilds', 'guilds.members.read'].join(' ')],
	['client_id', '1141471276268011740']
]).toString();

const oauthURLString: string = oauthURL.toString();
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
					Welcome to the stickBot Dashboard!
				</h5>
				<p class="mb-0">
					Please sign-in to your Discord Account to Continue.
				</p>
			</VCardText>

			<VCardText>
				<VForm>
					<VRow>

						<!-- login button -->
						<VCol cols="12">
							<VBtn block :href=oauthURLString>
								Login With Discord
							</VBtn>
						</VCol>
					</VRow>
				</VForm>
			</VCardText>
		</VCard>
	</div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
