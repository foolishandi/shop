import { fetchDashBoard } from '@/services/dashboard';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
const App = () => {
  const [data, setdata] = useState();
  useEffect(async () => {
    let res = await fetchDashBoard();
    setdata(res);
  }, []);

  return (
    <>
      <Card title="用户数" bordered={true} hoverable style={{ color: 'red' }}>
        {data?.users_count ?? 0}
      </Card>
      <Card title="商品数" bordered={true} hoverable style={{ color: 'green' }}>
        {data?.goods_count ?? 0}
      </Card>
      <Card title="订单数" bordered={true} hoverable style={{ color: 'blue' }}>
        {data?.order_count ?? 0}
      </Card>
    </>
  );
};

export default App;
