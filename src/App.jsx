import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Api from './api/Api';
import './App.css';

const api = new Api();

class App extends Component {
  async componentDidMount() {
    const { results: pokemons } = await api.getPokemons();
    const firstPokemon = pokemons[0];
    const firstPokemonData = await api.getPokemon(firstPokemon.name);
    console.log(firstPokemonData);
  }

  render() {
    return (
      <div className="App">
        <h1>Pokedex is alive</h1>
      </div>
    );
  }
}

export default hot(module)(App);
