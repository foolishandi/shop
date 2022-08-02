import { Cascader } from 'antd';
import React, { useEffect, useState } from 'react';
import request from '@/pages/utils/request';
import { getCategory } from '@/services/category';

const App = (props) => {
  // console.log(props.data0);
  const onChange = (value) => {
    props.setSelect(value);
  };

  const [options2, setoption] = useState();

  async function getData() {
    const res = await getCategory();
    if (res.status === undefined) setoption(res);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Cascader
      fieldNames={{ label: 'name', value: 'id' }}
      options={options2}
      onChange={onChange}
      defaultValue={props.data0 ? [props.data0?.pid, props.data0?.id] : [props.data0?.id]}
      placeholder="Please select"
    />
  );
};

export default App;
