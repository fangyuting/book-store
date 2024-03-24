<template>
  <div class="Home">
    <div class="header">
      <img
        src="../../static/img/book-trading-high-resolution-logo-transparent.png"
        alt=""
        class="logo"
      />
      <div class="operation">
        <span @click="goToAddBook">添加图书</span>
        <span @click="goToShoppingCart">购物车</span>
        <span @click="goToFavorites">收藏夹</span>
        <span>联系我们</span>
      </div>
      <div class="search">
        <el-input type="text" v-model="search"></el-input>
        <i class="iconfont icon-suosou"></i>
      </div>
      <div class="my">
        <span @click="goToSetting">我的</span>
        <span>Log out</span>
      </div>
    </div>

    <div class="main">
      <div class="sidebar">
        <p>书籍分类</p>
        <el-tree
          :data="menu"
          :props="selectedMenu"
          node-key="id"
          accordion
          highlight-current
          @node-click="handleNodeClick"
        />
      </div>
      <div class="content">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item>{{ selectedMenu }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="bookList">
          <div v-if="bookListStatu">
            <div
              v-for="(book, index) in bookLists"
              :key="index"
              class="bookItem"
              @click="bookDetails(book)"
            >
              <div>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="点击查看图书详情"
                  placement="right-end"
                >
                  <img :src="book.bookImgPath" alt="" class="bookImg" />
                </el-tooltip>
                <div class="bookInfo">
                  <div>
                    <span>书名：</span>
                    <span class="text">{{ book.bookTitle }}</span>
                  </div>
                  <div>
                    <span class="currentPrice">现价：</span>
                    <span class="text">{{ book.currentPrice }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span v-else class="noContent">该分类暂时还没有出售的图书</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import api from '../api';
export default {
  name: 'Home',
  data() {
    return {
      search: '',
      selectedMenu: '',
      menu: [
        {
          value: 'BasicSubjects',
          label: '基础学科',
          key: 1,
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
      bookLists: [],
      bookListStatu: false
    };
  },

  methods: {
    // 选择书籍目录
    handleNodeClick(data) {
      // 获取一级目录的 label
      let parentData = this.menu.find((item) =>
        item.children.some((child) => child.value === data.value)
      );
      let parentLabel = parentData ? parentData.label : data.label;
      let parentLabelValue = parentData ? parentData.value : data.value;
      let childLabel;
      let childLabelValue;
      // 只有一级目录则不修改selectedMenu
      if (parentLabel === data.label) {
        childLabel = '';
        childLabelValue = '';
      } else {
        // 获取二级目录的 label
        childLabel = data.label;
        childLabelValue = data.value;
        // 设置 selectedMenu 用于面包屑或其他 UI 更新
        this.selectedMenu = `${parentLabel} /${childLabel}`;
        const params = {
          typeLevel1: parentLabelValue,
          typeLevel2: childLabelValue
        };
        api.books.getSpecifyTypeBooks(params).then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            this.bookLists = [];
            res.data.forEach((item) => this.bookLists.push(item));
            this.bookListStatu = true;
            console.log('bookList', this.bookLists);
          } else if (res.status === 204) {
            this.bookListStatu = false;
          }
        });
      }
    },
    // 添加图书
    goToAddBook() {
      this.$router.push('AddBook');
    },
    // 购物车
    goToShoppingCart() {
      this.$router.push('/shoppingCart');
    },
    // 收藏夹
    goToFavorites() {
      this.$router.push('/Favorites');
    },
    // 设置
    goToSetting() {
      this.$router.push('/MyPage');
    },
    bookDetails(book) {
      console.log(book);
      this.$router.push({ path: '/BookDetail', query: { id: book.id } });
    }
  }
};
</script>

<style lang="less" scoped>
.Home {
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
    border-bottom: 1px solid #fed19c;
    // box-shadow: 0 0 5px #fed19c;
    color: #fff;

    .logo {
      width: 75px;
      height: 75px;
      line-height: 75px;
      margin: 0 20px;
    }
    .operation {
      display: flex;
      flex-direction: row;
      flex: 0.5;
      span {
        margin: 0 20px;
        cursor: pointer;
      }
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
  .main {
    flex: 1;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    .sidebar {
      top: 200px;
      left: 100px;
      position: fixed;
      border: 1px solid #fed19c;
      border-radius: 10px;
      box-shadow: 0 0 10px #fed19c;
      height: 450px;
      width: 200px;
      overflow: auto;
      p {
        padding: 10px 0;
        border-bottom: 1px solid #fed19c;
      }
      /deep/ .el-tree-node__content {
        transition: all 0.2s linear;
      }
      /deep/ .el-tree-node__content:hover {
        background-color: rgba(255, 209, 156, 0.5);
        border-radius: 2px;
      }

      .el-menu {
        width: 200px;
      }
      /deep/ .el-tree {
        margin: 10px;
        background-color: none;
      }
    }
    .content {
      margin: 50px 200px 0 300px;
      width: 90%;
      display: flex;
      flex-direction: column;

      .bookList {
        height: 53%;
        margin: 45px 0 10px 70px;
        overflow-y: auto;
        > div {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        .bookItem {
          display: flex;
          flex-direction: row;
          margin: 15px;
          cursor: pointer;

          > div {
            display: flex;
            flex-direction: column;
            border-radius: 5px;
            box-shadow: 0 0 8px #fed19c;
            padding: 15px;
            .bookImg {
              width: 210px;
              height: 210px;
            }
            .bookInfo {
              display: flex;
              flex-direction: column;
              > div {
                display: flex;
                flex-direction: row;
                margin-top: 10px;
                span {
                  font-weight: 600;
                  font-size: 16px;
                  padding: 5px 20px 0 0;
                  text-align: left;
                }
                .text {
                  width: 150px;
                  font-weight: normal;
                  white-space: nowrap; /* 避免文本换行 */
                  overflow: hidden; /* 避免文本溢出 */
                  text-overflow: ellipsis; /* 当文本溢出时显示省略号 */
                }
              }
            }
          }
        }
      }

      /* Webkit 浏览器滚动条样式 */
      .bookList::-webkit-scrollbar {
        width: 10px; /* 滚动条宽度 */
      }

      /* 滚动条轨道 */
      .bookList::-webkit-scrollbar-track {
        background-color: transparent; /* 滚动条轨道背景色透明 */
      }

      /* 滚动条滑块 */
      .bookList::-webkit-scrollbar-thumb {
        background-color: #dddddd; /* 滚动条滑块背景色 */
        border-radius: 5px; /* 滚动条滑块圆角 */
      }

      /* 鼠标悬停时滚动条滑块样式 */
      .bookList::-webkit-scrollbar-thumb:hover {
        background-color: #ccc; /* 滚动条滑块悬停时背景色 */
      }

      /* 隐藏滚动条上下箭头按钮 */
      .bookList::-webkit-scrollbar-button {
        display: none;
      }

      /* Firefox 浏览器滚动条样式 */
      .container {
        scrollbar-color: #ccc transparent; /* Firefox 滚动条颜色设置 */
      }
    }
  }
}
</style>