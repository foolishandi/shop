import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Image, message } from 'antd';
import { useRef } from 'react';
import { getGoods, isOn, isRecommend } from '@/services/goods';
import AddFrom from './components/Form';
import Edit from './components/Edit';
export default function index() {
  const columns = [
    {
      title: '商品图片',
      hideInSearch: true,
      dataIndex: 'cover_url',
      render: (val, recond) => <Image width={50} src={recond.cover_url}></Image>,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '价格',
      hideInSearch: true,
      dataIndex: 'price',
    },
    {
      title: '库存',
      hideInSearch: true,
      dataIndex: 'stock',
    },
    {
      title: '销量',
      hideInSearch: true,
      dataIndex: 'sales',
    },
    {
      title: '是否上架',
      // hideInSearch: true,
      dataIndex: 'is_on',
      render: (val, record) => (
        <Button
          onClick={async () => {
            let res = await isOn(record.id);
            if (res === '') {
              message.success('操作成功');
              actionRef.current.reload();
            }
          }}
          style={{
            backgroundColor: `${record.is_on ? 'green' : 'red'}`,
            color: 'white',
            borderRadius: '10px',
          }}
        >
          {record.is_on ? '已上架' : '未上架'}
        </Button>
      ),
      valueType: 'radioButton',
      valueEnum: {
        1: { text: '已上架' },
        0: { text: '未上架' },
      },
    },
    {
      title: '是否推荐',
      // hideInSearch: true,
      dataIndex: 'is_recommend',
      render: (val, record) => (
        <Button
          onClick={async () => {
            let res = await isRecommend(record.id);
            if (res === '') {
              message.success('操作成功');
              actionRef.current.reload();
            }
          }}
          style={{
            backgroundColor: `${record.is_recommend ? 'green' : 'red'}`,
            color: 'white',
            width: '5em',
            borderRadius: '10px',
          }}
        >
          {record.is_recommend ? '已推荐' : '未推荐'}
        </Button>
      ),
      valueType: 'radioButton',
      valueEnum: {
        1: { text: '已推荐' },
        0: { text: '未推荐' },
      },
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

  // 获取商品数据
  const getData = async (params) => {
    let res = await getGoods(params);
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
        toolBarRender={() => [<AddFrom key={'1'} refs={actionRef} />]}
      />
    </PageContainer>
  );
}
