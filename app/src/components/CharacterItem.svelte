<script>
// @ts-nocheck

    import CharacterDetailModal from "../routes/characters/CharacterDetailModal.svelte";

// @ts-nocheck

  import { addFilter, removeFilter } from "../stores/PortalStore";
  export let character;
  export let toPicker;
  export let action = 1;
  let isModalOpen = false;
	function toggleModal() {
		isModalOpen = !isModalOpen;
	}

  const selectCharacter = () => {
    if (toPicker) {
      console.log(action);
      if (action === -1) {
        removeFilter('character', character);
      } else if (action === 1) {
        addFilter('character', character);
      }
    }
    else
    {
      // show modal of character
      toggleModal();
    }
  };

</script>

<style>
    .character-item {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 10px;
    cursor: pointer;
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
  }

  .character-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .image-container {
    position: relative;
  }

  .image-container i {
    position: absolute;
    top: -6px;
    right: 0;
    font-size: 12px;
    border-radius: 50%;
    padding: 5px;
  }

  .image-container i.add {
    background-color: #00c853;
    color: #fff;
  }

  .image-container i.remove {
    color: #d50000;
    top: -10px;
    right: -5px;
    font-size: 20px;
  }


</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={selectCharacter} class="character-item">
  <div class="image-container">
    <img src={character.image} alt={character.name} class="character-image" />
    {#if action === -1 && toPicker}
    <i class="fa-solid fa-circle-minus remove"></i>
    {:else if action === 1 && toPicker}
    <i class="fa-solid fa-plus add"></i>
    {/if}
  </div>
  {#if isModalOpen}
    <CharacterDetailModal
      characterId={character.id}
    />
  {/if}
  <span>{character.name}</span>
</div>