<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { useLoginDataStore } from '@/stores/api/oauth/loginData';
const loginData = useLoginDataStore();
import { useBotGlobalSettingsStore } from '@/stores/api/bot/botGlobalSettings';
const botGlobalSettingsStore = useBotGlobalSettingsStore();

// Return user to guild selection if not a bot owner
if (!loginData.userData?.isBotOwner) router.push({ name: 'guilds' });

let botGlobalSettingsLocal = ref({ ...botGlobalSettingsStore.botGlobalSettings });

const resetForm = () => {
	botGlobalSettingsLocal.value = { ...botGlobalSettingsStore.botGlobalSettings };
};

async function updateSettings() {
	botGlobalSettingsStore.$patch({ botGlobalSettings: botGlobalSettingsLocal.value });
	await botGlobalSettingsStore.update();
	return resetForm();
};

onMounted(async () => {
	if (!botGlobalSettingsStore.botGlobalSettings) await botGlobalSettingsStore.fetch();
	resetForm();
});

</script>

<template>
	<VRow v-if="loginData.userData?.isBotOwner">
		<VCol cols="12">
			<VCard title="Bot Settings">
				<VCardText class="d-flex flex-row mb-6">
					<!-- 👉 Avatar -->
					<VAvatar color="background" size="x-large">
						<VImg :src="(loginData.botData?.avatarURL as string)" />
					</VAvatar>
					<h3 class="ma-2 pa-2 pt-3">
						{{ loginData.botData?.username }}
					</h3>
				</VCardText>

				<VDivider />

				<VCardText>
					<!-- Form -->
					<VForm class="mt-6">
						<VRow>
							<VDivider class="ma-6 mb-8" />

							<!-- Form Actions -->
							<VCol cols="12" class="d-flex flex-wrap gap-4">
								<VBtn @click.prevent="updateSettings()">
									Save changes
								</VBtn>
								<VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm()">
									Reset
								</VBtn>
							</VCol>
						</VRow>
					</VForm>
				</VCardText>
			</VCard>
		</VCol>
	</VRow>
	<VRow>
		<VCardTitle>
			PLACEHOLDER
		</VCardTitle>
		<VCard v-for="value, setting in botGlobalSettingsLocal">
			<VCardTitle>
				{{ setting }}
			</VCardTitle>
			<VCardText>
				{{ value }}
			</VCardText>
		</VCard>
	</VRow>
</template>
