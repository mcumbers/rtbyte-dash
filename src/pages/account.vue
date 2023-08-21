<script lang="ts" setup>
import { useLoginDataStore } from '@/stores/loginData';
const loginData = useLoginDataStore();
import { useUserSettingsStore } from '@/stores/API Data/userSettings';
const userSettingsStore = useUserSettingsStore();

let userSettingsLocal = ref({ ...userSettingsStore.userSettings })
const isAccountDeactivated = ref(false)

const resetForm = () => {
	userSettingsLocal.value = { ...userSettingsStore.userSettings }
}

async function updateSettings() {
	userSettingsStore.$patch({ userSettings: userSettingsLocal.value });
	await userSettingsStore.update();
	return resetForm();
}

</script>

<template>
	<VRow>
		<VCol cols="12">
			<VCard title="User Settings">
				<VCardText class="d-flex flex-row mb-6">
					<!-- 👉 Avatar -->
					<VAvatar color="background" size="x-large">
						<VImg :src="loginData.avatarURL(loginData.userData!)" />
					</VAvatar>
					<h3 class="ma-2 pa-2 pt-3">
						{{ loginData.userData?.username }}{{ parseInt(loginData.userData?.discriminator ?? '') > 0 ?
							`#${loginData.userData?.discriminator}` : '' }}
					</h3>
				</VCardText>

				<VDivider />

				<VCardText>
					<!-- 👉 Form -->
					<VForm class="mt-6">
						<VRow>
							<!-- 👉 Language -->
							<VCol cols="12" md="6">
								<VSelect v-model="userSettingsLocal!.chatLanguage" label="Language"
									:items="['en-US', 'en-GB']" />
							</VCol>

							<!-- 👉 Measurement Units -->
							<VCol cols="12" md="6">
								<VSelect v-model="userSettingsLocal!.chatMeasurementUnits" label="Measurement Units"
									:items="['imperial', 'metric']" />
							</VCol>

							<!-- 👉 Form Actions -->
							<VCol cols="12" class="d-flex flex-wrap gap-4">
								<VBtn @click.prevent="updateSettings()">
									Save changes
								</VBtn>
								<VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">
									Reset
								</VBtn>
							</VCol>
						</VRow>
					</VForm>
				</VCardText>
			</VCard>
		</VCol>

		<VCol cols="12">
			<!-- 👉 Deactivate Account -->
			<VCard title="Deactivate Account">
				<VCardText>
					<div>
						<VCheckbox v-model="isAccountDeactivated" label="I confirm my account deactivation" />
					</div>

					<VBtn :disabled="!isAccountDeactivated" color="error" class="mt-3">
						Deactivate Account
					</VBtn>
				</VCardText>
			</VCard>
		</VCol>
	</VRow>
</template>
