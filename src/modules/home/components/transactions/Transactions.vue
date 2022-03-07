<template>
	<div class="wrapper">
		<DataTable data-testid="table" class="wrapper__table" :columns="columns" :loadData="getData" showDivider/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DataTable, BaseIcon } from '@warrenbrasil/nebraska-web';
import { HomeService } from '../../services/index';
import { ITransaction } from '../../interfaces/transaction';
import IconEye from '../icon-eye/IconEye.vue';
import * as parse from './transactions-parse'

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
			getter: parse.translateDate,
			sort: 'date'
		}, {
			label: 'Valor',
			getter: parse.translateAmount,
			sort: 'amount'
		}, {
			label: 'Descrição',
			getter: 'from'
		}, {
			label: 'Situação',
			getter: parse.translateStatus
		}
	]

	private async getData(): Promise<ITransaction[]> {
		try {
			return await this.service.getTransactions();
		} catch {
			throw new Error('Ocurred an error on get data')
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
