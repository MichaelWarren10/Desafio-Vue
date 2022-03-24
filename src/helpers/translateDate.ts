import { ITransaction } from '@/modules/home/interfaces/transaction';

export const translateDate = ({ date }: ITransaction): string => {
  const dateArray: string[] = date.toString().split('-');
  return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
};
