import request from 'umi-request';
import { message } from 'antd';

// 请求拦截器
request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('token') || '';
  //   console.log('拦截器', token);
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: { Authorization: `Bearer ${token}` } },
  };
});
// 响应拦截器
request.interceptors.response.use((reponse) => {
  if (reponse.status >= 400) {
    const codeMaps = {
      502: '网关错误',
      503: '服务不可用，维护中···',
      504: '网关超时',
      404: '未找到',
      400: '暂无权限操作！',
      422: '邮箱已注册，请更换新的邮箱！',
    };
    message.error(codeMaps[reponse.status]);
  }

  return reponse;
});

export default request;
