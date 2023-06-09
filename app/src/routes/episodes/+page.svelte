<script>
  // @ts-nocheck
  
  import { onMount } from 'svelte';
  import PageHeader from '../../components/PageHeader.svelte';
  import Pagination from '../../components/Pagination.svelte';
  import { getAllEpisodes } from '../../services';
  import EpisodeCard from './EpisodeCard.svelte';
  import { countSeenEpisodesStore } from '$lib/store';
  
  /**
   * @type {any[] | undefined}
   */
  let items = [];
  let filterItems = [];
  let totalPages = 3;
  let searchTerm = '';
  const title = "Episodios";
  let countSeenEpisodes = 0;
  
  countSeenEpisodesStore.subscribe((seenEpisodes) => {
    countSeenEpisodes = seenEpisodes.length;
  });
  
  onMount(() => {
    fetchEpisodes(1);
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
    } catch (error) {
      console.error('Error al obtener los lugares:', error);
    }
  }
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
</style>

<div>
  <PageHeader title={title} bind:searchTerm={searchTerm} />
  <h3>Has visto {countSeenEpisodes} episodios</h3>
  <div class="card-container">
    {#each filterItems as item (item.id)}
    <div class="episode-card">
      <EpisodeCard episode={item}></EpisodeCard>
    </div>
    {/each}
  </div>
  <Pagination totalPages={totalPages} on:fetchData="{fetchEpisodes}" />
</div>
