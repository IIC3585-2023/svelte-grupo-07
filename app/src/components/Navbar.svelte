<script>
  import ram_logo from '$lib/images/ram_logo.png';
  import Sidebar from './Sidebar.svelte';
  import { onMount } from 'svelte';
  
  let isMobile = false;

  onMount(() => {
    isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth < 768;
    });
  });

</script>
<style>
  header {
    background-color: #74cd0fca;
    font-family: 'Creepster';
    flex-shrink: 0;
    height: 4rem;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    position: sticky;
    top: 0;
  }
  
  h3 {
    padding-left: 1rem;
    font-weight: 800;
    font-size: 2rem;
    margin: 0;
  }
  
  img {
    width: 50px;
    height: 50px;
  }
  .menu-button {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
  }

  .menu-button i {
    font-size: 20px;
  }


</style>

<header>
  <!-- Add rick and morty logo from public folder -->
  {#if !isMobile}
    <img src={ram_logo} alt="Rick and Morty logo" />
  {:else}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
    <Sidebar />
    
  {/if}
  <h3>Wubba Lubba Dub Hub</h3>
</header>
