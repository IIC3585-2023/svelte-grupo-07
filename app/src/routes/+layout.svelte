<script>
  import Navbar from '../components/Navbar.svelte';
  import Sidebar from '../components/Sidebar.svelte';
  import Footer from '../components/Footer.svelte';

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
    min-width: calc(100vw - 17px);
    max-width: 100vw;
  }

</style>

<div class="app">
  <Navbar />
  <div class="main_container">
    <Sidebar on:toggle-sidebar={handleToggleSidebar} />
		<slot />
  </div>
  <Footer />
</div>