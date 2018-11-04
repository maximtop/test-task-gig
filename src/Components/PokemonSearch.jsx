import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import store from '../store/PokemonsStore';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

@observer
class PokemonSearch extends Component {
  handleSearch = (e) => {
    // TODO may be it would be useful to use throttle here
    store.updateSearch(e.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <TextField
        id="standard-search"
        label="Search pokemons by name"
        type="search"
        className={classes.textField}
        margin="normal"
        onChange={this.handleSearch}
      />
    );
  }
}

PokemonSearch.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(PokemonSearch);
