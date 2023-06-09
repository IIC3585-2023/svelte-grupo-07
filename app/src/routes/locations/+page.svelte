<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import PageHeader from '../../components/PageHeader.svelte';
  import Pagination from '../../components/Pagination.svelte';
  import { getAllLocations } from '../../services';
  import LocationCard from './LocationCard.svelte';

  /**
   * @type {any[] | undefined}
   */
  let items = [];
  let filterItems = [];
  let totalPages = 7;
  let searchTerm = '';
  const title = "Lugares";

  onMount(() => {
    fetchLocations(1);
  });

  $: {
    filterItems = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async function fetchLocations(page) {
    try {
      const locations = await getAllLocations(page.detail);
      items = locations
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

  .location-card {
    width: calc(80vw);
    margin-bottom: 20px;
  }
</style>
<div>
  <PageHeader title={title} bind:searchTerm={searchTerm} />
  <div class="card-container">
    {#each filterItems as item (item.id)}
    <div class="location-card">
      <LocationCard location = {item}></LocationCard>
    </div>
    {/each}
  </div>
  <Pagination totalPages = {totalPages} on:fetchData="{fetchLocations}" />
</div>


