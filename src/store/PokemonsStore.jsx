import {
  observable,
  configure,
  action,
  runInAction,
  computed,
} from 'mobx';
import Api from '../api/Api';
import { preparePokemons, preparePokemonsTypes } from '../helpers';

const api = new Api();
configure({ enforceActions: 'observed' });

class PokemonsStore {
  @observable pokemons = [];

  @observable pokemonsData = {};

  @observable fetchState = 'pending'; // pending, done, error

  @observable pokemonsTypes = [];

  @observable searchKey = '';

  @observable pokemonsPerPage = 10;

  @observable currentPage = 1;

  @observable pokemonsTotal = null;

  @action
  updateSearch(searchKey) {
    this.searchKey = searchKey.trim().toLowerCase();
  }

  @action
  async fetchPokemons() {
    this.pokemons = [];
    this.fetchState = 'pending';
    try {
      const { results: pokemons } = await api.getPokemons();
      if (this.pokemonsTotal === null) {
        runInAction(() => {
          this.pokemonsTotal = pokemons.length;
        });
      }
      const pokemonsDataPromises = [];
      for (let i = ((this.currentPage - 1) * this.pokemonsPerPage);
        i < (this.currentPage * this.pokemonsPerPage);
        i += 1) {
        const pokemon = pokemons[i];
        this.pokemonsData[pokemon.name] = pokemon;
        pokemonsDataPromises.push(api.getPokemon(pokemon.name));
      }
      const pokemonsData = await Promise.all(pokemonsDataPromises);
      const { results: pokemonsTypes } = await api.getPokemonsTypes();
      runInAction(() => {
        this.fetchState = 'done';
        this.pokemons = preparePokemons(pokemonsData);
        this.pokemonsTypes = preparePokemonsTypes(pokemonsTypes);
      });
    } catch (error) {
      runInAction(() => {
        this.fetchState = 'error';
      });
    }
  }

  @action
  async fetchPokemonData(name) {

  }

  @action
  async getPokemonData(name) {
    const pokemon = this.pokemonsData[name];
    if (!pokemon.data) {
      const { results: pokemonData } = await api.getPokemon(pokemon.name);
      this.pokemonsData[name] = { ...pokemon, pokemonData };
    }
    return this.pokemonsData[name];
  }

  @computed
  get getPokemonsTypes() {
    return this.pokemonsTypes;
  }

  @computed
  get getPokemons() {
    if (this.searchKey === '') {
      return this.pokemons;
    }
    return this.pokemons.filter((pokemon) => {
      const { name } = pokemon;
      return name.indexOf(this.searchKey) > -1;
    });
  }

  @action
  async setPokemonsPerPage(pokemonsPerPage) {
    this.pokemonsPerPage = pokemonsPerPage;
    await this.fetchPokemons();
  }

  @action
  async handleChangePage(change) {
    const futureChange = this.currentPage + change;
    if (futureChange <= 0) {
      return;
    }
    if (futureChange >= this.pokemonsTotal / this.pokemonsPerPage) {
      return;
    }
    this.currentPage += change;
    await this.fetchPokemons();
  }

  @computed
  get getPokemonTotal() {
    return this.pokemonsTotal;
  }
}

export default new PokemonsStore();
