<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
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
			<VBtn class="mb-5" style="left: 50%; transform: translateX(-50%)" @click="router.push({ name: 'guilds' })">
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
