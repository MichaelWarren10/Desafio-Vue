import { ITransaction } from "@/modules/home/interfaces/transaction";
import { convertToBrazilianHelper } from './convertNumber';

export const translateAmount = ({ amount }: ITransaction): string => {
  return new convertToBrazilianHelper().convert(amount);
};
