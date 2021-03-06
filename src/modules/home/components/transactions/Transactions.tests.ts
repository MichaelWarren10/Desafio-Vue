import { HomeService } from './../../services/index';
import { render } from '@testing-library/vue';
import { mockTransaction } from '../../mocks/mock-transactions';
import Transactions from './Transactions.vue';

const renderTransactions = () => render(Transactions);
jest.spyOn(HomeService.prototype, 'getTransactions').mockResolvedValue(mockTransaction);

describe('<Transactions />', () => {
  it('should render Transactions component', () => {
    const { getByTestId } = renderTransactions();
    const transactions = getByTestId('table');

    expect(transactions).toBeInTheDocument();
  });

  it('should render 3 elements with Aposentadoria text on the table', async () => {
    jest.spyOn(HomeService.prototype, 'getTransactions').mockResolvedValue(mockTransaction);
    const { findAllByText } = await renderTransactions();
    const transactions = await findAllByText(/Aposentadoria/gi);

    expect(transactions).toHaveLength(3);
  });

  it('should throw an error', async () => {
    jest.spyOn(HomeService.prototype, 'getTransactions').mockRejectedValueOnce(new Error('Error'));

    const { findByText } = renderTransactions();
    const text = await findByText('Um erro foi identificado');

    expect(text).toBeTruthy();
  });

  it('should show date in format 04/03/2022', async () => {
    const { findByText } = renderTransactions();
    const td = await findByText('04/03/2022');

    expect(td).toBeTruthy();
  });

  it('should show amount in format R$ 2078,66', async () => {
    const { findByText } = await renderTransactions();
    const td = await findByText('R$ 2.078,66');

    expect(td).toBeTruthy();
  });

  it('should show status as Concluído', async () => {
    const { findAllByText } = renderTransactions();
    const td = await findAllByText('Concluído');

    expect(td).toHaveLength(4);
  });
});
