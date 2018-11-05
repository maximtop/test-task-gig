import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import store from '../store/PokemonsStore';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 50,
  },
  paginationInfo: {
    margin: theme.spacing.unit,
  },
  pokemonsPerPage: {
    margin: theme.spacing.unit,
  },
});


@observer
class Pagination extends Component {
  handleChangeRowsPerPage = (e) => {
    store.setPokemonsPerPage(e.target.value);
  };

  handlePrevClick = () => {
    store.handleChangePage(-1);
  };

  handleNextClick = () => {
    store.handleChangePage(1);
  };

  render() {
    const { classes } = this.props;
    const { pokemonsPerPage, getPokemonTotal, currentPage } = store;
    const currentlyVisiblePokemonsFrom = currentPage * pokemonsPerPage - (pokemonsPerPage - 1);
    const currentlyVisiblePokemonsTo = currentPage * pokemonsPerPage;
    return (
      <Grid item>
        <span className={classes.title}>Pokemons per page:</span>
        <FormControl className={classes.formControl}>
          <NativeSelect
            value={pokemonsPerPage}
            onChange={this.handleChangeRowsPerPage}
            input={<Input name="pokemons per page" id="pokemons-per-page" />}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </NativeSelect>
        </FormControl>
        <span className={classes.paginationInfo}>{currentlyVisiblePokemonsFrom} - {currentlyVisiblePokemonsTo} of { getPokemonTotal }</span>
        <IconButton className={classes.button} aria-label="Previous" onClick={this.handlePrevClick}>
          <Icon>navigate_before</Icon>
        </IconButton>
        <IconButton className={classes.button} aria-label="Next" onClick={this.handleNextClick}>
          <Icon>navigate_next</Icon>
        </IconButton>
      </Grid>
    );
  }
}

export default withStyles(styles)(Pagination);
