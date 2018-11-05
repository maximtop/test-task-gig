import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
    store.updateSearch(e.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid item>
        <TextField
          id="standard-search"
          label="Search pokemons by name"
          type="search"
          className={classes.textField}
          margin="normal"
          onChange={this.handleSearch}
        />
      </Grid>
    );
  }
}

PokemonSearch.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(PokemonSearch);
