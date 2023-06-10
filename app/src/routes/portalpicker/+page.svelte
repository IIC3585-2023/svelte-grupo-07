<script>
// @ts-nocheck

import { onMount } from 'svelte';
  import FilterSelector from '../../components/FilterSelector.svelte';
  import CharacterItem from '../../components/CharacterItem.svelte';
  import portalImage from '$lib/images/ram_logo.png';
  import portalGif from '../../assets/portal.gif';
  import { characterFilters, locationFilters, removeFilter } from '../../stores/PortalStore';
  import { getFirstEpisode } from '../../services';
  let recommendedEpisode = 1;
  let answer = -1;
  let isMobile = false;

  onMount(() => {
    isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth < 768;
    });
  });

  const activatePortal = async () => {
    answer = 0;
    const episode = await getFirstEpisode($characterFilters, $locationFilters);
    setInterval(() => {
      answer = 1;
    }, 5000);
    recommendedEpisode = episode;
  }

  const removeLocation = (location) => {
    console.log(location);
    removeFilter('location', location);
    console.log($locationFilters);
  }

</script>

<style>
  h1 {
    font-size: 2.25rem;
    font-weight: 800;
    text-align: center;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 400;
    text-align: center;
  }

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .portal-container {
    background-color: #4D4669;
    color: #ffffff;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    max-width: 90%;
    width: 50rem;
    border: 1px solid #e0e0e0;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    
  }

  .title > img {
    width: 8rem;
    padding: 1rem 2rem;
  }

  .magic-container {
    background-color: #4D4669;
    border-bottom: 1px solid #e0e0e0;
  }

  button {
    background-color: #91D741;
    color: #213547;
    border-radius: 0.5rem;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    margin: 1rem 0;
  }

  button:hover {
    background-color: #A8E04F;
  }

  .filter-selected {
    display: flex;
    padding: 1rem;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    width: 50%;
  }

  .locations {
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .location-card {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    color: #213547;
    border-radius: 4px;
    padding: 0.5rem 0.5rem;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .card-header {
    text-align: center;
  }

  .card-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }

  .portal-gif-mobile {
    width: 100%;
  }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container">
  <div class="portal-container">
    <div class="title">
      <img src={portalImage} alt="Portal Picker"/>
      <h1>Portal Picker</h1>
    </div>
    <div class="magic-container center">
      {#if answer === -1}
        <button on:click={activatePortal}>Activar Portal</button>
      {:else if answer===0}
        {#if isMobile}
          <h2>Eligiendo episodio...</h2>
          <img src={portalGif} alt="Portal Gif" class="portal-gif-mobile"/>
        {:else}
          <h2>Eligiendo episodio...</h2>
          <img src={portalGif} alt="Portal Gif"/>
        {/if}
      {:else if answer===1}
        <h2>El episodio recomendado es</h2>
        <h3>{recommendedEpisode.name} {recommendedEpisode.episode}</h3>
      {/if}
    </div>
    <h3>Filtros Seleccionados</h3>
    <div class="filter-selected">
      <div class="filters characters">
          {#each $characterFilters as character}
            <CharacterItem character={character} action={-1} toPicker={true} />
          {/each}
      </div>
      <div class="filters locations">
          {#each $locationFilters as location}
            <div on:click={()=>removeLocation(location)} class="location-card">
              <div class="card-header">
                <h3>{location.name}</h3>
              </div>
            </div>
          {/each}
      </div>
    </div>
  </div>
  <FilterSelector /> 
</div>


