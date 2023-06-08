<script>
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing';

  let showWiki = false;
  let showSidebar = false;

  const dispatch = createEventDispatcher();

  function toggleWiki() {
    // Toggle the visibility of the wiki sub-menu
    showWiki = !showWiki;
  }

  function toggleNavbar() {
    // Toggle the visibility of the navbar
    showSidebar = !showSidebar;
    const sidebar = document.querySelector('.sidebar');
    const sidebar_content = document.querySelector('.sidebar_content');
    sidebar?.classList.toggle('hidden');
    sidebar_content?.classList.toggle('hidden');
    // Emit the toggle-sidebar event
    dispatch('toggle-sidebar', { showSidebar });
  }
</script>

<style>
  .sidebar {
    width: 200px;
    background-color: #f6f5f5;
    position: fixed; /* Make the sidebar fixed */
    top: 4rem; /* Position it at the top of the viewport */
    bottom: 0; /* Stretch it to the bottom of the viewport */
    left: 0; /* Position it at the left side */
    border-right: 1px solid #e0e0e0;
    overflow-y: auto; /* Enable vertical scrolling if needed */
  }

  .sidebar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .sidebar ul li {
    padding: 1rem 1.5rem;
    cursor: pointer;
  }

  .sidebar ul li:hover {
    background-color: #e0e0e0;
  }

  .sidebar ul ul li {
    padding: 0.5rem 3rem;
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

  .sidebar_content > li {
    padding-left: 3rem;
  }

  .sidebar_content.hidden {
    display: none;
  }

  .sidebar.hidden {
    min-height: 1rem;
    width: 2.5rem;
  }
</style>

<div class="sidebar {showSidebar ? '' : 'hidden'}">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="menu-button" on:click={toggleNavbar}>
    <i class="fa fa-bars"></i>
  </div>
  <ul class="sidebar_content {showSidebar ? '' : 'hidden'}">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li on:click={() => navigate('/')}>Home</li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li on:click={toggleWiki}>Wiki</li>
    {#if showWiki}
      <ul>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => navigate('/wiki/characters')}>Characters</li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => navigate('/wiki/locations')}>Locations</li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => navigate('/wiki/episodes')}>Episodes</li>
      </ul>
    {/if}
  </ul>
</div>
