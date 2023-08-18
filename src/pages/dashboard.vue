<script setup lang="ts">
import GuildCard from '@/components/GuildCard.vue';

import { UserData, GuildData, DiscordData } from '@/lib/util/types'

const storedData = JSON.parse(localStorage.getItem('discord-data') || '');

const userData: UserData = storedData?.user;
const userGuilds: GuildData[] = storedData?.guilds;
const discordData: DiscordData = { userData, userGuilds };
</script>

<template>
  <VRow class="match-height">
      <GuildCard v-for="guildData in discordData.userGuilds" v-bind="{ guildData }" v-bind:key="guildData.id" />
  </VRow>
</template>
