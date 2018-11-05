import {
  observable,
  configure,
  action,
  runInAction,
  computed,
} from 'mobx';
import Api from '../api/Api';
import { preparePokemonsTypes } from '../helpers';

const api = new Api();
configure({ enforceActions: 'observed' });

class PokemonsStore {
  @observable pokemons = [];

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
      const { results: pokemonsTypes } = await api.getPokemonsTypes();
      runInAction(() => {
        this.fetchState = 'done';
        this.pokemons = pokemons;
        this.pokemonsTypes = preparePokemonsTypes(pokemonsTypes);
        this.pokemonsTotal = pokemons.length;
      });
    } catch (error) {
      runInAction(() => {
        this.fetchState = 'error';
      });
    }
  }

  @action
  async getPokemon(name) {
    const result = await api.getPokemon(name);
    runInAction(() => {
      this.pokemons = this.pokemons.map((pokemon) => {
        if (pokemon.name === result.name) {
          const avatar = result.sprites.front_default;
          return { ...pokemon, ...result, avatar };
        }
        return pokemon;
      });
    });
  }

  @computed
  get getPokemonsTypes() {
    return this.pokemonsTypes;
  }

  filterPokemons(pokemons) {
    if (this.searchKey === '') {
      return pokemons;
    }
    return pokemons.filter((pokemon) => {
      const { name } = pokemon;
      return name.indexOf(this.searchKey) > -1;
    });
  }

  @computed
  get getPokemons() {
    // TODO fix
    const filteredPokemons = this.filterPokemons(this.pokemons);
    // start
    // 10 per page & 1 page -> 0
    // 10 per page & 2 page -> 9
    const start = (this.currentPage - 1) * this.pokemonsPerPage;
    // end
    // 10 per page & 1 page -> 10
    // 10 per page & 2 page -> 19
    const end = this.currentPage * this.pokemonsPerPage;
    return filteredPokemons.slice(start, end);
  }

  @action
  setPokemonsPerPage(pokemonsPerPage) {
    this.pokemonsPerPage = pokemonsPerPage;
  }

  @action
  handleChangePage(change) {
    const futureChange = this.currentPage + change;
    if (futureChange <= 0) {
      return;
    }
    if (futureChange > Math.ceil(this.pokemonsTotal / this.pokemonsPerPage)) {
      return;
    }
    this.currentPage += change;
  }

  @computed
  get getPokemonTotal() {
    return this.pokemonsTotal;
  }
}

export default new PokemonsStore();
