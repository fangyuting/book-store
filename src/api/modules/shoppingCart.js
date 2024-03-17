import request from '@/utils/request'; // 引入封装的axios

export default {
  // 加入购物车
  addToShoppingCart(data) {
    return request.post(`/shoppingCart/addToShoppingCart`, data);
  },

  // 获取购物车
  getMyShoppingCart(id) {
    return request.get(`/shoppingCart/getMyShoppingCart?owner=${id}`);
  }
};
