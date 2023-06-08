<script>
  import CharacterDetailModal from './CharacterDetailModal.svelte';

  /**
   * @type {{ image: any; name: any; id: string; }}
   */
  export let character;
  let isModalOpen = false;
	function toggleModal() {
		isModalOpen = !isModalOpen;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<style>
  /* Estilos para el componente CharacterCard */
  .character-card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
  }

  .character-card img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 16px;
  }

  .character-card .card-content h3 {
    margin-top: 0;
  }
</style>

<div class="character-card" on:click={toggleModal}>
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img src={character.image} alt="Character Image">
  <div class="card-content">
    <h3>{character.name}</h3>
  </div>
  {#if isModalOpen}
    <CharacterDetailModal
      characterId={character.id}
    />
  {/if}
</div>
