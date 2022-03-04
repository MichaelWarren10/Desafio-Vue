<template>
	<div class="wrapper">
		<DataTable data-testid="table" class="wrapper__table" :columns="columns" :loadData="getData" showDivider/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DataTable, BaseIcon } from '@warrenbrasil/nebraska-web';
import { HomeService } from '../services/index';
import { ITransaction } from '../interfaces/transaction';
import { convertToBrazilianHelper } from '@/helpers/convertNumber';
import IconEye from './IconEye.vue';

@Component({
	components: {
		DataTable,
		BaseIcon,
		IconEye
	}
})
export default class Transactions extends Vue {
	private service = new HomeService()
	private columns = [
		{
			label: '',
			component: IconEye,
			align: 'center',
		},
		{
			label: 'Data',
			getter: this.translateDate,
			sort: 'date'
		}, {
			label: 'Valor',
			getter: this.translateAmount,
			sort: 'amount'
		}, {
			label: 'Descrição',
			getter: 'from'
		}, {
			label: 'Situação',
			getter: this.translateStatus
		}
	]

	private async getData(): Promise<ITransaction[]> {
		try {
			return await this.service.getTransactions();
		} catch {
			throw new Error('Ocurred an error on get data')
		}
	}

	private translateDate({date}:ITransaction): string {
		const dateArray: string[] = date.toString().split('-')
		return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
	}

	private translateAmount({amount}: ITransaction): string {
		return new convertToBrazilianHelper().convert(amount);
	}

	private translateStatus({status}: ITransaction) {
		return ({
			tag: {
				text: this.getStatus(status),
				success: status.toLowerCase() === 'created',
				alert: status.toLowerCase() === 'processing',
				info: status.toLowerCase() === 'processed'
			}
		})
	}

	private getStatus(status:string): string {
		switch(status) {
			case 'created':
				return 'Concluído';
			case 'processed':
				return 'Agendado';
			case 'processing':
				return 'Processando';
			default:
				return '';
		}
	}
}
</script>

<style scoped>
.wrapper {
	display: flex;
	justify-content: center;
	margin-top: 100px;
}

.wrapper__table {
	width: 70%;
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 4px;
}

@media (max-width: 740px) { 
	.wrapper__table {
		width: 100%;
		overflow-x: scroll;
	}
}
</style>
