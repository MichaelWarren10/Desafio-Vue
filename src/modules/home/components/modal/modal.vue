<template>
	<BaseModal :is-open="isOpen" size="md" data-testid="modal">
		<section slot="header" class="modal__heading">
			<BaseText size="sm" class="modal__heading--title">MOVIMENTAÇÃO</BaseText>
			<button type="button" @click="closeModal" title="Fechar">
				<BaseIcon class="modal__heading--close" icon="ic_cancel" width="40px" height="40px" />
			</button>
		</section>
		<section slot="content" class="modal__content">
			<Heading class="modal__content--title" :level="2">{{ transaction.title }}</Heading>
			<ProgressBar class="modal__content--progress-bar" :progress="handleProgress(transaction)" :height="40" progressColor="var(--theme-primary)"/>
			<div class="modal__content--progress-info">
				<span>Solicitada</span>
				<span>Processando</span>
				<span>Concluída</span>
			</div>
			<div class="modal__content-info">
				<p class="modal__content-info--from">Transferido de</p>
				<div class="modal__content-info-wrapper-from">
					<BaseText size="sm" class="modal__content-info-wrapper--label">{{ transaction.from }}</BaseText>
					<BaseText size="sm" class="modal__content-info-wrapper--value">{{ translateAmount(transaction.amount) }}</BaseText>
				</div>
				<p class="modal__content-info--to">Para</p>
				<div class="modal__content-info-wrapper-to">
					<BaseText size="sm" class="modal__content-info-wrapper--label">{{ transaction.to }}</BaseText>
					<BaseText size="sm" class="modal__content-info-wrapper--value">{{ translateAmount(transaction.amount) }}</BaseText>
				</div>
			</div>
		</section>
	</BaseModal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { BaseModal, Heading, BaseIcon, BaseText, ProgressBar } from '@warrenbrasil/nebraska-web'
import { PropType } from 'vue';
import { ITransaction } from '../../interfaces/transaction';
import { convertNumbertoBrazilian } from '@/helpers/convertNumber';

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

	private translateAmount(value: number): string {
		if (value) {
			return convertNumbertoBrazilian(value);
		}
		return '';
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
	font-weight: 700;
}

.modal__heading--close {
	position: absolute;
	right: 25px;
	top: calc(50% - 28px);
	cursor: pointer;
}

.modal__content {
	display: flex;
	justify-content: center;
	flex-direction: column;	
	align-items: center;
	max-width: 752px;
	margin: 0 auto;
	padding-bottom: 30px;
}

.modal__content--title {
	margin-top: 54px;
}

.modal__content--progress-bar {
	width: 100%;
	margin: 20px auto 0 auto;
}

::v-deep .wrapper.size-md {
	max-width: 994px;
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

.modal__content-info-wrapper-from {
	margin-bottom: 20px;
}

.modal__content-info-wrapper-from, .modal__content-info-wrapper-to {
	display: flex;
	justify-content: space-between;
}

.modal__content-info-wrapper--label, .modal__content-info-wrapper--value {
	margin-top: 12px;
	display: inline-block;
}

@media (max-width: 768px) {
	.modal__content {
		padding: 0 10px 30px;
	}
}
</style>
