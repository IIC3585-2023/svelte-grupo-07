// @ts-nocheck
import { writable, get } from 'svelte/store';

export const seenEpisodesStore = writable([]);

export const countSeenEpisodesStore = {
  subscribe: seenEpisodesStore.subscribe,
  update: (episodes) => {
    seenEpisodesStore.update((prevEpisodes) => {
      if (!prevEpisodes.includes(episodes)) {
        return [...prevEpisodes, episodes];
      }
      return prevEpisodes;
    });
  },
  getCount: () => {
    return get(seenEpisodesStore).length;
  },
};

