import React from 'react';
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
import classNames from 'classnames';

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

const prepareStats = stats => stats.map((stat) => {
  const { base_stat: value, stat: { name } } = stat;
  return { value, name };
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

function PokemonCard(props) {
  const { classes, pokemon } = props;
  const { stats } = pokemon;


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
        {renderStatsTable(stats, classes)}
      </CardContent>
    </Card>
  );
}

PokemonCard.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  pokemon: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(PokemonCard);
