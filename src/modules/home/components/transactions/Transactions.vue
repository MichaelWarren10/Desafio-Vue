<template>
	<div class="wrapper">
		<Search class="wrapper-search" :transactions="transactions" @filter-by-title="filterTransactions($event)"/>
		<DataTable data-testid="table" class="wrapper__table" :columns="columns" :load-data="() => filteredtransactions" showDivider :data-params="{ filteredtransactions }"/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DataTable, BaseIcon } from '@warrenbrasil/nebraska-web';
import { HomeService } from '../../services/index';
import { ITransaction } from '../../interfaces/transaction';
import IconEye from '../icon-eye/IconEye.vue';
import Search from '../search/Search.vue';
import { translateDate } from '@/helpers/translateDate';
import { translateStatus } from '@/helpers/translateStatus';
import { convertNumbertoBrazilian } from '@/helpers/convertNumber';

@Component({
	components: {
		DataTable,
		BaseIcon,
		IconEye,
		Search
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
			getter: translateDate,
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
			getter: translateStatus
		}
	]

	private transactions: ITransaction[] = []; 
	private filteredtransactions: ITransaction[] = [];

	private created() {
		this.getData();
	}

	private async getData(): Promise<ITransaction[]> {
		try {
			const transactions = await this.service.getTransactions();
			this.transactions = transactions;
			this.filteredtransactions = transactions;
			return transactions
		} catch {
			throw new Error('Ocurred an error on get data')
		}
	}	

	private filterTransactions(transactions: ITransaction[]): ITransaction[] {
		this.filteredtransactions = transactions;
		return transactions;
	}
	
	public translateAmount({ amount }: ITransaction): string {
    return convertNumbertoBrazilian(amount);
	}
}
</script>

<style scoped>
.wrapper {
	display: flex;
	justify-content: center;
	margin-top: 70px;
	flex-direction: column;
	align-items: center;
}

.wrapper__table {
	width: 70%;
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 4px;
	box-sizing: border-box;
	margin-top: 70px;
}

@media (max-width: 740px) { 
	.wrapper__table {
		width: 100%;
		overflow-x: scroll;
	}
}
</style>
