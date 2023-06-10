<script>
  // @ts-nocheck
  import { getCharactersByIds } from '../../services';
  import CharacterItem from '../../components/CharacterItem.svelte';

  export let location;
  console.log(location)

  let showCharacters = false;

  let characterRows = [];

  async function toggleCharacters(locationCharacters) {
    if(!showCharacters){
      await chargeCharacters(locationCharacters)
    }
    showCharacters = !showCharacters;
  }

  function calculateCharacterRows(characters) {
    const rowSize = 5;

    for (let i = 0; i < characters.length; i += rowSize) {
      characterRows.push(characters.slice(i, i + rowSize));
    }
  }

  async function chargeCharacters(locationCharacters) {
    const characters = await getCharactersByIds(locationCharacters)
    calculateCharacterRows(characters)
  }
</script>

<style>
.location-card {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 10px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }

  .location-card:hover {
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

</style>

<div class="location-card">
  <div class="card-header">
    <h3>{location.name}</h3>
    <p><span>Tipo: </span>{location.type}</p>
    <p><span>Dimensión: </span>{location.dimension}</p>
    <button on:click={() => toggleCharacters(location.residents)} class="arrow-button">
      <i class:arrow-up={showCharacters} class:arrow-down={!showCharacters}></i>
    </button>
  </div>
  {#if showCharacters}
    <div class="card-content open">
      <h4>Residentes:</h4>
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
