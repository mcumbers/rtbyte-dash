<script lang="ts" setup>
interface Props {
	modelValue: string | string[] | null | undefined,
	multiple?: boolean,
	clearable?: boolean,
	label?: string,
	hint?: string,
	selectEveryone?: boolean
};
const props = defineProps<Props>();
defineEmits(['update:modelValue']);

const selectEveryone = props.selectEveryone ?? false;

import { useRolesStore } from '@/stores/api/discord/roles';
const rolesStore = useRolesStore();

const selectRoles = computed(() => {
	let selectRoles: { title: string, value: string, props: Record<string, any> | null }[] = [];
	const roles = ref(rolesStore.roles);
	const sortedRoles = roles.value.sort((a, b) => b.rawPosition - a.rawPosition)
	sortedRoles.forEach((role) => {
		let props: Record<string, any> | null = null;

		if (role.rawPosition === 0 && !selectEveryone) return;

		selectRoles.push({
			title: role.name,
			value: role.id,
			props
		});
	});
	return selectRoles;
});

onMounted(async () => {
	if (!rolesStore.roles.length) await rolesStore.fetchAll();
});

</script>

<template>
	<VSelect v-bind:model-value="multiple ? (modelValue as string[]) : (modelValue as string)"
		@update:model-value="$emit('update:modelValue', $event)" chips :items="selectRoles" item-props="props"
		:multiple="multiple" :clearable="clearable" :label="label ?? `Role${multiple ? 's' : ''}`" :hint="hint" />
</template>
