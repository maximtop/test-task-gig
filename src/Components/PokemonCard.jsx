import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

const styles = {
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
};

function PokemonCard(props) {
  const { classes, pokemon } = props;

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
        <Typography component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

PokemonCard.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  pokemon: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(PokemonCard);
