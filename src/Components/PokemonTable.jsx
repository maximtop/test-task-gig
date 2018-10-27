import React, { Component } from 'react';
import ReactTable from 'react-table';

class PokemonTable extends Component {
  render() {
    const { pokemons } = this.props;
    const columns = [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Avatar',
        accessor: 'avatar',
        Cell: props => <img src={props.value} />,
      },
      {
        Header: 'Name',
        accessor: 'name',
      },

    ];

    return (
      <ReactTable
        data={pokemons}
        columns={columns}
      />
    );
  }
}

export default PokemonTable;
