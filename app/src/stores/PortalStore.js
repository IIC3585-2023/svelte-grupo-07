// @ts-nocheck
import { writable } from 'svelte/store';

export const characterFilters = writable([]);

export const locationFilters = writable([]);

export const addFilter = (type, element) => {
  const filterToUpdate =
    type === 'character' ? characterFilters : locationFilters;
  filterToUpdate.update((filters) => [...filters, element]);
};

export const removeFilter = (type, element) => {
  const filterToUpdate =
    type === 'character' ? characterFilters : locationFilters;
  filterToUpdate.update((filters) =>
    filters.filter((item) => item.name !== element.name)
  );
};
