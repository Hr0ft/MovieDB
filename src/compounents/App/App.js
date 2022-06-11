import React, { Component } from 'react';

import AppTabs from '../AppTabs';
import ApiService from '../ApiService';

class App extends Component {
  ApiService = new ApiService();
  state = {
    term: 'return',
    guestSessionID: null,
  };

  componentDidMount() {
    this.getGuestSessionId();
  }

  getGuestSessionId() {
    this.ApiService.getSessioID()
      .then((data) => {
        this.setState({
          guestSessionID: data.guest_session_id,
        });
      })
      .catch(this.onError);
  }

  changeSearch = (e) => {
    e.preventDefault;
    this.setState({
      term: e.target.value,
    });
  };

  render() {
    const { term } = this.state;
    return <AppTabs changeSearch={this.changeSearch} term={term} guestSessionID={this.state.guestSessionID} />;
  }
}

export default App;
