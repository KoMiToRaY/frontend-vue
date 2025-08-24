import { mount } from '@vue/test-utils';
import RestaurantReview from './review.vue';
import restaurantsResponse from '@/mock/restaurants.json';

const review = restaurantsResponse[0].reviews[0];

describe(`restaurant-review`, () => {
  test(`no props should throw an error`, () => {
    expect(() => mount(RestaurantReview)).toThrowError();
  });

  it(`renders a review`, () => {
    const wrapper = mount(RestaurantReview, {
      props: { review },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
