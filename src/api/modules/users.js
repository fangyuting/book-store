import request from '@/utils/request'; // 引入封装的axios

export default {
  getCVCode() {
    return request.get(`/users/getCVCode`);
  },
  // 登录
  login(data) {
    console.log('data', data);
    return request.post(`/users/login`, data);
  },
  // 注册
  register(data) {
    return request.post(`/users/register`, data);
  },
  // 获取用户信息
  getUserInfo(id) {
    return request.get(`/users/getUserInfo?id=${id}`);
  },
  // 更新用户信息
  updateUserInfo(data) {
    return request.post(`/users/updateUserInfo`, data);
  }
  // // 上传图片文件
  // postimg(data) {
  //   return request.post(`/users/postimg`, data);
  // }
};
