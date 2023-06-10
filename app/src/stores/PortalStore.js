import { writable } from "svelte/store";

export const characterFilters = writable([]);

export const locationFilters = writable([]);

export const addFilter = (type, element) => {
	if (type === "character") {
		characterFilters.update((filters) => {
			const newFilters = [...filters, element];
			return newFilters;
		});
	}
	if (type === "location") {
		locationFilters.update((filters) => {
			const newFilters = [...filters, element];
			return newFilters;
		});
	}
};

export const removeFilter = (type, element) => {
	if (type === "character") {
		characterFilters.update((filters) =>
			filters.filter((item) => item.name !== element.name)
		);
	}
	if (type === "location") {
		locationFilters.update((filters) =>
			filters.filter((item) => item.name !== element.name)
		);
	}
};
