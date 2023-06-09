<script>
  // @ts-nocheck

  import { onMount } from 'svelte';
  import PageHeader from '../../components/PageHeader.svelte';
  import Pagination from '../../components/Pagination.svelte';
  import { getAllEpisodes } from '../../services';
  import EpisodeCard from './EpisodeCard.svelte';
  import { countSeenEpisodesStore, seasonProgressStore, updateSeasonProgress } from '../../stores/TrackingStore';

  /**
   * @type {any[] | undefined}
   */
  let items = [];
  let filterItems = [];
  let totalPages = 3;
  let searchTerm = '';
  const title = "Episodios";
  let countSeenEpisodes = 0;
  let showProgress = false;
  let seasons = {};

  countSeenEpisodesStore.subscribe((seenEpisodes) => {
    countSeenEpisodes = seenEpisodes.length;
  });

  seasonProgressStore.subscribe((progress) => {
    seasons = progress;
  });

  let isLoading = true;

  onMount(async () => {
    await fetchEpisodes(1);
    isLoading = false;
  });

  $: {
    filterItems = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.episode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async function fetchEpisodes(page) {
    try {
      const episodes = await getAllEpisodes(page.detail);
      items = episodes;
      for (let i = 0; i < items.length; i++) {
        const episode = items[i];
        const [seasonNumber] = episode.episode.split('E');
        const episodeNumber = Number(episode.episode.split('E')[1]);
        const lastSeasonNumber = seasonNumber;

        if (!seasons[seasonNumber]) {
          seasons[seasonNumber] = {
            title: `Temporada ${seasonNumber}`,
            seenEpisodes: [],
            totalEpisodes: 0,
            progress: 0,
          };
        } else {
          seasons[lastSeasonNumber].totalEpisodes = episodeNumber;
        }

        updateSeasonProgress(seasonNumber, seasons[seasonNumber].seenEpisodes, episodeNumber);
      }
    } catch (error) {
      console.error('Error al obtener los lugares:', error);
    }
  }

  const toggleProgress = () => {
    showProgress = !showProgress;
    calculateProgress();
  };

  const calculateProgress = () => {
    for (let i = 0; i < items.length; i++) {
      const episode = items[i];
      const [seasonNumber] = episode.episode.split('E');
      seasons[seasonNumber].progress = Math.floor(
        (seasons[seasonNumber].seenEpisodes.length / seasons[seasonNumber].totalEpisodes) * 100
      );
    }
  };
  countSeenEpisodesStore.subscribe(calculateProgress);
</script>

<style>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px;
  }

  .episode-card {
    width: calc(80vw);
    margin-bottom: 20px;
  }

  .progress-section {
    margin-top: 20px;
  }

  .season-progress {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .season-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;
  }

  .progress-bar {
    height: 10px;
    width: 200px;
    background-color: #ddd;
    border-radius: 5px;
    overflow: hidden;
    margin-left: 10px;
  }

  .progress-bar-inner {
    height: 100%;
    background-color: #74cd0fca;
  }

  .progress-container {
    width: calc(80vw);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  .show-progress-button {
    background-color: #74cd0fca;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  }
</style>

<div>
  {#if !isLoading}
  <PageHeader title={title} bind:searchTerm={searchTerm} />
  <div class="card-container">
    <div class="progress-container">
      <h3>Has visto {countSeenEpisodes} episodios</h3>
      <button on:click={toggleProgress} class="show-progress-button">
        {#if showProgress}
        Ocultar progreso
        {:else}
        Mostrar progreso
        {/if}
      </button>
      {#if showProgress}
      <div class="progress-section">
        <h2>Progreso de temporadas</h2>
        {#each Object.values(seasons) as season}
        <div class="season-progress">
          <div class="season-info">
            <p>{season.title}</p>
            <p>{season.seenEpisodes.length}/{season.totalEpisodes}</p>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-inner" style="width: {season.progress}%"></div>
          </div>
        </div>
        {/each}
      </div>
      {/if}
    </div>
    {#each filterItems as item (item.id)}
    <div class="episode-card">
      <EpisodeCard episode={item} seasons={seasons}></EpisodeCard>
    </div>
    {/each}
  </div>
  <Pagination totalPages={totalPages} on:fetchData="{fetchEpisodes}" />
  {/if}
</div>
