<script setup lang="ts">
import { useLoginDataStore } from '@/stores/loginData';
import GuildCard from '@/components/GuildCard.vue';
const loginData = useLoginDataStore();

// Make a local array of the loginData guilds
const guilds = computed(() => {
	return new Array(...loginData.userGuilds)
		// Sort them Alphabetically
		.sort((guildA, guildB) => guildA.name > guildB.name ? 0 : 1)
		// Sort them by how you can interact with them:
		// Highest will be guilds you can manage which also have the bot
		// Next are guilds you manage that you can add the bot to
		// Followed by guilds that have the bot, but you can't manage
		// And finally, guilds you can't manage, and you can't add the bot to
		.sort((guildA, guildB) => {
			let pointsA = 0;
			if (guildA.canManageServer && guildA.botInGuild) pointsA += 3;
			if (guildA.canManageServer) pointsA += 2;
			if (guildA.botInGuild) pointsA += 1;
			let pointsB = 0;
			if (guildB.canManageServer && guildB.botInGuild) pointsB += 3;
			if (guildB.canManageServer) pointsB += 2;
			if (guildB.botInGuild) pointsB += 1;
			return pointsA > pointsB ? 0 : 1;
		});
});
</script>

<template>
	<VRow class="match-height">
		<GuildCard v-for="guildData in guilds" v-bind="{ guildData }" v-bind:key="guildData.id" />
	</VRow>
</template>
