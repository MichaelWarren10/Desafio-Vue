import { IDropdown } from './../interfaces/dropdown-options';

export const options: IDropdown[] = [
  {
    text: 'Concluído',
    argument: 'created',
    checked: false
  },
  {
    text: 'Processando',
    argument: 'processing',
    checked: false
  },
  {
    text: 'Agendado',
    argument: 'processed',
    checked: false
  }
];
