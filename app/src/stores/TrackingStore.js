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

export const seasonProgressStore = writable({});

export const updateSeasonProgress = (seasonNumber, seenEpisodes, totalEpisodes) => {
  seasonProgressStore.update((prevProgress) => {
    const updatedProgress = { ...prevProgress };
    const title = `Temporada ${seasonNumber}`;
    updatedProgress[seasonNumber] = {
      title,
      seenEpisodes,
      totalEpisodes,
      progress: Math.floor((seenEpisodes.length / totalEpisodes) * 100),
    };
    return updatedProgress;
  });
};
