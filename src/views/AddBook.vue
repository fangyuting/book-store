<template>
  <div class="addBook">
    <div class="header">
      <img
        src="../../static/img/book-trading-high-resolution-logo-transparent.png"
        alt=""
        class="logo"
      />
      <div class="search">
        <el-input type="text" v-model="search"></el-input>
        <i class="iconfont icon-suosou"></i>
      </div>
      <div class="my">
        <span @click="goToSetting">我的</span>
        <span>Log out</span>
      </div>
    </div>
    <h2 class="title">添加你的图书商品</h2>
    <div class="main">
      <div class="content">
        <div v-if="active == 0" class="bookInfo">
          <el-form :rules="rules" ref="bookInfo" :model="bookInfo">
            <el-form-item prop="bookTitle">
              <span>书籍名称</span>
              <el-input type="text" v-model="bookInfo.bookTitle"></el-input>
            </el-form-item>
            <el-form-item prop="bookAuthor">
              <span>书籍作者</span>
              <el-input type="text" v-model="bookInfo.bookAuthor"></el-input>
            </el-form-item>
            <el-form-item prop="bookType">
              <span>书籍分类</span>
              <el-cascader
                :options="bookTypeOptions"
                clearable
                v-model="bookInfo.bookType"
              ></el-cascader>
            </el-form-item>
            <el-form-item prop="bookOriginPrice">
              <span>书籍原价</span>
              <el-input
                type="number"
                v-model="bookInfo.bookOriginPrice"
              ></el-input>
            </el-form-item>
            <el-form-item prop="bookCurrentPrice">
              <span>书籍现价</span>
              <el-input
                type="number"
                v-model="bookInfo.bookCurrentPrice"
              ></el-input>
            </el-form-item>
          </el-form>
          <!-- <button @click="next" class="btn">下一步</button> -->
        </div>
        <div v-else-if="active == 1" class="bookImg">
          <span>上传书籍图片</span>
          <template v-if="selectedFile">
            <!-- 显示文件名称 -->
            <span class="book-name" @click="downloadFile">{{
              selectedFile.name
            }}</span>
          </template>
          <template v-else>
            <!-- 显示上传按钮 -->
            <i class="iconfont icon-jia bookImg-add" @click="triggerUpload"></i>
          </template>
          <input
            type="file"
            ref="fileInput"
            v-show="false"
            @change="onFileChange"
          />
          <!-- 下载文件的链接，隐藏 -->
          <a
            ref="downloadLink"
            :href="downloadHref"
            :download="selectedFile.name"
            style="display: none"
          ></a>
        </div>
        <div v-else-if="active == 2" class="bookDesc">
          <span>书本描述信息:</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="添加你的书本描述信息"
            v-model="bookDesc"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </div>
        <div class="btnGroup">
          <button @click="back" class="btn" v-show="active !== 0">
            上一步
          </button>
          <button @click="next" class="btn" v-show="active !== 2">
            下一步
          </button>
          <button @click="uploadBookInfo" class="btn" v-show="active === 2">
            完成
          </button>
        </div>
      </div>
      <img src="../../static/img/Group.svg" alt="" class="pic" />
    </div>
  </div>
</template>

