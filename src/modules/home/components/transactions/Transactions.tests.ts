import { ITransaction } from './../../interfaces/transaction';
import { HomeService } from './../../services/index';
import { render } from "@testing-library/vue";
import { screen } from "@testing-library/dom";
import Transactions from "./Transactions.vue";

const mockTransaction: ITransaction[] = [
  {
    amount: 2078.66,
    date: "2022-03-04",
    description: "et labore proident aute nulla",
    from: "Aposentadoria",
    id: "5f89f9f257fe42957bf6dbfd",
    status: "created",
    title: "Resgate",
  },
];

const renderTransactions = () => render(Transactions);

describe('<Transactions />', () => {

	it('should render Transactions component', () => {
		const { getByTestId } = renderTransactions();
		const transactions = getByTestId("table");

		expect(transactions).toBeInTheDocument();
	});

	it('should render element of table correctly', async () => {
		jest
      .spyOn(HomeService.prototype, "getTransactions")
      .mockResolvedValue(mockTransaction);

		await renderTransactions();
		const td = await screen.findByText(/Aposentadoria/gi);

		expect(td).toBeTruthy();
	});

	it('should throw an error', async() => {
		jest
			.spyOn(HomeService.prototype, "getTransactions")
			.mockRejectedValue(new Error('Error'))
			
		renderTransactions();
		const text = await screen.findByText('Um erro foi identificado');
		
		expect(text).toBeTruthy();
	});
});
