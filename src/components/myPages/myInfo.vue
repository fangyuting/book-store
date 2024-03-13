<template>
  <div class="myInfo">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>我的</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="myInfoList">
      <ul>
        <li>
          <span>账号</span>
          <el-input type="text" v-model="userInfo.account"></el-input>
        </li>
        <li>
          <span>昵称</span>
          <el-input type="text" v-model="userInfo.nickName"></el-input>
        </li>
        <li>
          <span>性别</span>
          <el-select v-model="userInfo.sex" placeholder="请选择">
            <el-option key="female" label="女" value="女"> </el-option>
            <el-option key="male" label="男" value="男"> </el-option>
          </el-select>
        </li>
        <li>
          <span>年龄</span>
          <el-input type="number" v-model="userInfo.age"></el-input>
        </li>
        <li>
          <span>校园圈子</span>
          <div class="campus">
            <div v-if="userInfo.CampusCertification">已认证</div>
            <div v-else>
              还未认证? &nbsp;
              <router-link to="myCollege" class="verify"
                >快去认证吧~</router-link
              >
            </div>
          </div>
        </li>
        <li>
          <span>上传头像</span>
          <div>
            <!-- <div>选择文件</div> -->
          </div>
        </li>
      </ul>
    </div>
    <button class="btn" @click="editAndSave">修改并保存</button>
  </div>
</template>

<script>
import api from '../../api';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      userInfo: {
        account: '',
        nickName: '',
        sex: '',
        age: '',
        CampusCertification: 0
      }
    };
  },
  mounted() {
    this.initialGetUserInfo();
  },
  methods: {
    initialGetUserInfo() {
      this.userInfo = this.$store.state.users.userInfo;
      console.log(this.userInfo);
      Object.keys(this.userInfo).forEach((key) => {
        switch (key) {
          case 'sex':
            {
              this.userInfo[key] == '0'
                ? (this.userInfo[key] = '男')
                : (this.userInfo[key] = '女');
            }
            break;
          default:
        }
      });
      console.log(this.userInfo);
    },
    // 编辑并保存
    editAndSave() {
      console.log(this.userInfo);
      const params = {
        ...this.userInfo,
        sex: this.userInfo.sex == '女' ? 1 : 0
      };
      console.log('params', params);
      api.users.updateUserInfo(params).then((res) => {
        console.log(res);
        if (res.status === 200) {
          Message({
            type: 'success',
            message: '保存成功'
          });
          this.$store.dispatch('users/LOGIN', res.data);
          this.initialGetUserInfo();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.myInfo {
  height: 100%;
  margin: 50px 0 0 40px;
  width: 75%;
  .breadcrumb {
    margin: 25px 0;
  }
  .myInfoList {
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
        margin: 20px 0;

        span {
          width: 65px;
          text-align: left;
          font-size: 14px;
        }
        /deep/ .el-input {
          width: 250px;
        }
        .campus {
          font-size: 12px;
          margin-left: 10px;
          .verify {
            color: #fea234;
          }
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
    margin: 10px 0;
  }
  .btn:hover {
    background-color: #fed19c;
  }
}
</style>
