<script setup lang="ts">
import { VNodeRef } from 'vue';
import { AvailablePlaceholders } from '@/lib/util/constants';

interface Props {
	modelValue: string,
	availablePlaceholders: AvailablePlaceholders
};

const props = defineProps<Props>();
defineEmits(['update:modelValue']);

const showBotName = props.availablePlaceholders.includes('BOT_NAME');
const showBotMention = props.availablePlaceholders.includes('BOT_MENTION');
const showGuildName = props.availablePlaceholders.includes('GUILD_NAME');
const showGuildSize = props.availablePlaceholders.includes('GUILD_SIZE');
const showMemberName = props.availablePlaceholders.includes('MEMBER_NAME');
const showMemberMention = props.availablePlaceholders.includes('MEMBER_MENTION');
const showUserUsername = props.availablePlaceholders.includes('USER_USERNAME');
const showUserMention = props.availablePlaceholders.includes('USER_MENTION');
const showChannelName = props.availablePlaceholders.includes('CHANNEL_NAME');
const showChannelMention = props.availablePlaceholders.includes('CHANNEL_MENTION');
const showXPTotal = props.availablePlaceholders.includes('XP_TOTAL');
const showXPLevelXP = props.availablePlaceholders.includes('XP_LEVEL_XP');
const showXPLevel = props.availablePlaceholders.includes('XP_LEVEL');
const showMessage = props.availablePlaceholders.includes('MESSAGE');

const cardVariant = props.availablePlaceholders.length ? 'outlined' : 'plain';

const localValue = ref(props.modelValue);

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

function focusInput() {
	if (!messagebox.value) return;
	messagebox.value.focus();
};

function handleClick(event: MouseEvent | KeyboardEvent, value: string) {
	if (!value) return;
	const box = document.getElementById('messagebox') as HTMLInputElement;
	if (!box) return;

	const cursor = box.selectionEnd ?? 0;

	const pre = box.value.substring(0, cursor);
	const post = box.value.substring(cursor, box.value.length);
	const newValue = pre + value + post;

	localValue.value = newValue;

	box.selectionEnd = cursor + value.length;
}

</script>

<template>
	<VCard :variant="cardVariant" class="pt-2">
		<VCardSubtitle class="pb-5" v-if="availablePlaceholders.length">
			Message Variables
		</VCardSubtitle>
		<VRow class="pl-5 pr-5">
			<!-- Draggable Placeholders -->
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%BOT_NAME%')"
				@click="handleClick($event, '%BOT_NAME%')" v-if="showBotName">
				Bot Name
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%BOT_MENTION%')"
				@click="handleClick($event, '%BOT_MENTION%')" v-if="showBotMention">
				Bot Mention
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%GUILD_NAME%')"
				@click="handleClick($event, '%GUILD_NAME%')" v-if="showGuildName">
				Server Name
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%GUILD_SIZE%')"
				@click="handleClick($event, '%GUILD_SIZE%')" v-if="showGuildSize">
				Server Size
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%MEMBER_NAME%')"
				@click="handleClick($event, '%MEMBER_NAME%')" v-if="showMemberName">
				Member Name
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%MEMBER_MENTION%')"
				@click="handleClick($event, '%MEMBER_MENTION%')" v-if="showMemberMention">
				Member Mention
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%USER_USERNAME%')"
				@click="handleClick($event, '%USER_USERNAME%')" v-if="showUserUsername">
				User Name
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%USER_MENTION%')"
				@click="handleClick($event, '%USER_MENTION%')" v-if="showUserMention">
				User Mention
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%CHANNEL_NAME%')"
				@click="handleClick($event, '%CHANNEL_NAME%')" v-if="showChannelName">
				Channel Name
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%CHANNEL_MENTION%')"
				@click="handleClick($event, '%CHANNEL_MENTION%')" v-if="showChannelMention">
				Channel Mention
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%XP_TOTAL%')"
				@click="handleClick($event, '%XP_TOTAL%')" v-if="showXPTotal">
				Member Total XP
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%XP_LEVEL_XP%')"
				@click="handleClick($event, '%XP_LEVEL_XP%')" v-if="showXPLevelXP">
				Member Level XP
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%XP_LEVEL%')"
				@click="handleClick($event, '%XP_LEVEL%')" v-if="showXPLevel">
				Member Level
			</VChip>
			<VChip class="mb-2 mr-2" :draggable="true" @dragstart="handleDrag($event, '%MESSAGE%')"
				@click="handleClick($event, '%MESSAGE%')" v-if="showMessage">
				Message Text
			</VChip>
		</VRow>
		<VRow class="ma-2 pt-5">
			<!-- Text Input -->
			<VTextarea ref="messagebox" id="messagebox" v-on:dragover.prevent v-on:drop="handleDrop($event)"
				v-model="localValue" />
		</VRow>
	</VCard>
</template>
