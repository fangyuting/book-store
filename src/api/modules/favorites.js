import request from '@/utils/request'; // 引入封装的axios

export default {
  // 加入收藏夹
  addToFavorites(data) {
    return request.post(`/favorites/addToFavorites`, data);
  },
  // 获取收藏夹
  getMyFavorites(id) {
    return request.get(`/favorites/getMyFavorites?favoritesOwner=${id}`);
  }
};
