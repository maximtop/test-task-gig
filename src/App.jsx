import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { observer } from 'mobx-react';
import store from './store/PokemonsStore';
import PokemonCards from './Components/PokemonCards';
import PokemonSearch from './Components/PokemonSearch';
import './App.css';

@observer
class App extends Component {
  async componentDidMount() {
    await store.fetchPokemons();
  }

  render() {
    const pokemons = store.getPokemons;
    return (
      <div className="App">
        <h1>Pokemons</h1>
        <PokemonSearch />
        {pokemons && pokemons.length > 0 && <PokemonCards pokemons={pokemons} />}
      </div>
    );
  }
}

export default hot(module)(App);
