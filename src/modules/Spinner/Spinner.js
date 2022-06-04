import React from 'react';
import 'antd/dist/antd.css';
import { Alert, Spin } from 'antd';

const App = () => (
  <Spin tip="Loading...">
    <Alert message="Alert message title" description="Further details about the context of this alert." type="info" />
  </Spin>
);

export default App;
