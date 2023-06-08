<script>
  import ram_logo from '$lib/images/ram_logo.png';
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
</style>

<header>
  <!-- Add rick and morty logo from public folder -->
  <img src={ram_logo} alt="Rick and Morty logo" />
  <h3>Wubba Lubba Dub Hub</h3>
</header>
