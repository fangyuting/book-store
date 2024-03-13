import request from '@/utils/request'; // 引入封装的axios

export default {
  // 上传图片文件
  postimg(data) {
    return request.post(`/books/postimg`, data);
  },
  // 上传新书籍
  uploadNewBook(data) {
    return request.post(`/books/uploadNewBook`, data);
  }
};
