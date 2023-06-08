<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { navigate } from 'svelte-routing';

  let showWiki = false;
  let showSidebar = false;
  let showMenu = false;

  let isMobile = false;

  onMount(() => {
    isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth < 768;
    });
  });

  const dispatch = createEventDispatcher();

  function toggleMenu() {
    showMenu = !showMenu;
    console.log(showMenu);
    dispatch('toggle-menu', { showMenu });
  }

  function toggleWiki() {
    // Toggle the visibility of the wiki sub-menu
    showWiki = !showWiki;;
  }

  function toggleNavbar() {
    // Toggle the visibility of the navbar
    showSidebar = !showSidebar;
    const sidebar = document.querySelector('.sidebar');
    const sidebar_content = document.querySelector('.sidebar_content');
    const main_container = document.querySelector('.main_container');
    sidebar?.classList.toggle('hidden');
    sidebar_content?.classList.toggle('hidden');
    main_container?.classList.toggle('hidden');
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

  @media (max-width: 768px) {
    .sidebar {
      display: none;
    }
    .menu {
      padding: 10px;
    }

    .menu-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      top: 4rem;
      left: 0;
      width: 100%;
      background-color: #f6f5f5;
      border-right: 1px solid #e0e0e0;
    }

    .sidebar_content {
      padding: 0;
      text-align: center;
      width: 100%;
    }

    .sidebar_content li {
      padding: 14px 0;
      text-decoration: none;
      display: block;
    }

    .sidebar_content li:hover {
      background-color: #ddd;
      color: black;
    }

    .sidebar_content ul {
      padding: 0;
    }
  }


</style>

{#if !isMobile}
<div class="sidebar {showSidebar ? '' : 'hidden'}">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="menu-button" on:click={toggleNavbar}>
    <i class="fas fa-bars"></i>
  </div>
  <ul class="sidebar_content {showSidebar ? '' : 'hidden'}">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li on:click={() => navigate('/')}>Home</li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li on:click={toggleWiki}>Wiki</li>
    {#if showWiki}
      <ul>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => navigate('/characters')}>Characters</li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => navigate('/locations')}>Locations</li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => navigate('/episodes')}>Episodes</li>
      </ul>
    {/if}
  </ul>
</div>
{:else}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="menu" >
  <div class="menu-button" on:click={toggleMenu}>
    <i class="fas fa-bars"></i>
  </div>
  <div class="menu-content {showMenu ? '' : 'hidden'}">
    <ul class="sidebar_content {showMenu ? '' : 'hidden'}">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li on:click={() => navigate('/')}>Home</li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li >Wiki</li>
        <ul>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li on:click={() => navigate('/wiki/characters')}>Characters</li>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li on:click={() => navigate('/wiki/locations')}>Locations</li>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li on:click={() => navigate('/wiki/episodes')}>Episodes</li>
        </ul>
    </ul>
  </div>
</div>
{/if}
