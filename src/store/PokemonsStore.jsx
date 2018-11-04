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

  @observable fetchState = 'pending'; // pending, done, error

  @observable pokemonsTypes = [];

  @observable searchKey = '';

  @observable showOnPage = 10;

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
      const pokemonsDataPromises = [];
      for (let i = 0; i < this.showOnPage; i += 1) {
        const pokemon = pokemons[i];
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
}

export default new PokemonsStore();
