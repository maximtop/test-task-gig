const Pokedex = require('pokeapi-js-wrapper');

export default class Api {
  options = {
    protocol: 'https',
    hostName: 'pokeapi.co',
    versionPath: '/api/v2/',
    cache: true,
    timeout: 5 * 1000,
  };

  PokedexApi = new Pokedex.Pokedex(this.options);

  getPokemons() {
    return this.PokedexApi.getPokemonsList();
  }

  getPokemon(name) {
    return this.PokedexApi.getPokemonByName(name);
  }

  getPokemonsTypes() {
    return this.PokedexApi.getTypesList();
  }
}
