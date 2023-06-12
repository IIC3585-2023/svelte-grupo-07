<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
    /**
   * @type {number}
   */
  export let totalPages;

  let currentPage = 1;

  function previousPage() {
    if (currentPage > 1) {
      currentPage--;
      dispatch('fetchData', currentPage);
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      dispatch('fetchData', currentPage);
    }
  }
</script>

<style>
  /* Styles for the Pagination component */
  .pagination {
    margin-bottom: 20px;
    justify-content: center;
    display: flex;
    align-items: center;
  }

  .pagination button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f2f2f2;
    border: none;
    color: #333;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 4px;
    margin: 0 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .pagination button:hover {
    background-color: #e6e6e6;
  }

  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .pagination .currentPage {
    color: #1bb656;
    padding: 3px;
  }
</style>

<div class="pagination">
  <button on:click={previousPage} disabled={currentPage === 1}>Previous</button>
  <span class="currentPage">{currentPage}</span>
  <button on:click={nextPage} disabled={currentPage === totalPages}>Next</button>
</div>
