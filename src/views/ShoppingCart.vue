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
        >
          <img :src="item.bookInfo.bookImgPath" alt="" class="bookImg" />
          <div class="content">
            <div class="left">
              <span class="title">{{ item.bookInfo.bookTitle }}</span>
              <div class="tag">
                <el-tag type="success">{{ item.bookInfo.typeLevel1 }}</el-tag>
                <el-tag type="warning">{{ item.bookInfo.typeLevel2 }}</el-tag>
              </div>
            </div>
            <div class="right">
              <span class="price">￥{{ item.bookInfo.currentPrice }}</span>
              <div class="status">
                <el-button
                  class="purchasing"
                  v-if="item.bookInfo.status === 0"
                  @click="placeOrder(item)"
                >
                  购买
                </el-button>
                <el-button
                  type="info"
                  v-if="item.bookInfo.status === 1"
                  disabled
                >
                  已售出
                </el-button>
              </div>
            </div>
          </div>
          <i
            class="icon-quxiao iconfont deleteBtn"
            @click="deleteBook(item)"
          ></i>
        </div>
      </div>
      <div v-if="flag === true" class="placeAllOrder">
        <hr class="hr" />
        <div class="sum">
          <span>总计:</span>
          <span class="price">{{ this.sum }}</span>
        </div>
        <el-button class="placeAllOrderBtn" @click="placeAllOrderBtn"
          >一键下单全部书籍</el-button
        >
      </div>
      <div v-else class="noContent">
        <span>暂无购买记录</span>
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
      flag: false,
      sum: 0
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
    async getMyShoppingCart() {
      const id = this.$store.state.users.userInfo.id;
      await api.shoppingCart.getMyShoppingCart(id).then((res) => {
        if (res.status === 200) {
          this.shoppingCartList = [];
          this.sum = 0;
          res.data.forEach((item) => {
            this.shoppingCartList.push(item);
            this.sum += item.bookInfo.currentPrice;
          });
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
    },
    // 删除购物车书籍
    async deleteBook(item) {
      const params = {
        id: item.id,
        owner: item.owner,
        shopBook: item.shopBook
      };
      await api.shoppingCart.deleteShoppingCartBook(params).then((res) => {
        console.log(res);
        if (res.status === 200) {
          Message({
            type: 'success',
            message: '删除成功'
          });
          this.getMyShoppingCart();
        }
      });
    },
    // 购买单本书籍
    async placeOrder(item) {
      console.log(item);
    },
    // 一键购买所有书籍
    async placeAllOrderBtn() {}
  }
};
</script>

<style lang="less" scoped>
.shoppingCart {
  height: 100vh;
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
    flex-direction: column;
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
      justify-content: center;
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
      width: 92%;
      height: 220px;
      margin: 25px 25px;
      transition: all 0.2s linear;
      cursor: pointer;
      border-radius: 5px;
      padding: 8px 10px 8px 0;

      .bookImg {
        width: 200px;
        height: 200px;
      }
      .content {
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-around;
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
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-end;
          .price {
            font-size: 22px;
            font-weight: 700;
          }
          .status {
            margin-top: 30px;
            .purchasing {
              background-color: #fed19c;
              color: #fff;
              width: 77px;
              height: 35px;
              border: none;
            }
            .el-button,
            button {
              padding: 8px 13px;
            }
          }
        }
      }
      .deleteBtn {
        font-size: 38px;
        position: relative;
        right: -10px;
        top: -10px;
        height: 38px;
        color: #fff;
        background: #fed19c;
        border-radius: 5px 10px;
      }
    }
    .list:hover {
      box-shadow: 0 0 5px #fed19c;
    }
    .placeAllOrder {
      width: 90%;
      margin: 0px auto;
      .hr {
        border: 1px solid rgba(254, 209, 156, 0.5);
      }
      .sum {
        line-height: 38px;
        margin-top: 10px;
        float: left;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .price {
          font-size: 26px;
          font-weight: 500;
          padding: 0 10px;
        }
      }
      .placeAllOrderBtn {
        margin-top: 10px;
        float: right;
      }
      .placeAllOrderBtn:hover {
        border: 1px solid #fed19c;
        background-color: rgba(254, 209, 156, 0.3);
        color: #fed19c;
      }
    }
    .noContent {
      font-weight: 800;
      font-size: 26px;
    }
  }
}
</style>