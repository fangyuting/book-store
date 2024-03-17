<template>
  <div class="bookDetail">
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

    <div class="bookInfo">
      <img :src="bookInfo.bookImgPath" alt="" />
      <div class="right">
        <span class="title">{{ bookInfo.bookTitle }}</span>
        <hr />
        <span>
          作者：<span class="author">{{ bookInfo.bookAuthor }}</span>
        </span>
        <div>
          <el-tag type="success">{{ bookInfo.typeLevel1 }}</el-tag>
          <el-tag type="warning">{{ bookInfo.typeLevel2 }}</el-tag>
        </div>
        <div class="desc">
          <span class="desc-left">卖家对书本的介绍：</span>
          <span>{{ bookInfo.desc }}</span>
        </div>
        <div class="price">
          <span class="current">￥{{ bookInfo.currentPrice }}</span>
          <span class="origin">原价：￥{{ bookInfo.originPrice }}</span>
        </div>
        <div class="btn" v-if="bookInfo.status === 0">
          <el-button class="purchase" @click="goToPurchase">
            加入购物车
          </el-button>
          <el-button class="collect" @click="addToCollect">收藏</el-button>
        </div>
        <div class="btn" v-if="bookInfo.status === 1">
          <el-tag type="info">该书已售出</el-tag>
        </div>
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
      bookId: '',
      bookInfo: {},
      search: ''
    };
  },
  activated() {
    this.bookId = this.$route.query.id;
    console.log(this.bookId);
    this.getBookInfo(this.$route.query.id);
  },
  methods: {
    // 获取书本信息
    getBookInfo(id) {
      api.books.getSingleBookInfo(id).then((res) => {
        console.log(res);
        this.bookInfo = res.data;
        console.log(this.bookInfo);
      });
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
    // 购买图书
    goToPurchase() {
      const owner = this.$store.state.users.userInfo.id;
      const params = {
        owner,
        shopBook: this.bookId
      };
      api.shoppingCart.addToShoppingCart(params).then((res) => {
        if (res.status === 200) {
          Message({
            type: 'success',
            message: '成功加入到购物车'
          });
        } else if (res.status === 1005) {
          Message({
            type: 'warning',
            message: '已加入购物车,请不要重复点击'
          });
        } else {
          Message({
            type: 'error',
            message: '加入失败,出错了'
          });
        }
      });
    },
    // 添加到收藏夹
    addToCollect() {
      const owner = this.$store.state.users.userInfo.id;
      const params = {
        favoritesOwner: owner,
        favoritesBook: this.bookId
      };
      api.favorites.addToFavorites(params).then((res) => {
        console.log(res);
        if (res.status === 200) {
          Message({
            type: 'success',
            message: '成功加入到收藏夹'
          });
        } else if (res.status === 1005) {
          Message({
            type: 'warning',
            message: '已加入收藏夹,请不要重复点击'
          });
        } else {
          Message({
            type: 'error',
            message: '加入失败,出错了'
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.bookDetail {
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
  .bookInfo {
    margin: auto;
    height: 80%;
    width: 70%;
    border-radius: 10px;
    box-shadow: 0 0 10px #fed19c;
    display: flex;
    flex-direction: row;
    padding: 30px 0;
    img {
      height: 450px;
      width: 450px;
    }
    .right {
      display: flex;
      flex-direction: column;
      padding: 30px 0 0 30px;
      align-items: flex-start;
      > span,
      div {
        padding: 15px 0;
      }

      hr {
        width: 300px;
        color: #ccc;
        border: 1px solid;
      }
      .title {
        font-size: 26px;
        font-weight: 800;
      }
      .author {
        font-weight: 600;
      }
      .el-tag {
        display: inline-block;
        padding: 0 10px;
        margin-right: 15px;
      }
      .desc {
        width: 450px;
        text-align: left;
        line-height: 24px;
        span {
          font-size: 14px;
        }
        .desc-left {
          font-size: 18px;
        }
      }
      .price {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        .current {
          color: red;
          font-size: 38px;
          font-weight: 700;
        }
        .origin {
          color: #ccc;
          padding-left: 10px;
          text-decoration: line-through;
        }
      }
      .btn {
        .purchase {
          background-color: #fed19c;
          color: #fff;
          border: none;
          margin: 0 10px;
        }
        .purchase:hover {
          background-color: #fac78d;
        }
        .collect {
          border: 1px solid #fed19c;
          background-color: rgba(254, 209, 156, 0.3);
          color: #fed19c;
        }
      }
    }
  }
}
</style>