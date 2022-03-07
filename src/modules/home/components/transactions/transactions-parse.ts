import { convertToBrazilianHelper } from './../../../../helpers/convertNumber';
import { ITransaction, IStatus } from './../../interfaces/transaction';

export const getStatus = (statusType: IStatus) => {
  const status = {
    created: "Concluído",
    processed: "Agendado",
    processing: "Processando",
    default: "",
  };

  return status[statusType] || status["default"];
};

export const translateAmount = ({amount}: ITransaction): string => {
	return new convertToBrazilianHelper().convert(amount);
}

export const translateStatus = ({status}: ITransaction) => {
	return ({
		tag: {
			text: getStatus(status),
			success: status.toLowerCase() === 'created',
			alert: status.toLowerCase() === 'processing',
			info: status.toLowerCase() === 'processed'
		}
	})
}

