<template>
	<BaseModal :isOpen="isOpen">
		<template v-slot:header>Header</template>
		<template v-slot:content>
				<div style="display: flex; align-items: center; justify-content: center; max-width: 100%; width: 400px; height: 200px;">Content</div>
		</template>
		<template v-slot:footer>Footer</template>
	</BaseModal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BaseModal } from '@warrenbrasil/nebraska-web'

@Component({
	components: {
		BaseModal
	}
})
export default class Modal extends Vue {
	@Prop({type: Boolean, required: true})
	private isOpen!: boolean;
}
</script>

<style lang="less" scoped>
</style>
