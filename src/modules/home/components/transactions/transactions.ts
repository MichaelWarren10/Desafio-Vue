import { ITransaction } from './../../interfaces/transaction';

export const searchFilter = (text:string, transactions: ITransaction[]): ITransaction[] => {
	if (text.length) {
		const filterTransactions = transactions.filter(el => 
			el.from.toLowerCase()
				.replace(/\s/g, '')
				.includes(text.toLowerCase().replace(/\s/g, '')))
		return filterTransactions;
	}
	return transactions;
}