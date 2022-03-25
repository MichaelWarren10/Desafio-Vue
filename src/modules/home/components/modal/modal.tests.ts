import Modal from './modal.vue';
import { fireEvent, render, screen } from '@testing-library/vue';
import { mockTransaction } from '../../mocks/mock-transactions';
import '@testing-library/jest-dom';

const propsData = {
  isOpen: true,
  transaction: mockTransaction[0]
};

const renderModal = (propsData: any) =>
  render(Modal, {
    propsData
  });

describe('<Modal>', () => {
  it('should render component', () => {
    const { getByTestId } = renderModal(propsData);

    expect(getByTestId('modal')).toBeInTheDocument();
  });

  it('should not render component', () => {
    renderModal({
      isOpen: false,
      transaction: mockTransaction[0]
    });
    const modal = screen.queryByTestId('modal');

    expect(modal).not.toBeInTheDocument();
  });

  it('should emit closeModal', async () => {
    const { emitted, getByRole } = renderModal(propsData);
    const closeButton = getByRole('button', { name: 'Fechar' });
    await fireEvent.click(closeButton);

    expect(emitted()['close-modal']).toBeTruthy();
  });

  it('should get from as Aposentadoria text on modal', () => {
    const { findByText } = renderModal(propsData);

    expect(findByText(/Aposentadoria/gi)).toBeTruthy();
  });

  it('should get to as Conta Warren text on modal', () => {
    const { findByText } = renderModal(propsData);

    expect(findByText(/Conta Warren/gi)).toBeTruthy();
  });

  it('should get amount as R$ 2.078,66 text on modal', () => {
    const { findByText } = renderModal(propsData);

    expect(findByText('R$\xa02.078,66')).toBeTruthy();
  });
});
