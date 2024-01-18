<script setup lang="ts">
import { useAppState } from '@/stores/appState';
const appState = useAppState();
</script>
<template>
	<div class="h-100 d-flex align-center justify-space-between">
		<!-- 👉 Footer: left content -->
		<span class="d-flex align-center">
			&copy;
			{{ new Date().getFullYear() }}
			<a href="http://stickman.codes/stickbot" target="_blank" rel="noopener noreferrer"
				class="text-primary ms-1">stickbot</a>
		</span>
		<!-- 👉 Footer: right content -->
		<span class="d-md-flex gap-x-4 text-primary d-none">
		</span>
	</div>
</template>
