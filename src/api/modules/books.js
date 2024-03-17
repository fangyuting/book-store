import request from '@/utils/request'; // 引入封装的axios

export default {
  // 上传图片文件
  postimg(data) {
    return request.post(`/books/postimg`, data);
  },
  // 上传新书籍
  uploadNewBook(data) {
    return request.post(`/books/uploadNewBook`, data);
  },
  // 获取指定类型书籍
  getSpecifyTypeBooks(data) {
    const { typeLevel1, typeLevel2 } = data;
    return request.get(
      `/books/getSpecifyTypeBooks?typeLevel1=${typeLevel1}&typeLevel2=${typeLevel2}`
    );
  },
  // 获取单本书籍信息
  getSingleBookInfo(id) {
    return request.get(`/books/getSingleBookInfo?id=${id}`);
  }
};
