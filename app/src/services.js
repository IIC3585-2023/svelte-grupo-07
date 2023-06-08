import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

/**
 * @param {string} page
 */
export async function getAllCharacters(page) {
  try {
    const res = await axios.get(
      `${apiUrl}/character?page=${page}`
    );
    const characters = res.data.results
    return characters
  } catch (error) {
    console.log(error)
  }
}

/**
 * @param {string} character_id
 * @param {string} url
 */
export async function getCharacterById(character_id, url = '') {
  const correctUrl = url != ''? url: `${apiUrl}/character/${character_id}`
  try {
    const res = await axios.get(
      correctUrl
    );
    const character = res.data
    return character
  } catch (error) {
    console.log(error)
  }
}

/**
 * @param {string} page
 */
export async function getAllEpisodes(page) {
  try {
    const res = await axios.get(
      `${apiUrl}/episode?page=${page}`
    );
    const episodes = res.data.results
    const episodesArray = Object.values(episodes);
    for(let episode of episodesArray){
      const characters = []
      for(let characterUrl of episode.characters){
        const character = await getCharacterById('', characterUrl)
        characters.push({id: character.id, name:character.name, image: character.image })
      }
      episode.characters = characters
    }
    return episodesArray
  } catch (error) {
    console.log(error)
  }
}

/**
 * @param {string} page
 */
export async function getAllLocations(page) {
  try {
    const res = await axios.get(
      `${apiUrl}/location?page=${page}`
    );
    const locations = res.data.results
    const loacationsArray = Object.values(locations);
    for(let location of loacationsArray){
      const residents = []
      for(let residentUrl of location.residents){
        const resident = await getCharacterById('', residentUrl)
        residents.push({id: resident.id, name:resident.name, image: resident.image })
      }
      location.characters = residents
    }
    return loacationsArray
  } catch (error) {
    console.log(error)
  }
}
