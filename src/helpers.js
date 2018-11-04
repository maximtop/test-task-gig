/* eslint-disable import/prefer-default-export */
import randomColor from 'randomcolor';

export const preparePokemons = (pokemons) => {
  return pokemons.map((pokemon) => {
    const { sprites: { front_default: avatar } } = pokemon;
    return { ...pokemon, avatar };
  });
};

// eslint-disable-next-line arrow-body-style
export const preparePokemonsTypes = (pokemonsTypes) => {
  return pokemonsTypes.reduce((coloredTypes, pokemonsType) => {
    const color = randomColor({
      luminosity: 'light',
    });
    const { name } = pokemonsType;
    return { ...coloredTypes, [name]: { name, color } };
  }, {});
};


export const prepareStats = stats => stats.map((stat) => {
  const { base_stat: value, stat: { name } } = stat;
  return { value, name };
});
