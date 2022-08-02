import { EditOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, message, Modal, Skeleton } from 'antd';
import React, { useState } from 'react';
import { updateUser } from '@/services/user';
const App = (props) => {
  const ref = props.refs;
  const editId = props.editId;
  const formData = props.formData;
  // console.log('aBB', props);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /*
  *：修改用户信息
  ?：
  !：
  TODO:
  @param:
  */
  const editUser = async (editId, values) => {
    const res = await updateUser(editId, values);
    if (res.status === undefined) {
      message.success('添加成功');
      ref.current.reload();
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<EditOutlined />}>
        编辑
      </Button>
      <Modal
        footer={null}
        title="添加用户"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {!formData ? (
          <Skeleton avatar paragraph={{ rows: 4 }} />
        ) : (
          <ProForm onFinish={(values) => editUser(editId, values)} initialValues={formData}>
            <ProFormText
              name="name"
              label="昵称"
              tooltip="最长为10位"
              placeholder="请输入昵称！"
              rules={[{ required: true, message: '请输入中文字符！' }]}
            />
            <ProFormText
              name="email"
              label="邮箱"
              tooltip="xxx@a.com"
              placeholder="请输入电子邮箱地址！"
              rules={[
                { required: true, message: '请输入邮箱！' },
                { type: 'email', message: '请输入正确的邮箱！' },
              ]}
            />
          </ProForm>
        )}
      </Modal>
    </>
  );
};

export default App;
