<script lang="ts" setup>
import { useLoginDataStore } from '@/stores/loginData';
const loginData = useLoginDataStore();
import { useUserSettingsStore } from '@/stores/API Data/userSettings';
const userSettingsStore = useUserSettingsStore();

import { ReadableLanguageTags, ReadableMeasurementSystems } from '@/lib/util/readableTypes'
import { avatarURL } from '@/lib/util/helpers';

let userSettingsLocal = ref({ ...userSettingsStore.userSettings });
let deactivateConfirm = ref(false);

const resetForm = () => {
	userSettingsLocal.value = { ...userSettingsStore.userSettings };
}

async function deactivateBotInteractions() {
	userSettingsLocal.value.disableBot = true;
	await updateSettings();
	deactivateConfirm.value = false;
}

async function activateBotInteractions() {
	userSettingsLocal.value.disableBot = false;
	await updateSettings();
	deactivateConfirm.value = false;
}

async function updateSettings() {
	userSettingsStore.$patch({ userSettings: userSettingsLocal.value });
	await userSettingsStore.update();
	return resetForm();
}

onMounted(async () => {
	if (!userSettingsStore.userSettings) await userSettingsStore.fetch(loginData.userData!.id);
	userSettingsLocal = ref({ ...userSettingsStore.userSettings });
	resetForm();
});
</script>

<template>
	<VRow>
		<VCol cols="12">
			<VCard title="User Settings">
				<VCardText class="d-flex flex-row mb-6">
					<!-- 👉 Avatar -->
					<VAvatar color="background" size="x-large">
						<VImg :src="avatarURL(loginData.userData!)" />
					</VAvatar>
					<h3 class="ma-2 pa-2 pt-3">
						{{ loginData.userData?.username }}{{ parseInt(loginData.userData?.discriminator ?? '') > 0 ?
							`#${loginData.userData?.discriminator}` : '' }}
					</h3>
				</VCardText>

				<VDivider />

				<VCardText v-if="!userSettingsStore.userSettings?.disableBot">
					<!-- Form -->
					<VForm class="mt-6">
						<VRow>
							<!-- Language -->
							<VCol cols="12" md="6">
								<VSelect v-model="userSettingsLocal.chatLanguage" label="Language"
									:items="ReadableLanguageTags" item-title="display" item-value="value" clearable />
							</VCol>

							<!-- Measurement Units -->
							<VCol cols="12" md="6">
								<VSelect v-model="userSettingsLocal.chatMeasurementUnits" label="Measurement Units"
									:items="ReadableMeasurementSystems" item-title="display" item-value="value" clearable />
							</VCol>

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
				<VCardText v-if="userSettingsStore.userSettings?.disableBot">
					<h1 class="ma-2 pa-2">
						Bot Deactivated
					</h1>
					<p class="ma-2 pa-2">
						You have opted out of using RTByte. You cannot use RTByte Commands or Features unless you Activate
						them again.
					</p>
					<VBtn color="primary" class="mt-3 ml-4" @click.prevent="activateBotInteractions()">
						Activate Bot Interactions
					</VBtn>
				</VCardText>
			</VCard>
		</VCol>

		<VCol cols="12" v-if="!userSettingsStore.userSettings?.disableBot">
			<!-- Opt Out -->
			<VCard title="Opt Out">
				<VCardText>
					<p class="ma-2 pa-2">
						If you do not want RTByte to store any of your personal information, you can Opt Out of using it.
						Doing so will prevent you from using any commands or features of the bot.
					</p>
					<p class="ma-2 pa-2">
						Note: This will not remove any records of moderator actions against you. That information remains
						controlled by the Administrators of the servers in which the moderator actions took place.
					</p>
					<div>
						<VCheckbox v-model="deactivateConfirm" class="ml-4"
							label="I want to Opt Out of RTByte storing my personal data" />
					</div>

					<VBtn :disabled="!deactivateConfirm" color="error" class="mt-3 ml-4"
						@click.prevent="deactivateBotInteractions()">
						Deactivate Bot Interactions
					</VBtn>
				</VCardText>
			</VCard>
		</VCol>
	</VRow>
</template>
