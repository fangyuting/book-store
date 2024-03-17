<template>
  <div class="shoppingCart">
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
    <div class="orderList">
      <div v-if="flag === true" class="cart">
        <div
          v-for="(item, index) in shoppingCartList"
          :key="index"
          class="list"
          @click="goToBookDetail(item)"
        >
          <img :src="item.bookInfo.bookImgPath" alt="" class="bookImg" />
          <div class="content">
            <span class="title">{{ item.bookInfo.bookTitle }}</span>
            <div class="tag">
              <el-tag type="success">{{ item.bookInfo.typeLevel1 }}</el-tag>
              <el-tag type="warning">{{ item.bookInfo.typeLevel2 }}</el-tag>
            </div>
            <span class="price">￥{{ item.bookInfo.currentPrice }}</span>
            <div class="status">
              <el-button class="purchasing" v-if="item.bookInfo.status === 0">
                代售
              </el-button>
              <el-button type="success" v-if="item.bookInfo.status === 1">
                已售出
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="noContent">
        <span>暂无收藏记录</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      shoppingCartList: [],
      search: '',
      flag: false
    };
  },
  activated() {
    this.getMyShoppingCart();
  },
  methods: {
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
    // 获取购物车
    getMyShoppingCart() {
      const id = this.$store.state.users.userInfo.id;
      api.shoppingCart.getMyShoppingCart(id).then((res) => {
        if (res.status === 200) {
          this.shoppingCartList = [];
          res.data.forEach((item) => this.shoppingCartList.push(item));
          console.log(this.shoppingCartList);
          this.flag = true;
        } else if (res.status === 201) {
          this.shoppingCartList = [];
          this.flag = false;
          Message({
            type: 'warning',
            message: '暂时还没有需要购买的书籍'
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.shoppingCart {
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
  .orderList {
    margin: 55px auto;
    height: 80%;
    width: 95%;
    border-radius: 10px;
    box-shadow: 0 0 10px #fed19c;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 30px 0;
    .cart {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      height: 100%;
      overflow-y: auto;
      /* 自定义滚动条样式 */
      scrollbar-width: thin; /* 指定滚动条宽度 */
    }
    /* Webkit 浏览器滚动条样式 */
    .cart::-webkit-scrollbar {
      width: 10px; /* 滚动条宽度 */
    }

    /* 滚动条轨道 */
    .cart::-webkit-scrollbar-track {
      background-color: transparent; /* 滚动条轨道背景色透明 */
    }

    /* 滚动条滑块 */
    .cart::-webkit-scrollbar-thumb {
      background-color: #dddddd; /* 滚动条滑块背景色 */
      border-radius: 5px; /* 滚动条滑块圆角 */
    }

    /* 鼠标悬停时滚动条滑块样式 */
    .cart::-webkit-scrollbar-thumb:hover {
      background-color: #ccc; /* 滚动条滑块悬停时背景色 */
    }

    /* 隐藏滚动条上下箭头按钮 */
    .cart::-webkit-scrollbar-button {
      display: none;
    }

    /* Firefox 浏览器滚动条样式 */
    .cart {
      scrollbar-color: #ccc transparent; /* Firefox 滚动条颜色设置 */
    }

    .list {
      display: flex;
      flex-direction: row;
      width: 90%;
      margin: 25px 25px;
      transition: all 0.2s linear;
      cursor: pointer;
      border-radius: 5px;
      padding: 8px 0;

      .bookImg {
        width: 200px;
        height: 200px;
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 10px;
        .title {
          font-size: 18px;
          font-weight: 600;
        }
        .tag {
          margin: 15px 0;
          .el-tag {
            margin-right: 15px;
          }
        }
        .price {
          font-size: 22px;
          font-weight: 700;
        }
        .status {
          margin-top: 30px;
          .purchasing {
            background-color: #fed19c;
            color: #fff;
            border: none;
          }
          .el-button,
          button {
            padding: 8px 13px;
          }
        }
      }
    }
    .noContent {
      font-weight: 800;
      font-size: 26px;
    }
  }
}
</style>