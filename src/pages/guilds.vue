<script setup lang="ts">
import { useLoginDataStore } from '@/stores/loginData';
import GuildCard from '@/components/GuildCard.vue';
const loginData = useLoginDataStore();

let guilds = ref(loginData!.userGuilds);

onMounted(() => {
	guilds.value = loginData!.userGuilds
		// Sort them Alphabetically
		.sort((a, b) => a.name > b.name ? 1 : 0)
		// Sort them by how you can interact with them:
		// Highest will be guilds you can manage which also have the bot
		// Next are guilds you manage that you can add the bot to
		// Followed by guilds that have the bot, but you can't manage
		// And finally, guilds you can't manage, and you can't add the bot to
		.sort((a, b) => {
			let aPoints = 0;
			if (a.canManageServer && a.botInGuild) aPoints += 3;
			if (a.canManageServer) aPoints += 2;
			if (a.botInGuild) aPoints += 1;
			let bPoints = 0;
			if (b.canManageServer && b.botInGuild) bPoints += 3;
			if (b.canManageServer) bPoints += 2;
			if (b.botInGuild) bPoints += 1;
			return bPoints - aPoints;
		});
});
</script>

<template>
	<VRow class="match-height">
		<GuildCard v-for="guildData in guilds" v-bind="{ guildData }" v-bind:key="guildData.id" />
	</VRow>
</template>
