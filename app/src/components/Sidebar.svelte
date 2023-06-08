<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { navigate, Link } from 'svelte-routing';

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

  a {
    text-decoration: none;
    color: black;
  }

  .sidebar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .sidebar ul li,
  .sidebar ul a {
    padding: 1rem 1.5rem;
    cursor: pointer;
  }

  .sidebar ul a {
    display: block;
  }

  .sidebar ul li:hover,
  .sidebar ul a:hover {
    background-color: #e0e0e0;
  }

  .sidebar ul ul a {
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

  .sidebar_content > li,
  .sidebar_content > a {
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

    .sidebar_content li,
    .sidebar_content a {
      padding: 14px 0;
      text-decoration: none;
      display: block;
    }

    .sidebar_content li:hover,
    .sidebar_content a:hover {
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
    <a href="/">Home</a>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li on:click={toggleWiki}>Wiki</li>
    {#if showWiki}
      <ul>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a href='/characters'>Characters</a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a href='/locations'>Locations</a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a href='/episodes'>Episodes</a>
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
      <a href="/">Home</a>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li >Wiki</li>
        <ul>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <a href="/">Characters</a>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <a href="/">Locations</a>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <a href="/">Episodes</a>
        </ul>
    </ul>
  </div>
</div>
{/if}
