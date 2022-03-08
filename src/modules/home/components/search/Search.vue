<template>
	<InputText class="wrapper__input" placeholder="Busque pelo título" leadingIcon="ic_search" @input="filterByTitle($event, transactions)"/>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { InputText, BaseIcon } from '@warrenbrasil/nebraska-web';
import { ITransaction } from '../../interfaces/transaction';

@Component({
	components: {
		InputText,
		BaseIcon
	}
})
export default class Search extends Vue {
	@Prop() 
	private transactions!: ITransaction[];

	@Emit('filter-by-title')
	private filterByTitle(text: string, transactions: ITransaction[]): ITransaction[] {
		const filterTransactions = transactions.filter(el => 
			el.from.toLowerCase()
				.replace(/\s/g, '')
				.includes(text.toLowerCase().replace(/\s/g, '')))
		return filterTransactions;
	}
}
</script>

<style scoped>
.wrapper {
	display: flex;
	justify-content: center;
}

.wrapper__input {
	width: 70%;
}

@media (max-width: 740px) { 
	.wrapper__input {
		width: 100%;
	}
}
</style>
