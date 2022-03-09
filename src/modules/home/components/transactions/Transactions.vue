<template>
	<div class="wrapper">
		<div class="wrapper__search">
			<Search class="wrapper__search--size" :items="transactions" @filter-by-title="filterByTitle($event)"/>
			<DropdownFilter :options="options" :items="transactions" @checked="filterByCheckbox($event)"/>
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
import { IDropdown } from '../../interfaces/dropdown-options';

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

	private options: IDropdown[] = [
		{
			text: 'Concluído',
			argument: 'created',
			checked: false
		}, {
			text: 'Processando',
			argument: 'processing',
			checked: false
		}, {
			text: 'Agendado',
			argument: 'processed',
			checked: false
		}
	]
	private selectedOptions: IDropdown[] = [];
	private transactions: ITransaction[] = []; 
	private filteredtransactions: ITransaction[] = [];
	private textFilter = '';

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

	private translateAmount({ amount }: ITransaction): string {
		return convertNumbertoBrazilian(amount);
	}

	private searchFilter(text:string, transactions: ITransaction[]): ITransaction[] {
		if (text.length) {
			const filterTransactions = transactions.filter(el => 
				el.from.toLowerCase()
					.replace(/\s/g, '')
					.includes(text.toLowerCase().replace(/\s/g, '')))
			return filterTransactions;
		}
		return transactions;
	}

	private checkboxFilter($event: {options: IDropdown[], optionsChecked: IDropdown[], items: ITransaction[]}) {
		const {options, optionsChecked, items} = $event;
		this.options = options;
		this.selectedOptions = optionsChecked;

		let itemsFiltered: any[] = [];
		if (optionsChecked.length) {
			options.forEach(option => {
				const filter = items.filter(el => el.status === option.argument && option.checked)
				itemsFiltered.push(...filter);	
			})
			return itemsFiltered;
		}

		return items;
	}

	private filterByTitle($event: {text: string, items: ITransaction[]}): void {
		const {text, items} = $event;
		this.textFilter = text;
		const searchFilter = this.searchFilter(text, items);
		const checkboxFilter = this.checkboxFilter({options: this.options, optionsChecked: this.selectedOptions, items: searchFilter});

		this.filteredtransactions = checkboxFilter;
	}

	private filterByCheckbox($event: {options: IDropdown[], optionsChecked: IDropdown[], items: ITransaction[]}): void {
		const { options, optionsChecked, items } = $event;
		const searchFilter = this.searchFilter(this.textFilter, items);
		const checkboxFilter = this.checkboxFilter({options, optionsChecked, items: searchFilter});

		this.filteredtransactions = checkboxFilter;
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

.wrapper__search--size {
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
