<script setup lang="ts">
import { useTheme } from 'vuetify'

import darkThemeLogo from '@images/wordmark-dark.svg?raw'
import lightThemeLogo from '@images/wordmark-light.svg?raw'
const vuetifyTheme = useTheme()
const logo = computed(() => {
	return vuetifyTheme.global.name.value === 'light'
		? lightThemeLogo
		: darkThemeLogo
})

onMounted(async () => {
	localStorage.clear();
	document.cookie = 'RTBYTE_AUTH' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	window.location.replace('/login');
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
					Logging you out...
				</h5>
			</VCardText>
		</VCard>
	</div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
