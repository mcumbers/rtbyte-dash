import { defineStore } from 'pinia';
import { UserSettings } from '@prisma/client';
import { useLoginDataStore } from '@/stores/api/oauth/loginData';
import { useAppState } from '@/stores/appState';

export const useUserSettingsStore = defineStore('userSettings', {
	state: () => ({
		userSettings: null as UserSettings | null
	}),
	getters: {},
	actions: {
		async fetch() {
			let userID = this.userSettings?.id;
			if (!userID) userID = useLoginDataStore().userData?.id;
			const response = await useAppState().botAPI!.get(`/users/${userID}/settings`);
			this.$patch({ userSettings: response.data.data.userSettings as UserSettings });
			return this;
		},
		async update() {
			const response = await useAppState().botAPI!.post(`/users/${this.userSettings?.id}/settings`, { data: { userSettings: this.userSettings } });
			this.$patch({ userSettings: response.data.data.userSettings as UserSettings });
			return this;
		}
	},
	persist: true
});