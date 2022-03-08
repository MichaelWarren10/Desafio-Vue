<template>
	<div class="wrapper">
		<div class="wrapper__search">
			<Search class="wrapper__search--block" :transactions="transactions" @filter-by-title="filterTransactions($event)"/>
			<DropdownFilter :options="options"/>
		</div>
		<DataTable 
			data-testid="table" 
			class="wrapper__table" 
			:columns="columns" 
			:load-data="() => filteredtransactions" 
			:data-params="{ filteredtransactions }"
			showDivider />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DataTable, BaseIcon, Grid } from '@warrenbrasil/nebraska-web';
import { HomeService } from '../../services/index';
import { ITransaction } from '../../interfaces/transaction';
import IconEye from '../icon-eye/IconEye.vue';
import Search from '../search/Search.vue';
import DropdownFilter from '../dropdown-filter/dropdown-filter.vue';
import { translateDate } from '@/helpers/translateDate';
import { translateStatus } from '@/helpers/translateStatus';
import { convertNumbertoBrazilian } from '@/helpers/convertNumber';

@Component({
	components: {
		DataTable,
		BaseIcon,
		IconEye,
		Search,
		Grid,
		DropdownFilter
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

	private options = [
		{
			text: 'Concluído',
			checked: false
		}, {
			text: 'Processando',
			checked: false
		}, {
			text: 'Processado',
			checked: false
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
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.wrapper__search {
	display: flex;
	flex-direction: row;
	margin-top: 70px;
	width: 70%;
	justify-content: space-between;
}

.wrapper__search--block {
	width: 100%;
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
	.wrapper__search {
		flex-direction: column;
	}

	.wrapper__table, .wrapper__search{
		width: 100%;
	}
	.wrapper__table {
		overflow-x: scroll;
	}
}
</style>
