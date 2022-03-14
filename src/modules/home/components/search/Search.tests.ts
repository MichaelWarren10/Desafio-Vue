import Search from './Search.vue';
import { render, fireEvent } from "@testing-library/vue";
import '@testing-library/jest-dom';
import { mockTransaction } from "../../mocks/mock-transactions";

const propsData = {};

const makeWrapper = (props?: any) =>
  render(Search, { propsData: { ...propsData, ...props } });

describe("<Search />", () => {
  it("should render component", async () => {
    const wrapper = makeWrapper({ items: mockTransaction });

    expect(wrapper).toBeTruthy();
  });

	it('should emit text and items when type', async() => {
		const { emitted, getByPlaceholderText } = makeWrapper({ items: mockTransaction});
		const input = getByPlaceholderText(/Busque pelo título/gi);
		await fireEvent.update(input, 'Férias');

		expect(emitted()["filter-by-title"][0][0]).toEqual({text: 'Férias', items: mockTransaction});
	});
});
