import { IDropdown } from '../../interfaces/dropdown-options';
import { ITransaction } from '../../interfaces/transaction';

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

export const checkboxFilter = (selectedOptions: IDropdown[], items: ITransaction[]) => {
	const itemsFiltered: any[] = [];
	if (selectedOptions.length) {
		selectedOptions.forEach((option) => {
      const filter = items.filter(
        (el) => el.status === option.argument && option.checked
      );
      itemsFiltered.push(...filter);
    });
		return itemsFiltered;
	}

	return items;
}

export const combinedFilter = (selectedOptions: IDropdown[], items: ITransaction[], text: string): ITransaction[] => {
  const searchByText = searchFilter(text, items);
  const searchByCheckbox = checkboxFilter(selectedOptions, searchByText);

  return searchByCheckbox;
};