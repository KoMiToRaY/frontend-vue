import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import RatingFilter from './rating-filter.vue';

describe(`rating-filter`, () => {
  it(`renders the filter label`, () => {
    const wrapper = mount(RatingFilter, {
      props: { modelValue: 0 },
    });

    // On teste le label de base
    expect(wrapper.text()).toContain(`Filter the restaurants by ratings`);
  });

  it(`emits update:modelValue when selection changes`, async () => {
    const wrapper = mount(RatingFilter, {
      props: { modelValue: 0 },
    });

    // On récupère directement le composant VSelect
    const select = wrapper.getComponent({ name: `VSelect` });

    // Simule un changement de valeur
    await select.vm.$emit(`update:modelValue`, 5);

    // Vérifie que l’événement a bien été propagé
    expect(wrapper.emitted(`update:modelValue`)).toBeTruthy();
    expect(wrapper.emitted(`update:modelValue`)?.[0]).toEqual([5]);
  });
});
