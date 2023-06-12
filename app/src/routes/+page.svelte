<script>
  import { navigate } from "svelte-routing";
  import ram_wallpaper from '$lib/images/ram_wallpaper.jpg';
  import rickImage from '$lib/images/rick.png';
  import mortyImage from '$lib/images/morty.png';
  import episodesImage from '$lib/images/episodes.jpg';
  import charactersImage from '$lib/images/characters.jpg';
  import locationsImage from '$lib/images/locations.jpg';

</script>

<style>
  .landing_container {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding-bottom: 6rem;
  }

  .landing_container > img {
    width: 100%;
    object-fit: cover;
  }


  .home_section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;
  }

  .home_section > div {
    width: 100%;
    max-width: 25rem;
  }

  .home_section > div > h2 {
    font-size: 2.25rem;
    font-weight: 800;
    margin: 0;
  }

  .home_section > div > h3 {
    font-size: 1.5rem;
    font-weight: 500;
    padding: 0 2rem;
    margin: 0;
  }

  .home_section > img {
    width: 80%;
    max-width: 20rem;
    height: auto;
    margin-top: 1rem;
  }

  .category_section {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin: 0 2rem;
  }

  .category_item {
    text-align: center;
  }

  .category_item img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 1rem;
  }

  .category_item h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
  }

  .category_item p {
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    .landing_container {
      gap: 8rem;
    }

    .landing_container > img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
  }

    .home_section {
      flex-direction: row;
      justify-content: space-around;
    }

    .home_section > div {
      width: 50%;
    }

    .home_section > div > h2 {
      font-size: 3rem;
    }

    .home_section > div > h3 {
      font-size: 1.8rem;
      padding: 0 4rem;
    }

    .home_section > img {
      margin-top: 0;
    }

    .category_section {
      flex-direction: row;
    }

    .category_item {
      flex: 1;
      cursor: pointer;
    }
  }
</style>

<div class="landing_container">
  <img src={ram_wallpaper} alt="Rick and morty wallpaper" />
  <div class="home_section">
    <div>
      <h2>Bienvenido a</h2>
      <h2>Wubba Lubba Dub Hub</h2>
      <h3>El mejor lugar para todos los fanáticos de Rick and Morty</h3>
    </div>
    <img src={rickImage} alt="Rick Sanchez" />
  </div>
  <div class="home_section">
    <img src={mortyImage} alt="Rick Sanchez" />
    <div>
      <h2>Wiki y Motor</h2>
      <h3>
        Puedes encontrar toda la información de todos los personajes,
        capitulos y lugares. Además puedes usar nuestro motor de busqueda que
        te dará el mejor capitulo de Rick and Morty según las preferencias que
        tengas.
      </h3>
    </div>
  </div>

  <div class="category_section">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="category_item" on:click={() => navigate('/characters')}>
      <img src={episodesImage} alt="Characters" />
      <h2>Personajes</h2>
      <p>Descubre más sobre los personajes de Rick and Morty.</p>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="category_item" on:click={() => navigate('/locations')}>
      <img src={charactersImage} alt="Locations" />
      <h2>Localizaciones</h2>
      <p>Explora los diferentes lugares en el universo de Rick and Morty.</p>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="category_item" on:click={() => navigate('/episodes')}>
      <img src={locationsImage} alt="Episodes" />
      <h2>Episodios</h2>
      <p>Revive tus episodios favoritos y descubre nuevos.</p>
    </div>
  </div>
</div>
