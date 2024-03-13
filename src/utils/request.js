import axios from 'axios';
import router from '@/router';
import { getCookie, setCookie, removeCookie } from './token';
import { Message } from 'element-ui';

let requests = axios.create({
  // 发请求时都带上 /api
  // baseURL:'/api'
  // 5秒之内无反应则自动请求失败
  timeout: 5000,
  baseURL: '/api'
});

// 请求拦截器: 在发送请求之前可以检测到，可以在请求发送出去之前做一些事情
// 向后端发送请求 从cookie里找token 放到header里 发送请求的时候带着 验证身份
requests.interceptors.request.use(
  (config) => {
    // 检查是否存在登录 token
    const token = getCookie();
    if (token) {
      // 将token添加到请求头中,以实现身份验证
      config.headers.Authorization = token;
      // config: 配置对象,对象里面有一个属性很重要 headers 请求头
      return config;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

// 响应拦截器: 拦截服务器响应，并在收到响应后执行一些操作
requests.interceptors.response.use(
  (res) => {
    console.log(res);
    if (res.data.status === 200) {
      setCookie(res.data.token);
    }
    // 无效token/token过期
    if (res.data.status == 401) {
      Message({
        message: '登录过期',
        type: 'warning',
        duration: 3000
      });
      // 清除cookie 清除缓存中的 userInfo 和 isLogin 跳转到 chatLogin 页面 确保输入账号密码才能再次进入 而不是修改ip就行
      removeCookie();
      console.log('router.currentRoute.path', router.currentRoute.path);
      if (router.currentRoute.path !== '/') {
        router.push('/');
      }
    }
    return res.data;
  },
  (error) => {
    // 失败的回调函数
    return Promise.reject(error);
  }
);

export default requests;
