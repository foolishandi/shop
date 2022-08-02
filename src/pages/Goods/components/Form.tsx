import { EditOutlined } from '@ant-design/icons';
import { ProForm, ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button, message, Modal, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { updateUser, showUser } from '@/services/user';
import { addGoods } from '@/services/goods';
import Select from './Select';
import AliyunOSSUpload from '@/components/AliyunOSSUpload';
import Editor from '@/components/Editor';
import { values } from 'lodash';
const App = (props) => {
  const ref = props.refs;
  const editId = props.editId;
  const formData = props.formData;

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

  /**
   *引用表单实例，设置表单字段
   *
   * params:
   * @return
   */
  const [formObj] = ProForm.useForm();
  // formObj.setFieldValue({ key: value });
  const setCoverKey = (filekey) => formObj.setFieldsValue({ cover: filekey });
  /**
   *设置详情回调
   *
   * params:
   * @return
   */
  const setDetails = (content) => formObj.setFieldsValue({ details: content });
  /**
   * 提交good
   *
   * params:
   * @return
   */
  const handleSubmit = async (values) => {
    let res = {};
    if (editId === undefined) {
      const updata = { ...values, category_id: values.category_id[1] };
      // console.log('a', updata);
      res = await addGoods(updata);
    } else {
    }
    if (res.status === undefined) {
      setIsModalVisible(false);
      ref.current.reload();
      message.success(`操作成功`);
    }
  };
  /**
   *设置选择类型回调
   *
   * params:
   * @return
   */
  const setSelect = (content) => formObj.setFieldsValue({ category_id: content });

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<EditOutlined />}>
        添加
      </Button>
      <Modal
        footer={null}
        title="添加商品"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {!true ? (
          <Skeleton avatar paragraph={{ rows: 4 }} />
        ) : (
          <ProForm
            onFinish={(values) => {
              handleSubmit(values);
            }}
            initialValues={formData}
            form={formObj}
          >
            <ProForm.Item
              name="category_id"
              label="分类"
              rules={[{ required: true, message: '请输入分类！' }]}
            >
              <>
                <Select setSelect={setSelect} />
              </>
            </ProForm.Item>

            <ProFormText
              name="title"
              label="商品名称"
              placeholder="请输入商品名"
              rules={[{ required: true, message: '请输入商品名称！' }]}
            />
            <ProFormTextArea
              name="description"
              label="描述"
              placeholder="请输入商品描述！"
              rules={[{ required: true, message: '请输入商品描述！' }]}
            />
            <ProFormDigit
              name="price"
              label="价格"
              placeholder="请输入商品价格"
              min={0}
              max={99999}
              rules={[{ required: true, message: '请输入商品价格！' }]}
            />
            <ProFormDigit
              name="stock"
              label="库存"
              placeholder="请输入商品库存"
              min={0}
              max={99999}
              rules={[{ required: true, message: '请输入商品库存！' }]}
            />
            <ProForm.Item
              label="商品主图"
              name="cover"
              rules={[{ required: true, message: '请选择封面图片！' }]}
            >
              <>
                <AliyunOSSUpload accept="image/*" setCoverKey={setCoverKey} showUploadList={true}>
                  <Button> 点击上传</Button>
                </AliyunOSSUpload>
              </>
            </ProForm.Item>
            <ProForm.Item
              name="details"
              label="详情"
              rules={[{ required: true, message: '请输入商品详情！' }]}
            >
              <>
                <Editor setDetails={setDetails} />
              </>
            </ProForm.Item>
          </ProForm>
        )}
      </Modal>
    </>
  );
};

export default App;
