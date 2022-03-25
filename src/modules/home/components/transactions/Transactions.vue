<template>
	<div class="wrapper">
		<div class="wrapper__search">
			<Search data-testid="filter-button" class="wrapper__search--size" :items="transactions" @filter-by-title="filterByTitle($event, options, selectedOptions)"/>
			<DropdownFilter data-testid="dropdown" :options="options" :items="transactions" @checked="filterByCheckbox($event, textFilter)"/>
		</div>
		<DataTable 
			data-testid="table" 
			class="wrapper__table" 
			:columns="columns" 
			:load-data="getData" 
			:data-params="{ filteredtransactions }"
			show-divider />
		<Modal 
			v-if="selectedTransaction"
			:is-open="isModalOpen" 
			:transaction="selectedTransaction" 
			@close-modal="toggleModal"/>
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
import { combinedFilter } from './transactions-helper';
import { IFilterTextEmiter } from '../../interfaces/filter-by-text';
import { IFlterCheckboxEmiter } from '../../interfaces/filter-by-checkbox';
import Modal from '@/modules/home/components/modal/modal.vue'


@Component({
	components: {
		DataTable,
		BaseIcon,
		IconEye,
		Search,
		Grid,
		DropdownFilter,
		Modal
	}
})
export default class Transactions extends Vue {
	private service = new HomeService()
	private isModalOpen = false;
	private selectedTransaction: ITransaction | null = null
	private columns = [
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
		}, {
			type: 'actions',
			getter: this.getActions
		},
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
	private isLoading = true;

	private async getData(): Promise<ITransaction[]> {
		try {
			if (this.isLoading) { 
				const transactions = await this.service.getTransactions();
				this.transactions = transactions;
				this.filteredtransactions = transactions;
				this.isLoading = false;
				return transactions
			}
			return this.filteredtransactions;
		} catch {
			throw new Error('Ocurred an error on get data')
		}
	}

	private translateAmount({ amount }: ITransaction): string {
		return convertNumbertoBrazilian(amount);
	}

	private getActions(row: ITransaction) {
		return {
			options: [
				{
					text: 'Visualizar transação',
					action: () => {
						this.selectedTransaction = row
						this.toggleModal()
					}
				}
			]
		}
	}

	private setOptions(options: IDropdown[], selectedOptions: IDropdown[]): void {
		this.options = options;
		this.selectedOptions = selectedOptions;
	}

	private setTextFilter(text: string): void {
		this.textFilter = text;
	}

	private filterByTitle($event: IFilterTextEmiter, options: IDropdown[], selectedOptions: IDropdown[]): void {
		const { items, text } = $event;
		this.setTextFilter($event.text);
		this.setOptions(options, selectedOptions)

		this.filteredtransactions = combinedFilter(selectedOptions, items, text);
	}

	private filterByCheckbox($event: IFlterCheckboxEmiter, text: string): void {
		const { options, items, selectedOptions } = $event;
		this.setOptions(options, selectedOptions);

		this.filteredtransactions = combinedFilter(selectedOptions, items, text);
	}

	private toggleModal() {
		this.isModalOpen = !this.isModalOpen;
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

::v-deep .table-row > .cell:last-child {
	vertical-align: middle;
}
</style>
