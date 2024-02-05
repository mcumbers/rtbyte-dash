<script setup lang="ts">
import { VNodeRef } from 'vue';
import { AvailablePlaceholders } from '@/lib/util/constants';
import { ReadablePlaceholderTypes } from '@/lib/util/readableTypes';

interface Props {
	modelValue: string | null,
	label?: string,
	clearable?: boolean,
	hint?: string,
	availablePlaceholders?: AvailablePlaceholders
};

const props = defineProps<Props>();
defineEmits(['update:modelValue']);

const cardVariant = props.availablePlaceholders?.length ? 'outlined' : 'plain';

const localValue = ref(props.modelValue as string);

interface ContextualEventTarget extends EventTarget {
	value: string
}

interface ContextualDragEvent extends DragEvent {
	target: ContextualEventTarget
}

function handleDrag(event: ContextualDragEvent, value: string) {
	if (!event.dataTransfer) return;
	event.dataTransfer.setData("text", value);
	focusInput();
}

function handleDrop(event: ContextualDragEvent) {
	if (!event.dataTransfer) return;
	localValue.value = event.target.value;
}

const messagebox = ref<VNodeRef | null>(null);

function focusInput(cursorPosition?: number) {
	if (!messagebox.value) return;
	const box = messagebox.value as HTMLInputElement;
	box.focus();
	if (cursorPosition) box.setSelectionRange(cursorPosition, cursorPosition);
};

function handleClick(event: MouseEvent | KeyboardEvent, value: string) {
	if (!event || !value) return;
	if (!messagebox.value) return;
	const box = messagebox.value as HTMLInputElement;

	const cursor = box.selectionEnd ?? 0;

	const pre = box.value.substring(0, cursor);
	const post = box.value.substring(cursor, box.value.length);
	const newValue = pre + value + post;

	localValue.value = newValue;

	focusInput(cursor + value.length);
}
</script>

<template>
	<VCard :variant="cardVariant" class="pt-2">
		<VCardSubtitle class="pb-5" v-if="availablePlaceholders?.length">
			Message Variables
		</VCardSubtitle>
		<VRow class="pl-5 pr-5" v-if="availablePlaceholders?.length">
			<!-- Draggable Placeholders -->
			<div v-for="placeholder in availablePlaceholders">
				<VChip class="mb-2 mr-2" :draggable="true"
					@dragstart="handleDrag($event, ReadablePlaceholderTypes[placeholder].value)"
					@click="handleClick($event, ReadablePlaceholderTypes[placeholder].value)">
					{{ ReadablePlaceholderTypes[placeholder].display }}
				</VChip>
			</div>
		</VRow>
		<VRow class="ma-2 pt-5">
			<!-- Text Input -->
			<VTextarea ref="messagebox" v-on:dragover.prevent v-on:drop="handleDrop($event)" v-model="localValue"
				:label="label" :clearable="clearable" :hint="hint"
				@update:model-value="$emit('update:modelValue', $event)" />
		</VRow>
	</VCard>
</template>
