import React from 'react';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

const App = (props) => {
  const { total, nextPage } = props;
  return (
    <Pagination
      size="small"
      total={total}
      defaultPageSize="20"
      onChange={(page) => {
        nextPage(page);
      }}
    />
  );
};

export default App;
