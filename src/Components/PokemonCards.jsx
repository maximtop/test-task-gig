import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import PokemonCard from './PokemonCard';

class PokemonCards extends Component {
  render() {
    const { pokemons } = this.props;

    return (
      <Grid container spacing={24} alignContent="center" justify="center">
        {pokemons.map(pokemon => (
          <Grid item key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

PokemonCards.propTypes = {
  pokemons: PropTypes.instanceOf(Array).isRequired,
};
export default PokemonCards;
