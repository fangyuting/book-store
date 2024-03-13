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
    <!-- <div class="catalog"></div> -->

    <div class="main">
      <div class="sidebar">
        <el-tree
          :data="menu"
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="[1]"
          accordion
          @node-click="handleNodeClick"
        />
      </div>
      <div class="content">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>书籍分类</el-breadcrumb-item>
          <el-breadcrumb-item>{{ selectedMenu }}</el-breadcrumb-item>
        </el-breadcrumb> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      search: '',
      selectedMenu: '',
      menu: [
        {
          id: 1,
          label: '书籍分类',
          children: [
            {
              label: '大学',
              children: [
                {
                  label: '数学'
                },
                {
                  label: '英语'
                },
                {
                  label: '经济学类'
                },
                {
                  label: '计算机类'
                },
                {
                  label: '电子商务类'
                },
                {
                  label: '教育学类'
                }
              ]
            },
            {
              label: '考研',
              children: [
                {
                  label: '计算机',
                  value: 'compute'
                },
                {
                  label: '教育学'
                }
              ]
            }
          ]
        },
        {
          label: '系统设置'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },

  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.selectedMenu = data.label;
    },
    goToAddBook() {
      this.$router.push('AddBook');
    },
    goToSetting() {
      this.$router.push('/MyPage');
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
  .catalog {
    width: 100%;
    background: rgba(255, 209, 156, 0.5);
    height: 50px;
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
      height: 400px;
      width: 160px;
      overflow: auto;

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
      width: 100%;
    }
  }
}
</style>