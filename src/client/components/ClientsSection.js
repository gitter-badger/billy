import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { pushPath }         from 'redux-simple-router';
import Table                from './Table';
import * as ServerActions   from '../actions/server';

class ClientsSection extends Component {
  render() {
    const { clients } = this.props;
    return (
      <Table
        columns={['id', 'name', 'options']}
        items={clients.items}
        header={{
          options: this.renderHeaderOptions.bind(this)
        }}
      />
    )
  }

  componentDidMount() {
    const { clients, dispatch } = this.props;
    if (!clients.items.length) dispatch(ServerActions.fetchClients());
  }

  renderHeaderOptions() {
    return (
      <th style={{textAlign: 'right'}}  key='options'>
        <button className='btn btn-success' onClick={this.goToNewClient.bind(this)}>
          <span className='glyphicon glyphicon-plus' ariaHidden='true'></span>
          &nbsp;New
        </button>
      </th>
    ) // TODO: remove nbsp and fix css
  }

  goToNewClient(e) {
    e.preventDefault();
    this.props.dispatch(pushPath('/clients/new'));
  }
}

function select(state) {
  return {
    clients: state.clients
  }
}

export default connect(select)(ClientsSection);
