<template>
  <div class="myPage">
    <div class="header">
      <img
        src="../../static/img/book-trading-high-resolution-logo-transparent.png"
        alt=""
        class="logo"
        @click="goToHome"
      />
      <div class="operation">
        <span @click="goToAddBook">添加图书</span>
        <span>购物车</span>
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
        <ul class="list">
          <li>
            <router-link to="/myPage/myInfo" class="routerLink"
              >个人信息</router-link
            >
          </li>
          <li>
            <router-link to="/myPage/myCollege" class="routerLink"
              >校园认证</router-link
            >
          </li>
          <li>
            <router-link to="/myPage/myCollection" class="routerLink"
              >我的收藏</router-link
            >
          </li>
          <li>
            <router-link to="/myPage/myOrder" class="routerLink"
              >我的订单</router-link
            >
          </li>
          <li>
            <router-link to="/myPage/dataAnalysis" class="routerLink"
              >数据分析</router-link
            >
          </li>
        </ul>
      </div>

      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToHome() {
      this.$router.push('/home');
    },
    goToAddBook() {
      this.$router.push('/AddBook');
    },
    goToSetting() {
      // const redirect = this.$router.currentRoute.fullPath;
      // console.log(redirect);
      // // console.log(redirect);
      // const next = redirect ? redirect : '/MyPage';
      // this.$router.push('');
    },
    // 退出登录
    logOut() {
      this.$store.dispatch('users/LOGOUT', ''); // 清空缓存中的用户数据
      const redirect = this.$router.currentRoute.query.redirect;
      const back = redirect ? redirect : '/';
      this.$router.replace(back);
    }
  }
};
</script>

<style lang="less" scoped>
.myPage {
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
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: row;
    .sidebar {
      flex: 0.3;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      .list {
        margin-top: 100px;
        width: 200px;
        height: 100%;
        box-shadow: 0 0 7px rgba(254, 209, 156, 0.8);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom: none;
        li {
          height: 50px;
          line-height: 50px;
          width: 200px;
          margin: 15px 0;
          cursor: pointer;
          transition: all 0.3s linear;
          .routerLink {
            display: inline-block;
            width: 200px;
            height: 50px;
          }
        }
        li:hover {
          background-color: #fed;
          color: #fff;
        }
      }
    }
    .content {
      flex: 1;
    }
  }
}
</style>
