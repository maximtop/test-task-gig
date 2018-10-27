import axios from 'axios';

export default class Api {
  baseUrl = 'https://pokeapi.co/api/v2';

  async makeRequest(path) {
    try {
      const response = await axios({
        url: `${this.baseUrl}/${path}/`,
        method: 'GET',
      });
      return response.data;
    } catch (e) {
      console.log(e);
      throw new Error(`${e.response.data} | ${e.response.status}`);
    }
  }

  getPokemons() {
    const path = 'pokemon';
    return this.makeRequest(path);
  }

  getPokemon(id) {
    const path = 'pokemon';
    return this.makeRequest(`${path}/${id}`);
  }
}
