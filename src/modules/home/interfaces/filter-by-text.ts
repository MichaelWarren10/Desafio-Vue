import { ITransaction } from './transaction';

export interface IFilterTextEmiter {
  text: string;
  items: ITransaction[];
}

export interface IFilterTextEmiterComponent {
  text: string;
  items: any[];
}