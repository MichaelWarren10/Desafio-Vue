import DropdownFilter from './dropdown-filter.vue';
import { render, fireEvent } from '@testing-library/vue';
import { mockTransaction } from '../../mocks/mock-transactions';
import { options } from '../../mocks/mock-transaction-options';

const propsData = {
  items: mockTransaction,
  options
};

const makeWrapper = () => render(DropdownFilter, { propsData });

describe('<DropdownFilter />', () => {
  it('should render component', async () => {
    const wrapper = makeWrapper();

    expect(wrapper).toBeTruthy();
  });

  it('should emit checked with options, selectedOptions and items', async () => {
    const { getByText, emitted } = makeWrapper();

    const dropdown = getByText('Filtre por status');
    await fireEvent.click(dropdown);

    const checkBox = getByText('Concluído');
    await fireEvent.click(checkBox);

    const selectedOptions = [
      {
        text: 'Concluído',
        argument: 'created',
        checked: true
      }
    ];
    const emitObj = {
      options,
      selectedOptions,
      items: mockTransaction
    };

    expect(emitted()['checked'][0][0]).toEqual(emitObj);
  });
});
