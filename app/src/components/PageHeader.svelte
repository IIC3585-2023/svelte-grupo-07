<script>
  /**
   * @type {any}
   */
   export let title;
  /**
   * @type {any}
   */
   export let searchTerm;
</script>

<style>
  h1 {
    text-align: center;
  }

  .search-container {
    display: flex;
    justify-content: center;
  }

  /* Styles for the SearchBar component */
  .search-bar {
    margin-bottom: 16px;
    width: 20%;
    justify-content: center;
  }

  .search-bar input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>

<div>
  <h1>{title}</h1>
  <div class="search-container">
    <div class="search-bar">
      <input type="text" bind:value={searchTerm} placeholder="Buscar..." />
    </div>
  </div>
</div>
