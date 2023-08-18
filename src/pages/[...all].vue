<script setup lang="ts">
import miscMaskDark from '@images/pages/misc-mask-dark.png'
import miscMaskLight from '@images/pages/misc-mask-light.png'
import triangleDark from '@images/misc/triangle-dark.png'
import triangleLight from '@images/misc/triangle-light.png'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
    ? miscMaskLight
    : miscMaskDark
})
const triangleBg = computed(() => vuetifyTheme.global.name.value === 'light' ? triangleLight : triangleDark);
</script>

<template>
  <div class="misc-wrapper">
	  <VCard>
	    <VCardText>
			<h1 class="text-center ma-5">
			    404
			</h1>
	    	<h2>
	    		Page Not Found ⚠️
	      	</h2>
	      	<span class="text-caption">
				We couldn't find the page you are looking for.
			</span>
	    </VCardText>
		<VBtn class="mb-5" style="left: 50%; transform: translateX(-50%)">
			Back to Home
		</VBtn>
	</VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/misc.scss";

.misc-footer-tree {
  inline-size: 15.625rem;
  inset-block-end: 3.5rem;
  inset-inline-start: 0.375rem;
}
</style>
