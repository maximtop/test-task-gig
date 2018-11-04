import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import store from '../store/PokemonsStore';
import { prepareStats } from '../helpers';

const styles = theme => ({
  card: {
    maxWidth: 370,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  bigAvatar: {
    width: 100,
    height: 100,
  },
  header: {
    textTransform: 'capitalize',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const renderStatsTable = (stats, classes) => {
  const preparedStats = prepareStats(stats);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Stat name</TableCell>
          <TableCell numeric>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {preparedStats.map(stat => (
          <TableRow className={classes.tableRow} key={stat.name}>
            <TableCell component="th" scope="row">
              {stat.name}
            </TableCell>
            <TableCell numeric>{stat.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const renderTypes = (types) => {
  const pokemonsTypes = store.getPokemonsTypes;
  return (
    <div>
      {types.map((type) => {
        const { type: { name } } = type;
        const { color } = pokemonsTypes[name];
        return <Chip key={name} style={{ backgroundColor: color }} label={name} />;
      })}
    </div>
  );
};

@observer
class PokemonCard extends Component {
  render() {
    const { classes, pokemon } = this.props;
    const { stats, types } = pokemon;
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          avatar={(
            <Avatar
              alt={pokemon.name}
              src={pokemon.avatar}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
        )}
          title={(
            <Typography variant="h4" className={classes.header}>
              {pokemon.name}
            </Typography>
        )}
        />

        <CardContent>
          {renderTypes(types)}
          {renderStatsTable(stats, classes)}
        </CardContent>
      </Card>
    );
  }
}

PokemonCard.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  pokemon: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(PokemonCard);
