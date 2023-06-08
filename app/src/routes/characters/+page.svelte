<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import { getAllCharacters } from '../../services';
  import PageHeader from '../../components/PageHeader.svelte';
  import Pagination from '../../components/Pagination.svelte';
  import CharacterCard from './CharacterCard.svelte';

  let items = [];
  let filteredItems = []
  let totalPages = 42;
  let searchTerm = '';
  const title = "Personajes";

  onMount(async () => {
    await fetchCharacters(1);
  });

  $: {
    filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  /**
   * @param {number} page
   */
  async function fetchCharacters(page) {
    try {
      const characters = await getAllCharacters(page.detail);
      items = characters;
      
    } catch (error) {
      console.error('Error al obtener los personajes:', error);
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

  .character-card {
    flex: 0 0 calc(50% - 10px);
    margin-bottom: 20px;
    margin-left: 5px;
    margin-right: 5px;
  }

  @media (min-width: 768px) {
    .character-card {
      flex: 0 0 calc(33.33% - 10px);
    }
  }

  @media (min-width: 1024px) {
    .character-card {
      flex: 0 0 calc(25% - 10px);
    }
  }
</style>

<div>
  <PageHeader title={title} bind:searchTerm={searchTerm} />
  <div class="card-container">
    {#each filteredItems as item (item.id)}
      <div class="character-card">
        <CharacterCard character = {item} />
      </div>
    {/each}
  </div>
  <Pagination totalPages = {totalPages} on:fetchData="{fetchCharacters}" />
</div>
