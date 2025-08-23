import { mount } from '@vue/test-utils';

import RestaurantCard from './card.vue';
import restaurantsResponse from '@/mock/restaurants.json';

const restaurant = restaurantsResponse[0];

describe(`restaurant-card`, () => {
  test(`no props should throw an error`, (context) => {
    expect(() => mount(RestaurantCard, {
      global: { plugins: [context.router] },
    })).toThrowError();
  });

  it(`renders correctly a restaurant`, (context) => {
    const wrapper = mount(RestaurantCard, {
      global: { plugins: [context.router] },
      props: { restaurant },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
