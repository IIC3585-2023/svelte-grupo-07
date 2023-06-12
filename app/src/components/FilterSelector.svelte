<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import { getAllCharacters, getAllLocations } from '../services';
  import { addFilter } from "../stores/PortalStore";
  import { createEventDispatcher } from 'svelte';
  import CharacterItem from './CharacterItem.svelte';
  let showCharacters = true;
  let characters = [];
  let locations = [];

  const selectLocation = (location) => {
    addFilter('location', location);
    removeLocation(location.name);
  };

  const toggleCharacters = (button) => {
    showCharacters = button === 'characters';
  };

  const fetchCharacters = async () => {
    characters = await getAllCharacters(1);
    console.log(characters);
  };

  const fetchLocations = async () => {
    locations = await getAllLocations(1);
    console.log(locations);
  };

  const removeLocation = (id) => {
    locations = locations.filter((location) => location.name !== id);
  };

  onMount(async () => {
    await fetchCharacters();
    await fetchLocations();
  });
</script>

<style>
  .container {
    margin-bottom: 2rem;
    max-width: 90%;
    width: 50rem;
  }

  .selector {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
  }

  .select {
    padding: 0.2rem;
    cursor: pointer;
  }

  .selector p {
    margin: 0;
  }

  .show {
    background-color: #4D4669;
    color: #e0e0e0;
    border-radius: 0.5rem;
  }

  .show:hover {
    background-color: #4D4669;
  }

  .select-pool {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .column {
    flex-direction: column;
    gap: 0.5rem;
  }

  .location-card {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    color: #213547;
    border-radius: 4px;
    padding: 0.5rem 0.5rem;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    text-align: center;
  }

  .card-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container">
  <div class="selector">
    <div on:click={() => toggleCharacters('characters')} class:show={showCharacters} class="select characters">Personajes</div>
    <p>|</p>
    <div on:click={() => toggleCharacters('locations')} class:show={!showCharacters} class="select locations">Lugares</div>
  </div>
  {#if showCharacters}
    <div class="select-pool">
      {#each characters as character}
        <CharacterItem character={character} action={1} toPicker={true} />
      {/each}
    </div>
  {:else}
    <div class="select-pool column">
      {#each locations as location}
      <div on:click={() => selectLocation(location)} class="location-card">
        <div class="card-header">
          <h3>{location.name}</h3>
        </div>
      </div>
      {/each}
    </div>
  {/if}
</div>
