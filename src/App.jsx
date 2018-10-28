import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PokemonCards from './Components/PokemonCards';
import Api from './api/Api';
import PokemonSearch from './Components/PokemonSearch';
import './App.css';

const api = new Api();

class App extends Component {
  state = {
    pokemons: [],
  };

  async componentDidMount() {
    const { results: pokemons } = await api.getPokemons();
    const pokemonPromises = [];
    for (let i = 0; i < 5; i += 1) {
      const pokemon = pokemons[i];
      pokemonPromises.push(api.getPokemon(pokemon.name));
    }
    const pokemonsData = await Promise.all(pokemonPromises);
    console.log(pokemonsData[0]);
    const normalizedPokemonsData = pokemonsData.map((pokemon) => {
      const {
        name, id, sprites: { front_default: avatar }, stats,
      } = pokemon;
      return {
        name, id, avatar, stats,
      };
    });
    console.log(normalizedPokemonsData[0]);
    this.setState(state => ({ ...state, pokemons: normalizedPokemonsData }));
  }

  render() {
    const { pokemons } = this.state;
    return (
      <div className="App">
        <h1>Pokemons</h1>
        <PokemonSearch />
        {pokemons.length > 0 && <PokemonCards pokemons={pokemons} />}
      </div>
    );
  }
}

export default hot(module)(App);
