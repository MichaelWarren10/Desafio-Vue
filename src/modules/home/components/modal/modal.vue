<template>
	<BaseModal :is-open="isOpen" size="md">
		<template v-slot:header>
			<div class="modal__heading">
				<BaseText size="xl" class="modal__heading--title">MOVIMENTAÇÃO</BaseText>
				<BaseIcon class="modal__heading--close" icon="ic_cancel" width="20px" height="20px" @click.native="closeModal"/>
			</div>
		</template>
		<template v-slot:content>
			<div class="modal__content">
				<Heading v-if="transaction" class="modal__content--title" :level="2">{{ transaction.title }}</Heading>
			</div>
			<ProgressBar class="modal__progress-bar" :progress="0.76" :height="40" :radius="false" progressColor="var(--theme-primary)"/>
		</template>
	</BaseModal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { BaseModal, Heading, BaseIcon, BaseText, ProgressBar } from '@warrenbrasil/nebraska-web'
import { PropType } from 'vue';
import { ITransaction } from '../../interfaces/transaction';

@Component({
	components: {
		BaseModal,
		Heading,
		BaseIcon,
		BaseText,
		ProgressBar
	}
})
export default class Modal extends Vue {
	@Prop({type: Boolean, required: true})
	private isOpen!: boolean;

	@Prop({type: Object as PropType<ITransaction>, required: true})
	private  transaction!: ITransaction;

	@Emit('close-modal')
	private closeModal() { }
}
</script>

<style scoped>
.modal__heading {
	position: relative;
}

.modal__heading--title {
	display: flex;
	justify-content: center;
	padding: 23px 0;
	border-bottom: 1px solid var(--divider-primary);
}

.modal__heading--close {
	position: absolute;
	right: 10px;
	top: calc(50% - 10px);
	cursor: pointer;
}

.modal__content {
	display: flex;
	justify-content: center;
}

.modal__content--title {
	margin-top: 54px;
}

.modal__progress-bar {
	margin-top: 74px;
}


</style>
