import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PokemonTable from './Components/PokemonTable';
import 'react-table/react-table.css';
import Api from './api/Api';
import './App.css';

const api = new Api();

class App extends Component {
  state = {
    pokemons: [],
  };

  async componentDidMount() {
    const { results: pokemons } = await api.getPokemons();
    const pokemonPromises = [];
    for (let i = 0; i < 3; i += 1) {
      const pokemon = pokemons[i];
      pokemonPromises.push(api.getPokemon(pokemon.name));
    }
    const pokemonsData = await Promise.all(pokemonPromises);
    const normalizedPokemonsData = pokemonsData.map((pokemon) => {
      const { name, id, sprites: { front_default: avatar } } = pokemon;
      return { name, id, avatar };
    });
    this.setState(state => ({ ...state, pokemons: normalizedPokemonsData }));
  }

  render() {
    const { pokemons } = this.state;
    return (
      <div className="App">
        <h1>Pokemon table</h1>
        {pokemons.length > 0 && <PokemonTable pokemons={pokemons} />}
      </div>
    );
  }
}

export default hot(module)(App);
