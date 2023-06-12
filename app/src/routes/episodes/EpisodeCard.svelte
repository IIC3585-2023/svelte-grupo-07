<script>
  // @ts-nocheck
  import { getCharactersByIds } from '../../services';
  import { seenEpisodesStore, countSeenEpisodesStore } from '../../stores/TrackingStore';
  import { onMount, onDestroy } from 'svelte';
  
  import CharacterItem from '../../components/CharacterItem.svelte';

  export let episode;
  export let seasons;

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
    seenEpisodesSubscription = seenEpisodesStore.subscribe((episodes) => {
      if (episodes.includes(episode.id)) {
        episode.seen = true;
      } else {
        episode.seen = false;
      }
    });
  });

  onDestroy(() => {
    seenEpisodesSubscription?.();
  });

  function handleSeen(event) {
    const isChecked = event.target.checked;
    const [seasonNumber] = episode.episode.split('E');
    seenEpisodesStore.update((episodes) => {
      if (isChecked) {
        return [...episodes, episode.id];
      }
      return episodes.filter((ep) => ep !== episode.id);
    });
    if (isChecked) {
      seasons[seasonNumber].seenEpisodes.push(episode.id);
      console.log(`Ahora de la temporada ${seasonNumber} he visto ${seasons[seasonNumber].seenEpisodes.length} episodios`);
    } else {
      seasons[seasonNumber].seenEpisodes = seasons[
        seasonNumber
      ].seenEpisodes.filter((ep) => ep !== episode.id);
      console.log(`Ahora de la temporada ${seasonNumber} he visto ${seasons[seasonNumber].seenEpisodes.length} episodios`);
    }
    seasons[seasonNumber].progress = Math.floor(
      (seasons[seasonNumber].seenEpisodes.length / seasons[seasonNumber].totalEpisodes) * 100
    );
  }
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
  
  @media (max-width: 576px) {
    .card-header h3 {
      font-size: 12px;
    }
    .card-header p{
      font-size: 12px;
    }
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
    <p>
      <span>
        <label class="seen-label">
          Visto:
          <input type="checkbox" bind:checked={episode.seen} class="seen-checkbox" on:change={handleSeen} />
        </label>
      </span>
    </p>
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
            <CharacterItem character={character} toPicker={false} />
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>
