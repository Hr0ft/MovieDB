import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Rate } from 'antd';

import ApiService from '../ApiService';

class App extends Component {
  apiService = new ApiService();

  render() {
    const { movieid, guestSessionID, rating = 0 } = this.props;
    return (
      <Rate
        allowHalf
        defaultValue={rating}
        count="10"
        style={{ fontSize: 14 }}
        onChange={(value) => {
          this.apiService.postRateMovie(movieid, value, guestSessionID);
        }}
      />
    );
  }
}

export default App;