<script>
import api from '../api';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      search: '',
      active: 0,
      bookInfo: {
        bookTitle: '',
        bookAuthor: '',
        bookType: '',
        bookOriginPrice: 0.0,
        bookCurrentPrice: 0.0
      },
      rules: {
        bookTitle: [
          { required: true, message: '请填写书籍名称', trigger: 'blur' }
        ],
        bookAuthor: [
          { required: true, message: '请填写书籍作者', trigger: 'blur' }
        ],
        bookType: [
          { required: true, message: '请选择书籍类型', trigger: 'blur' }
        ],
        bookOriginPrice: [
          { required: true, message: '请填写书籍原价', trigger: 'blur' }
        ],
        bookCurrentPrice: [
          { required: true, message: '请填写书籍现价', trigger: 'blur' }
        ]
      },
      bookTypeOptions: [
        {
          value: 'BasicSubjects',
          label: '基础学科',
          children: [
            {
              value: 'math',
              label: '数学'
            },
            {
              value: 'physics',
              label: '物理'
            },
            {
              value: 'chemical',
              label: '化学'
            },
            {
              value: 'biology',
              label: '生物'
            },
            {
              value: 'english',
              label: '英语'
            },
            {
              value: 'computerBasics',
              label: '计算机基础'
            }
          ]
        },
        {
          value: 'professionalCourses',
          label: '专业课程',
          children: [
            {
              value: 'economics',
              label: '经济学'
            },
            {
              value: 'management',
              label: '管理学'
            },
            {
              value: 'jurisprudence',
              label: '法学'
            },
            {
              value: 'literature',
              label: '文学'
            },
            {
              value: 'history',
              label: '历史学'
            },
            {
              value: 'engineer',
              label: '工学'
            },
            {
              value: 'medicine',
              label: '医学'
            },
            {
              value: 'pedagogy',
              label: '教育学'
            },
            {
              value: 'psychology',
              label: '心理学'
            }
          ]
        },
        {
          value: 'examCertification',
          label: '考试认证',
          children: [
            {
              value: 'computerGradeExam',
              label: '计算机等级考试'
            },
            {
              value: 'CET',
              label: '英语四六级'
            },
            {
              value: 'IELTSTOEFL',
              label: '雅思托福'
            },
            {
              value: 'CPA',
              label: '注册会计师(CPA)'
            },
            {
              value: 'teacherCertificate',
              label: '教师资格证'
            }
          ]
        },
        {
          value: 'tool',
          label: '工具书',
          children: [
            {
              value: 'dictionary',
              label: '字典'
            },
            {
              value: 'manual',
              label: '手册'
            },
            {
              value: 'guide',
              label: '指南'
            }
          ]
        }
      ],
      selectedFile: '', // 用于存储选定的文件名称
      downloadHref: null, // 用于存储下载链接
      bookDesc: '' // 书本描述信息
    };
  },
  methods: {
    next() {
      console.log('active', this.active);
      if (this.active === 0) {
        this.$nextTick(() => {
          this.$refs.bookInfo.validate((valid) => {
            if (valid) {
              if (this.active++ > 2) this.active = 0;
            } else {
              console.log('error');
            }
          });
        });
      } else {
        if (this.active++ > 2) this.active = 0;
      }
    },
    back() {
      if (this.active-- < 0) this.active = 0;
    },
    // 设置
    goToSetting() {
      this.$router.push('/MyPage');
    },
    // 上传书籍
    triggerUpload() {
      // 触发文件上传
      this.$refs.fileInput.click();
    },
    // 处理文件选择
    onFileChange(event) {
      const file = event.target.files[0];
      console.log('file', file);
      if (!file) {
        return;
      }

      // 获取文件名和扩展名
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();

      // 允许的图片扩展名列表
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

      // 检查文件扩展名
      if (!allowedExtensions.includes(fileExtension)) {
        alert('不支持的文件类型!请选择JPG, JPEG, PNG, 或 GIF文件。');
        this.$refs.fileInput.value = ''; // 清除文件输入框的值
        return;
      }

      // 检查MIME类型
      if (!file.type.match('image.*')) {
        alert('请选择图片文件！');
        this.$refs.fileInput.value = ''; // 清除文件输入框的值
        return;
      }

      // 更新选定的文件名称
      this.selectedFile = file;
      this.downloadHref = URL.createObjectURL(file); // 创建下载链接

      // 处理文件
      console.log('File selected:', file);
      // 如果需要上传文件，可以在这里调用上传文件的函数
      // this.uploadFile(file);
    },

    // 上传文件
    uploadFile(file) {
      if (!this.selectedFile) {
        return Promise.reject(new Error('No file selected'));
      }
      var reader = new FileReader();
      // reader.readAsDataURL(this.selectedFile);
      return new Promise((resolve, reject) => {
        reader.onloadend = function () {
          var fileurl = reader.result;
          console.log(fileurl);
          // 这里有一个向后端发送的请求
          api.books
            .postimg({
              files: fileurl
            })
            .then((res) => {
              if (res.status === 200) {
                console.log('res', res);
                resolve(res.filePath);
              } else {
                reject(new Error('Upload failed'));
              }
            })
            .catch((error) => {
              reject(error);
            });
        };
        reader.readAsDataURL(this.selectedFile);
      });
    },
    // 下载文件
    downloadFile() {
      if (this.downloadHref) {
        this.$refs.downloadLink.click(); // 模拟点击下载链接
      }
    },
    // 上传书本信息
    uploadBookInfo() {
      // this.uploadFile(this.selectedFile);
      this.uploadFile(this.selectedFile)
        .then((filePath) => {
          // 上传文件成功
          console.log('uploadResult', filePath);
          // 继续上传书本信息
          const ownerId = this.$store.state.users.userInfo.id;
          this.bookInfo.bookOriginPrice = Number(this.bookInfo.bookOriginPrice);
          this.bookInfo.bookCurrentPrice = Number(
            this.bookInfo.bookCurrentPrice
          );

          const params = {
            bookDesc: this.bookDesc,
            ...this.bookInfo,
            ownerId,
            bookImgPath: filePath
          };
          // 上传书本信息
          return api.books.uploadNewBook(params);
        })
        .then((res) => {
          if (res.status === 200) {
            console.log('Book uploaded successfully');
            Message({
              type: 'success',
              message: '添加图书成功'
            });
            this.bookInfo = {
              bookTitle: '',
              bookAuthor: '',
              bookType: '',
              bookOriginPrice: 0.0,
              bookCurrentPrice: 0.0
            };
            this.selectedFile = ''; // 用于存储选定的文件名称
            this.downloadHref = null; // 用于存储下载链接
            this.bookDesc = ''; // 书本描述信息
            this.active = 0;
            this.$router.replace('/home');
          } else {
            console.error('Failed to upload book');
          }
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.addBook {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    width: 100%;
    height: 80px;
    background-color: #fed19c;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .logo {
      width: 75px;
      height: 75px;
      line-height: 75px;
      margin: 0 20px;
    }
    .search {
      position: relative;
      .el-input {
        width: 400px;
      }
      /deep/ .el-input__inner {
        padding: 0 40px;
        background: rgba(255, 255, 255, 0.5);
        color: #fff;
        border-radius: 10px;
        border: none;
      }
      /deep/ .el-input__inner:focus {
        border-color: #fff;
        border: none;
      }
      i {
        position: absolute;
        left: 10px;
        top: 12px;
        color: #fff;
      }
    }

    .my {
      width: 200px;
      margin: 0 20px 0 0;
      span {
        margin: 0 10px;
      }
    }
  }
  .title {
    margin: 50px 0 0 0;
  }
  .main {
    width: 50%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .bookInfo {
        .el-form {
          display: flex;
          flex-direction: column;
          .el-form-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 20px 0;

            span {
              display: inline-block;
              width: 70px;
              text-align: left;
              font-size: 14px;
            }
            /deep/ .el-input {
              width: 250px;
            }
            /deep/ .el-input__inner:focus {
              border-color: #fed19c;
            }
            /deep/ .el-form-item__error {
              margin-left: 70px;
            }
          }
        }
      }
      .bookImg {
        position: relative;
        left: -100px;
        top: -100px;
        display: flex;
        flex-direction: row;
        .book-name {
          text-decoration: underline;
          font-style: italic;
          margin-left: 20px;
        }

        .bookImg-add {
          transform: scale(2.5);
          margin-left: 50px;
          padding: 10px;
          cursor: pointer;
          color: #eceef3;
          border: 1px solid #eceef3;
        }
      }
      .bookDesc {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 40px;
        span {
          margin: 0 0 25px 0;
        }
      }
      /deep/ .el-textarea__inner {
        resize: none;
        width: 350px;
        height: 200px;
        max-width: 350px;
        max-height: 200px;
        min-height: 200px !important;
      }

      .btnGroup {
        display: flex;
        flex-direction: row;

        .btn {
          width: 80px;
          height: 35px;
          border: none;
          background-color: #feb053;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.5s linear;
          margin: 15px 10px;
        }
        .btn:hover {
          background-color: #fed19c;
        }
      }
    }
    .pic {
      transform: scale(1.5);
      position: fixed;
      bottom: 50px;
      left: 100px;
      z-index: -999;
    }
  }
}
</style>