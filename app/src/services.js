import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * @param {string} page
 */
export async function getAllCharacters(page) {
	try {
		const res = await axios.get(`${apiUrl}/character?page=${page}`);
		const characters = res.data.results;
		return characters;
	} catch (error) {
		console.log(error);
	}
}

/**
 * @param {string} character_id
 * @param {string} url
 */
export async function getCharacterById(character_id, url = "") {
	const correctUrl = url != "" ? url : `${apiUrl}/character/${character_id}`;
	try {
		const res = await axios.get(correctUrl);
		const character = res.data;
		return character;
	} catch (error) {
		console.log(error);
	}
}

/**
 * @param {string} page
 */
export async function getAllEpisodes(page) {
	try {
		const res = await axios.get(`${apiUrl}/episode?page=${page}`);
		const episodes = res.data.results;
		return episodes;
	} catch (error) {
		console.log(error);
	}
}

/**
 * @param {string} page
 */
export async function getAllLocations(page) {
	try {
		const res = await axios.get(`${apiUrl}/location?page=${page}`);
		const locations = res.data.results;
		return locations;
	} catch (error) {
		console.log(error);
	}
}

/**
 * @param {any} characters
 */
export async function getCharactersByIds(characters) {
	try {
		const charactersObject = [];
		for (let characterUrl of characters) {
			const character = await getCharacterById("", characterUrl);
			charactersObject.push({
				id: character.id,
				name: character.name,
				image: character.image,
			});
		}
		console.log(charactersObject);
		return charactersObject;
	} catch (error) {
		console.log(error);
	}
}

// Find a episode that contains all the characters of characterFilter and the locations of locationFilter
export async function getFirstEpisode(characterFilter, locationFilter) {
	console.log(characterFilter, locationFilter);
	if (characterFilter.length === 0 && locationFilter.length === 0) {
		const episodes = await getAllEpisodes(1);
		console.log(episodes);
		return episodes[0];
	}
	let episode = "";
	let found = false;
	let page = 1;
	while (!found) {
		const episodes = await getAllEpisodes(page);
		for (let episode of episodes) {
			const characters = await getCharactersByIds(episode.characters);
			console.log(characters);
			const locations = locationFilter;
			let characterFound = true;
			let locationFound = true;
			for (let character of characterFilter) {
				if (!characters.find((char) => char.name === character.name)) {
					characterFound = false;
				}
			}
			for (let location of locationFilter) {
				if (!locations.find((loc) => loc.name === location.name)) {
					locationFound = false;
				}
			}
			if (characterFound && locationFound) {
				return episode;
			}
		}
		console.log(page);
		page++;
	}
}
