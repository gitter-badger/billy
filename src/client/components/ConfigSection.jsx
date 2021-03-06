import React, { Component } from 'react';
import { connect }          from 'react-redux';
import * as ServerActions   from '../actions/server';
import ConfigUser           from './ConfigUser';
import FormGroup            from './FormGroup';

class ConfigSection extends Component {
  render() {
    const { user, pit, vat, currency } = this.props.config;
    return (
      <div>
        <div className='page-header'>
          <h1>Config</h1>
        </div>
        <ConfigUser
          user={user}
          onUpdateKeys={this.onUpdateKeysConfig.bind(this)}
          onInputKeyPress={this.onInputKeyPress.bind(this)}
        />
        <FormGroup
          value={vat} name={'vat'}
          inputEvents={ {onKeyPress: this.onInputKeyPress.bind(this, 'vat')} }
        />
        <FormGroup
          value={pit} name={'pit'}
          inputEvents={ {onKeyPress: this.onInputKeyPress.bind(this, 'pit')} }
        />
        <FormGroup
          value={currency} name={'currency'}
          inputEvents={ {onKeyPress: this.onInputKeyPress.bind(this, 'currency')} }
        />
      </div>
    )
  }

  componentDidMount() {
    const { config, dispatch } = this.props;
    if (!Object.keys(config).length) dispatch(ServerActions.fetchConfig());
  }

  onInputKeyPress(key, e) { if (e.key === 'Enter') this.onUpdateKeyConfig(e, key) }

  onUpdateKeysConfig(configs) {
    this.props.dispatch(ServerActions.updateConfig({ configs }));
  }

  onUpdateKeyConfig(e, key) {
    e.preventDefault();
    this.props.dispatch(ServerActions.updateConfig({ configs: [{ key, value: e.target.value }]}));
  }
}

function select(state) {
  return {
    config: state.config
  }
}

export default connect(select)(ConfigSection);
