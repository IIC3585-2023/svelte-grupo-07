<script>
  import './styles.css'
  import Navbar from '../components/Navbar.svelte';
  import Sidebar from '../components/Sidebar.svelte';
  import Footer from '../components/Footer.svelte';
  import { onMount } from 'svelte';


  let isMobile = false;
  onMount(() => {
    isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth < 768;
    });
  });

  let isSidebarCollapsed = false;

  function handleToggleSidebar() {
    isSidebarCollapsed = !isSidebarCollapsed;
  }
</script>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0;
  }

  .main_container {
    flex-grow: 1;
    display: flex;
    max-width: 100vw;
    padding-left: 2.5rem;
  }

  .main_container.hidden {
    padding-left: 200px;
  }

  @media (max-width: 768px) {
    .main_container {
      padding-left: 0;
    }

    .main_container.hidden {
      padding-left: 0;
    }
  }

</style>

<div class="app">
  <Navbar />
  <div class="main_container {isSidebarCollapsed ? 'hidden' : ''}">
    {#if !isMobile}
      <Sidebar on:toggle-sidebar={handleToggleSidebar}/>
    {/if}
		<slot />
  </div>
  <Footer />
</div>