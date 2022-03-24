import { ITransaction } from './transaction';
import { IDropdown } from './dropdown-options';

export interface IFlterCheckboxEmiter {
  options: IDropdown[];
  selectedOptions: IDropdown[];
  items: ITransaction[];
}

export interface IFilterCheckboxEmiterComponent {
  options: IDropdown[];
  selectedOptions: IDropdown[];
  items: any[];
}
