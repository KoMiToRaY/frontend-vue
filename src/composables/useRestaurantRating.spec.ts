import { describe, expect, it } from 'vitest';
import { useRestaurantRating } from './useRestaurantRating';
import type { Restaurant } from './restaurants';

describe(`useRestaurantRating`, () => {
  it(`returns 0 and "No reviews yet" when no reviews`, () => {
    const restaurant: Restaurant = {
      name: `Test`,
      id: `1`,
      url: ``,
      phone: ``,
      display_phone: ``,
      photos: [],
      reviews: [],
    };
    const { average, formatted, count } = useRestaurantRating(restaurant);

    expect(average.value).toBe(0);
    expect(formatted.value).toBe(`No reviews yet`);
    expect(count.value).toBe(0);
  });

  it(`computes correct average and formatted rating`, () => {
    const restaurant: Restaurant = {
      name: `Test`,
      id: `1`,
      url: ``,
      phone: ``,
      display_phone: ``,
      photos: [],
      reviews: [
        { id: `r1`, text: `ok`, rating: 4 },
        { id: `r2`, text: `good`, rating: 5 },
        { id: `r3`, text: `bad`, rating: 3 },
      ],
    };
    const { average, formatted, count } = useRestaurantRating(restaurant);

    expect(average.value).toBeCloseTo(4);
    expect(formatted.value).toBe(`4/5`);
    expect(count.value).toBe(3);
  });

  it(`rounds average to one decimal if needed`, () => {
    const restaurant: Restaurant = {
      name: `Test`,
      id: `1`,
      url: ``,
      phone: ``,
      display_phone: ``,
      photos: [],
      reviews: [
        { id: `r1`, text: `ok`, rating: 4 },
        { id: `r2`, text: `good`, rating: 5 },
      ],
    };
    const { average, formatted } = useRestaurantRating(restaurant);

    expect(average.value).toBe(4.5);
    expect(formatted.value).toBe(`4.5/5`);
  });
});
