import { render } from "@testing-library/vue";
import { screen } from "@testing-library/dom";
import Transactions from "./Transactions.vue";

const mockTransaction = jest.fn().mockResolvedValue([
  {
    amount: 2078.66,
    date: new Date(),
    description: "et labore proident aute nulla",
    from: "Aposentadoria",
    id: "5f89f9f257fe42957bf6dbfd",
    status: "created",
    title: "Resgate",
  },
]);

jest.mock("../services/index", () => {
  return {
    HomeService: jest.fn().mockImplementation(() => {
      return {
        getTransactions() {
          return new Promise((resolve) => resolve(mockTransaction));
        },
      };
    }),
  };
});

const renderTransactions = () => render(Transactions);

xdescribe('<Transactions />', () => {

	it('should render Transactions component', () => {
		const { getByTestId } = renderTransactions();
		const transactions = getByTestId("table");

		expect(transactions).toBeInTheDocument();
	});

	it('should render element of table correctly', async () => {
		await renderTransactions();
		const td = await screen.findByText(/Aposentadoria/gi);

		expect(td).toBeTruthy();
	});
});
