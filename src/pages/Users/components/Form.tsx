import { PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import React, { useState } from 'react';
import { addUser } from '@/services/user';
const App = (props) => {
  const ref = props.refs;
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
  *：添加用户
  ?：
  !：
  TODO:
  @param:
  */
  const createUser = async (values) => {
    const res = await addUser(values);
    if (res.status === undefined) {
      message.success('添加成功');
      ref.current.reload();
      setIsModalVisible(false);
    }
  };
  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined></PlusOutlined>}>
        添加
      </Button>
      <Modal
        footer={null}
        title="添加用户"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ProForm onFinish={(values) => createUser(values)}>
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
          <ProFormText.Password
            name="password"
            label="密码"
            tooltip="必须包括字母数字！"
            placeholder="请输入密码！"
            rules={[
              { required: true, message: '请输入密码！' },
              { min: 6, message: '请输入符合规则的密码,最少6位！' },
            ]}
          />
        </ProForm>
      </Modal>
    </>
  );
};

export default App;
