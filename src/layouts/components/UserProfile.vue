<script setup lang="ts">
import { useLoginDataStore, UserData } from '@/stores/loginData';
const loginData = useLoginDataStore();
import { isBotOwner } from '@/lib/util/helpers';
interface Props {
	userData: UserData
}
const props = defineProps<Props>()
</script>

<template>
	<VAvatar class="cursor-pointer" color="primary">
		<VImg :src="loginData.avatarURL(props.userData)" />

		<!-- SECTION Menu -->
		<VMenu activator="parent" width="230" location="bottom end" offset="14px">
			<VList>
				<!-- 👉 User Avatar & Name -->
				<VListItem>
					<template #prepend>
						<VListItemAction start>
							<VAvatar color="background">
								<VImg :src="loginData.avatarURL(props.userData)" />
							</VAvatar>
						</VListItemAction>
					</template>

					<VListItemTitle class="font-weight-semibold">{{ props.userData.username }}</VListItemTitle>
					<VListItemSubtitle v-if="isBotOwner(props.userData)">Developer</VListItemSubtitle>
				</VListItem>
				<VDivider class="my-2" />

				<!-- 👉 Settings -->
				<VListItem link to="account">
					<template #prepend>
						<VIcon class="me-2" icon="mdi-cog-outline" size="22" />
					</template>

					<VListItemTitle>Account Settings</VListItemTitle>
				</VListItem>

				<!-- 👉 FAQ -->
				<VListItem link>
					<template #prepend>
						<VIcon class="me-2" icon="mdi-help-circle-outline" size="22" />
					</template>

					<VListItemTitle>FAQ</VListItemTitle>
				</VListItem>

				<!-- Divider -->
				<VDivider class="my-2" />

				<!-- 👉 Logout -->
				<VListItem to="/logout">
					<template #prepend>
						<VIcon class="me-2" icon="mdi-logout" size="22" />
					</template>

					<VListItemTitle>Sign Out</VListItemTitle>
				</VListItem>
			</VList>
		</VMenu>
		<!-- !SECTION -->
	</VAvatar>
</template>
