import { writable } from 'svelte/store';

export const seenEpisodesStore = writable([]);

export const countSeenEpisodesStore = {
  subscribe: seenEpisodesStore.subscribe,
  update: (episodes) => {
    seenEpisodesStore.set(episodes);
  },
  getCount: () => {
    return seenEpisodesStore.get().length;
  },
};
