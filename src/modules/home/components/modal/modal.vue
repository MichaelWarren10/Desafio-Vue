<template>
	<BaseModal :is-open="isOpen" size="lg">
		<template v-slot:header>
			<div class="modal__heading">
				<BaseText size="md" class="modal__heading--title">MOVIMENTAÇÃO</BaseText>
				<BaseIcon class="modal__heading--close" icon="ic_cancel" width="20px" height="20px" @click.native="closeModal"/>
			</div>
		</template>
		<div slot="content" class="modal__content">
			<Heading v-if="transaction" class="modal__content--title" :level="2">{{ transaction.title }}</Heading>
			<ProgressBar class="modal__content--progress-bar" :progress="handleProgress(transaction)" :height="40" progressColor="var(--theme-primary)"/>
			<div class="modal__content--progress-info">
				<span>Solicitada</span>
				<span>Processando</span>
				<span>Concluída</span>
			</div>
			<div class="modal__content-info">
				<p class="modal__content-info--from">Transferido de</p>
				<BaseText size="sm">{{ transaction.from }}</BaseText>
				<p class="modal__content-info--to">Para</p>
				<BaseText size="sm">{{ transaction.to }}</BaseText>
			</div>
		</div>
	</BaseModal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
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
	private closeModal() {/**/}

	private handleProgress(transaction: ITransaction): number {
		const status = {
			'processed': 0.30,
			'processing': 0.50,
			'created': 1
		}

		return status[transaction.status];
	}
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
	right: 25px;
	top: calc(50% - 10px);
	cursor: pointer;
}

.modal__content {
	display: flex;
	justify-content: center;
	flex-direction: column;	
	align-items: center;
	width: 752px;
	margin: 0 auto;
}

.modal__content--title {
	margin-top: 54px;
}

.modal__content--progress-bar {
	margin-top: 74px;
	width: 752px;
	margin: 74px auto 0 auto;
}

.modal__content--progress-info {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 12px;
	font-family: 'Warren Text';
	width: 100%;
}

.modal__content-info {
	font-size: 23px;
	line-height: 32px;
	font-weight: 700;
	margin-top: 30px;
	width: 100%;
}

.modal__content-info--from, .modal__content-info--to {
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	padding-bottom: 12px;
	display: block;
}

</style>
