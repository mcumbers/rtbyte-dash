<script setup lang="ts">
import { GuildData } from '@/lib/util/types';
interface Props {
	guildData: GuildData
}
const props = defineProps<Props>()
</script>

<template>
	<VCol cols="12" md="3">
		<VCard>
			<VCardText class="position-relative text-center">
				<!-- Guild Image -->
				<VAvatar size="75" class="avatar-center"
					:image="`https://cdn.discordapp.com/icons/${props.guildData.id}/${props.guildData.icon}.png`" />

				<!-- Guild Name, Subtitle & Action Button -->
				<div class="d-flex text-center flex-wrap pt-5">
					<div class="me-2 mb-2">
						<VCardTitle class="text-wrap">{{ props.guildData.name }}</VCardTitle>
					</div>
				</div>
			</VCardText>
			<div class="pb-5">
				<VBtn v-if="props.guildData.botInGuild" :disabled="!props.guildData.canManageServer"
					style="left: 50%; transform: translateX(-50%)">Manage Server</VBtn>
				<VBtn variant="tonal" v-if="!props.guildData.botInGuild" :disabled="!props.guildData.canManageServer"
					style="left: 50%; transform: translateX(-50%)">Add To Server</VBtn>
			</div>
		</VCard>
	</VCol>
</template>

<style lang="scss" scoped></style>
