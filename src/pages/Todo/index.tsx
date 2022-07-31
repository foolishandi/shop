import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Tooltip,Alert } from 'antd';
import {AppstoreAddOutlined} from '@ant-design/icons'
// import {getTodoLists} from '../../services/todo'
import { connect, useModel } from 'umi';
const statusMap=[
<Alert message={'待办'} type='info' showIcon />,
<Alert message="完成" type="success" showIcon />,
<Alert message={'取消'} type='warning' showIcon />]
const columns=[
  {
    title:'id',
    dataIndex:'id'
  },{
    title:'标题',
    dataIndex:'title'
  },{
    title:'状态',
    dataIndex:'status',
    render:(val)=> statusMap[val]
  },{
    title:'修改状态',
    render:()=>[
      <a key={0}>待办 </a>,
      <a key={1}>完成 </a>,
      <a key={2}>取消 </a>,
    ]
  },
]

// status 0 待办 1 完成 2 取消
 function index(props) {
  const [data, setdata] = useState([])
  return (
    <PageContainer>
      <ProTable
      // dataSource={data}
      request={async ()=>({data:await getTodoLists()})}
      rowKey="id"
      pagination={{
        showQuickJumper: true,
      }}
      columns={columns}
      search={false}
      dateFormatter="string"
      headerTitle="待办事项"
      toolBarRender={() => [
        <Button type="primary" key="primary">
          <AppstoreAddOutlined />新建
        </Button>,
      ]}
    />
    </PageContainer>
  )
}

export default connect(({todo})=>({
  todo
}))(index)
