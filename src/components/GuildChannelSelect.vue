<script lang="ts" setup>
interface Props {
	modelValue: string | string[] | null | undefined,
	multiple?: boolean,
	clearable?: boolean,
	label?: string,
	hint?: string,
	selectCategories?: boolean
};
const props = defineProps<Props>();
defineEmits(['update:modelValue']);

const selectCategories = props.selectCategories ?? false;

import { clientStyleChannelSort } from '@/lib/util/helpers';
import { useGuildChannelsStore } from '@/stores/api/discord/guildChannels';
const guildChannelsStore = useGuildChannelsStore();

const selectChannels = computed(() => {
	let selectChannels: { title: string, value: string, props: Record<string, any> | null }[] = [];
	const guildChannels = ref(guildChannelsStore.guildChannels);
	const sortedChannels = clientStyleChannelSort(guildChannels.value);
	sortedChannels.forEach((guildChannel) => {
		let namePrefix: string = '';
		let props: Record<string, any> | null = null;
		switch (guildChannel.type) {
			case 0: namePrefix = '#'; break;	// Text Channel
			case 2: namePrefix = '🔈'; break;	// Voice Channel
			case 4: namePrefix = '▼'; props = { disabled: !selectCategories }; break;	// Category
			case 5: namePrefix = '📣'; break;	// Announcement Channel
			case 13: namePrefix = '🛜'; break;	// Stage Channel
			case 15: namePrefix = '💬'; break; 	// Forum
		}

		if (guildChannel.parent) namePrefix = '⠀⠀⠀' + namePrefix; // Add a bit of blank space before child channel names

		selectChannels.push({
			title: `${namePrefix}${guildChannel.name}`,
			value: guildChannel.id,
			props
		});
	});
	return selectChannels;
});

onMounted(async () => {
	if (!guildChannelsStore.guildChannels.length) await guildChannelsStore.fetchAll();
});

</script>

<template>
	<VSelect v-bind:model-value="multiple ? (modelValue as string[]) : (modelValue as string)"
		@update:model-value="$emit('update:modelValue', $event)" chips :items="selectChannels" item-props="props"
		:multiple="multiple" :clearable="clearable" :label="label ?? `Channel${multiple ? 's' : ''}`" :hint="hint" />
</template>
