import { ossConfig } from '@/services/common';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, message, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

const AliyunOSSUpload = ({
  value,
  onChange,
  children,
  accept,
  setCoverKey,
  showUploadList,
  insertImg,
}) => {
  const [OSSData, setOSSData] = useState(); // Mock get OSS api

  // 获取oss上传签名
  const init = async () => {
    try {
      const result = await ossConfig();
      setOSSData(result);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = ({ file }) => {
    console.log(file);
    if (file.status === 'done') {
      // 上传之后，把文件的key，设置为表单某个字段

      // 回调函数设置字段key
      if (setCoverKey) setCoverKey(file.key);
      if (insertImg) insertImg(file.url);
      message.success('上传成功!');
    }
    // onChange?.([...fileList]);
    onChange?.([file]);
  };

  const onRemove = (file) => {
    const files = (value || []).filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  /**
   *额外的上传参数
   *
   * params:
   * @return
   */
  const getExtraData = (file) => ({
    key: file.key,
    OSSAccessKeyId: OSSData?.accessid,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });
  /**
   *选择文件，上传之前回调
   *
   * params:
   * @return
   */
  const beforeUpload = async (file) => {
    if (!OSSData) return false;
    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await init();
    }

    /**
     *指定上传目录，url
     *
     * params:
     * @return
     */
    // 定义上传目录
    const dir = 'react/';
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    // 上传名称
    const filename = Date.now() + suffix; // @ts-ignore
    // 上传地址
    file.key = OSSData.dir + dir + filename; // @ts-ignore
    // 上传之后用于显示内容
    file.url = OSSData.host + OSSData.dir + dir + filename;
    return file;
  };

  const uploadProps = {
    accept: accept || '',
    name: 'file',
    fileList: value,
    action: OSSData?.host,
    onChange: handleChange,
    onRemove,
    data: getExtraData,
    beforeUpload,
    listType: 'picture',
    maxCount: 1,
    showUploadList: showUploadList,
  };
  return <Upload {...uploadProps}>{children}</Upload>;
};

export default AliyunOSSUpload;
