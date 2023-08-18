<script lang="ts" setup>
import { UserData, GuildData, DiscordData } from '@/lib/util/types'
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue';

const storedData = JSON.parse(localStorage.getItem('discord-data') || '');

const userData: UserData = storedData?.user;
const userGuilds: GuildData[] = storedData?.guilds;
const discordData: DiscordData = { userData, userGuilds };
</script>

<template>
  <DefaultLayoutWithVerticalNav v-bind="{ discordData }">
    <RouterView />
  </DefaultLayoutWithVerticalNav>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
