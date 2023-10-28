<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAppState } from '@/stores/appState';
const appState = useAppState();

// Return user to guild selection if no guild selected
if (!appState.selectedGuild) router.push({ name: 'guilds' });
import { iconURL } from '@/lib/util/helpers';
import { useGuildStore } from '@/stores/api/discord/guild';
const guildStore = useGuildStore();
import { useGuildChannelsStore } from '@/stores/api/discord/guildChannels';
const guildChannelsStore = useGuildChannelsStore();
import GuildChannelSelect from '@/components/GuildChannelSelect.vue';
import { useGuildMembersStore } from '@/stores/api/discord/guildMembers';
const guildMembersStore = useGuildMembersStore();
import { useRolesStore } from '@/stores/api/discord/roles';
const rolesStore = useRolesStore();

let selectedDatatype = ref('guild');
let selectedDatumID = '';

const dataTypeOptions: { value: string, display: string }[] = [
	{ value: 'guild', display: 'Guild' },
	{ value: 'guildChannels', display: 'GuildChannels' },
	{ value: 'guildMembers', display: 'GuildMembers' },
	{ value: 'roles', display: 'Roles' }
];

const topLevelData = computed(() => {
	switch (selectedDatatype.value) {
		case 'guildChannels': return guildChannelsStore.guildChannels;
		case 'guildMembers': return guildMembersStore.guildMembers;
		case 'roles': return rolesStore.roles;
		case 'guild': return guildStore.guild ? [guildStore.guild] : [];
		default: return [];
	}
});

const selectedDatum = computed(() => {
	const dataContainer = topLevelData.value as any as any[];
	return dataContainer.find((item: any) => item.id === selectedDatumID) || {};
})

onMounted(async () => {
	if (!guildStore.guild) await guildStore.fetch();
	if (!guildChannelsStore.guildChannels.length) await guildChannelsStore.fetchAll();
	if (!guildMembersStore.guildMembers.length) await guildMembersStore.fetch();
	if (!rolesStore.roles.length) await rolesStore.fetch();
});

const displayNestedType = computed(() =>
	(selectedDatatype.value === 'guildChannels' && selectedDatumID && selectedDatumID.length) ||
	(selectedDatatype.value === 'guildMembers' && selectedDatumID && selectedDatumID.length) ||
	(selectedDatatype.value === 'roles' && selectedDatumID && selectedDatumID.length) || false
);

// Return user to guild selection if guild selection cleared on this page
appState.$subscribe(() => {
	if (!appState.selectedGuild) router.push({ name: 'guilds' });
});
</script>

<template>
	<VRow v-if="appState.selectedGuild">
		<VCol cols="12">
			<VCard title="Guild Data Viewer">
				<VCardText class="d-flex flex-row mb-6">
					<!-- 👉 Avatar -->
					<VAvatar color="background" size="x-large">
						<VImg :src="iconURL(appState.selectedGuild!)" />
					</VAvatar>
					<h3 class="ma-2 pa-2 pt-3">
						{{ appState.selectedGuild.name }}
					</h3>
				</VCardText>

				<VDivider />

				<VCardText>
					<VRow>
						<!-- Data Type -->
						<VCol cols="12" md="6">
							<VSelect v-model="selectedDatatype" label="Data Type" :items="dataTypeOptions"
								item-title="display" item-value="value" />
						</VCol>
						<!-- Channel Selector -->
						<VCol cols="12" md="6" v-if="selectedDatatype === 'guildChannels'">
							<GuildChannelSelect label="Channel Viewer" v-model="selectedDatumID" clearable
								select-categories />
						</VCol>
						<VDivider />
						<!-- Root Object Table -->
						<v-table v-if="!displayNestedType">
							<thead>
								<tr>
									<th v-for="key in Object.keys(topLevelData[0] || {})">
										{{ key }}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in topLevelData">
									<td v-for="value in item">
										<div class="d-flex align-top w-100 h-100 mt-5 mb-5">
											{{ value !== null ? value : 'NULL' }}
										</div>
									</td>
								</tr>
							</tbody>
						</v-table>
						<!-- Nested Object Table -->
						<v-table v-if="displayNestedType">
							<thead>
								<tr>
									<th class="text-left" v-for="key in Object.keys(selectedDatum || {})">
										{{ key }}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="text-left" v-for="value in selectedDatum">
										<div class="d-flex align-top w-100 h-100 mt-5 mb-5">
											{{ value !== null ? value : 'NULL' }}
										</div>
									</td>
								</tr>
							</tbody>
						</v-table>
					</VRow>
				</VCardText>
			</VCard>
		</VCol>
	</VRow>
</template>
