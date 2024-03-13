<template>
  <div class="myCollege">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>我的</el-breadcrumb-item>
        <el-breadcrumb-item>校园认证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="collegeChoose">
      <ul>
        <li>
          <span>校园圈子</span>
          <el-select
            v-model="colleges"
            filterable
            placeholder="请选择"
            clear="select"
          >
            <el-option
              v-for="item in colleges"
              :key="item.collegeId"
              :label="item.collegeName"
              :value="item.collegeId"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          <span>上传学生证</span>
          <template v-if="selectedFile">
            <!-- 显示文件名称 -->
            <span class="file-name" @click="downloadFile">{{
              selectedFile.name
            }}</span>
          </template>
          <template v-else>
            <!-- 显示上传按钮 -->
            <i class="iconfont icon-jia file-add" @click="triggerUpload"></i>
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
        </li>
      </ul>
    </div>
    <button class="btn" @click="SaveToAuthentic">保存并认证</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colleges: [
        {
          collegeId: '',
          collegeName: ''
        }
      ],
      selectedFile: '', // 用于存储选定的文件名称
      downloadHref: null // 用于存储下载链接
    };
  },
  methods: {
    // 上传学生证
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
      this.uploadFile(file);
    },

    // 上传文件
    uploadFile(file) {
      // 实现文件上传的逻辑，可以使用XMLHttpRequest、fetch API或者axios等
      console.log('Uploading file:', file);
      // 这里只是示例，实际应用中需要将文件发送到服务器
    },
    // 下载文件
    downloadFile() {
      if (this.downloadHref) {
        this.$refs.downloadLink.click(); // 模拟点击下载链接
      }
    },

    // 保存并申请认证
    async SaveToAuthentic() {}
  }
};
</script>

<style lang="less" scoped>
.myCollege {
  height: 100%;
  margin: 50px 0 0 40px;
  width: 75%;
  .breadcrumb {
    margin: 25px 0;
  }
  .collegeChoose {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 30px 0 0;
    ul {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 40px 0;

        span {
          // width: 65px;
          text-align: left;
          font-size: 14px;
          margin-right: 30px;
        }
        .file-name {
          text-decoration: underline;
          font-style: italic;
        }

        .file-add {
          transform: scale(2.5);
          margin-left: 50px;
          padding: 10px;
          cursor: pointer;
          color: #eceef3;
          border: 1px solid #eceef3;
        }
      }
    }
  }
  .btn {
    width: 80px;
    height: 35px;
    border: none;
    background-color: #feb053;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.5s linear;
    margin: 60px 0;
  }
  .btn:hover {
    background-color: #fed19c;
  }
}
</style>