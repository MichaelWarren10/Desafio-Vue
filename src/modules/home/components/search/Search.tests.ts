import Search from './Search.vue';
import { render } from '@testing-library/vue';
import '@testing-library/jest-dom';

const propsData = {};

const makeWrapper = (props?: any) =>
  render(Search, { propsData: { ...propsData, ...props } });

describe("<Search />", () => {
  it("should render component", async () => {
    const wrapper = makeWrapper();

    expect(wrapper).toBeTruthy();
  });
});
