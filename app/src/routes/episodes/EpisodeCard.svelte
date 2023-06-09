<script>
  // @ts-nocheck
  import { getCharactersByIds } from '../../services';
  import { seenEpisodes } from '../../store';
  import { onMount } from 'svelte';
  
  export let episode;

  let showCharacters = false;
  let characterRows = [];

  async function toggleCharacters(episodeCharacters) {
    if(!showCharacters){
      await chargeCharacters(episodeCharacters)
    }
    showCharacters = !showCharacters;
  }

  function calculateCharacterRows(characters) {
    const rowSize = 5;

    for (let i = 0; i < characters.length; i += rowSize) {
      characterRows.push(characters.slice(i, i + rowSize));
    }
  }

  async function chargeCharacters(episodeCharacters) {
    const characters = await getCharactersByIds(episodeCharacters)
    calculateCharacterRows(characters)
  }

  let seenEpisodesSubscription;
  onMount(() => {
    seenEpisodesSubscription = seenEpisodes.subscribe((episodes) => {
      if (episodes.includes(episode.id)) {
        episode.seen = true;
      } else {
        episode.seen = false;
      }
    });
  });

</script>

<style>
  .episode-card {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 10px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }

  .episode-card:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }

  .card-header h3 {
    width: 38%;
    font-size: 18px;
    font-weight: bold;
    margin-right: 2%;
  }

  .card-header p{
    width: 28%;
    margin-right: 2%;
  }

  .card-header p span {
    font-weight: bold;
  }

  .arrow-button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .arrow-up:before {
    content: '▲';
  }

  .arrow-down:before {
    content: '▼';
  }

  .card-content {
    margin-top: 10px;
    padding-top: 10px;
    display: none;
    border-top: 1px solid #ddd;
  }

  .card-content.open {
    display: block;
  }

  .character-row {
    display: flex;
    flex-wrap: wrap;
  }

  .character-item {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    .character-item {
      width: 40%;
    }
  }

  @media (max-width: 576px) {
    .character-item {
      width: 100%;
    }
    .card-header h3 {
      font-size: 12px;
    }
    .card-header p{
      font-size: 12px;
    }
  }

  .character-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .seen-label {
    display: flex;
    align-items: center;
  }

  .seen-checkbox {
    margin-left: 8px;
  }

</style>

<div class="episode-card">
  <div class="card-header">
    <h3>{episode.name}</h3>
    <p><span>Fecha: </span>{episode.air_date}</p>
    <p><span>Episodio: </span>{episode.episode}</p>
    <p><span>
      <label class="seen-label">
        Visto:
        <input type="checkbox" bind:checked={episode.seen} class="seen-checkbox" />
      </label>
    </span></p>
    <button on:click={() => toggleCharacters(episode.characters)} class="arrow-button">
      <i class:arrow-down={!showCharacters} class:arrow-up={showCharacters}></i>
    </button>
  </div>
  {#if showCharacters}
    <div class="card-content open">
      <h4>Personajes:</h4>
      {#each characterRows as row, rowIndex (rowIndex)}
        <div class="character-row">
          {#each row as character, index (index)}
            <div class="character-item" key={index}>
              <img src={character.image} alt={character.name} class="character-image" />
              <span>{character.name}</span>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>
