import { EllipsisOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Avatar, Badge, Button, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { getUsers, getLocekd } from '@/services/user';
import { history } from 'umi';
import AddFrom from './components/Form';
import Edit from './components/Edit';
const menu = [];
export default function index() {
  const columns = [
    {
      title: '头像',
      hideInSearch: true,
      dataIndex: 'avatar_url',
      render: (val) => (
        <Avatar size={64} icon={<UserOutlined></UserOutlined>} src={val.avatar_url}></Avatar>
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '是否禁用',
      hideInSearch: true,
      dataIndex: 'is_locked',
      render: (val, record) => (
        <Button
          onClick={async () => {
            let res = await getLocekd(record.id);
            if (res === '') {
              actionRef.current.reload();
            }
          }}
          style={{ backgroundColor: `${val ? 'green' : 'red'}`, color: 'white' }}
        >
          {val ? '启用' : '禁用'}
        </Button>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      hideInSearch: true,
      title: '操作',
      render: (_, recond) => <Edit editId={recond.id} refs={actionRef} formData={recond}></Edit>,
    },
  ];

  // 自定义操作表格
  const actionRef = useRef();
  const getData = async (params) => {
    let res = await getUsers(params);
    return {
      data: res.data,
      success: true,
      total: res.meta.pagination.total,
    };
  };
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={(params) => getData(params)}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [<AddFrom key={'1'} refs={actionRef}></AddFrom>]}
      />
    </PageContainer>
  );
}
