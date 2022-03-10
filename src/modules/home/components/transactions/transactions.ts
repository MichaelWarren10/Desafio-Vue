import { IDropdown } from './../../interfaces/dropdown-options';
import { IFilterTextEmiter } from './../../interfaces/filter-by-text';
import { IFlterCheckboxEmiter } from './../../interfaces/filter-by-checkbox';
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

export const checkboxFilter = ($event: IFlterCheckboxEmiter) => {
	const {options, selectedOptions, items} = $event;

	let itemsFiltered: any[] = [];
	if (selectedOptions.length) {
		options.forEach(option => {
			const filter = items.filter(el => el.status === option.argument && option.checked)
			itemsFiltered.push(...filter);	
		})
		return itemsFiltered;
	}

	return items;
}

export const filterByTitle = (
  $event: IFilterTextEmiter,
  options: IDropdown[],
  selectedOptions: IDropdown[]
): ITransaction[] => {
  const { text, items } = $event;
  const searchByText = searchFilter(text, items);
  const searchByCheckbox = checkboxFilter({
    options,
    selectedOptions,
    items: searchByText,
  });

  return searchByCheckbox;
};

export const filterByCheckbox = ($event: IFlterCheckboxEmiter, text: string): ITransaction[] => {
  const { options, selectedOptions, items } = $event;
  const searchByText = searchFilter(text, items);
  const searchByCheckbox = checkboxFilter({
    options,
    selectedOptions,
    items: searchByText,
  });

  return searchByCheckbox;
};