import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class PokemonSearch extends Component {
  render() {
    const { classes } = this.props;
    return (
      <TextField
        id="standard-search"
        label="Search pokemons by name"
        type="search"
        className={classes.textField}
        margin="normal"
      />
    );
  }
}

PokemonSearch.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(PokemonSearch);
