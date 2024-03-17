<template>
  <div class="Login">
    <!-- header 部分 (logo & slogan) -->
    <div class="header" :class="{ 'header-small': !changeState }">
      <img
        src="../../static/img/book-trading-high-resolution-logo-transparent.png"
        alt=""
        class="logo"
      />
      <h1>
        Discover, Trade, and Share
        <br />
        Welcome to Your Campus Used Book Hub!
      </h1>
    </div>
    <!-- login 部分 -->
    <div class="log_in" :class="{ 'log-in-appear': !changeState }">
      <h1>{{ isLoginState ? 'Login' : 'Signup' }}</h1>
      <el-form
        class="content"
        :model="currentInfo"
        :rules="rules"
        ref="currentInfo"
      >
        <el-form-item prop="account">
          <span>账号:</span>
          <el-input
            type="text"
            placeholder="请输入账号"
            name="账号"
            v-model="currentInfo.account"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span>密码:</span>
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="currentInfo.password"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!isLoginState" prop="repassword">
          <span>确认密码:</span>
          <el-input
            type="password"
            placeholder="请再次输入密码"
            v-model="currentInfo.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item class="cvCode" prop="cvCode">
          <span>验证码:</span>
          <el-input
            type="text"
            placeholder="验证码(不区分大小写)"
            v-model="currentInfo.cvCode"
          ></el-input>
          <canvas
            width="100"
            height="40"
            ref="currentCanvas"
            @click="getCVCode"
          ></canvas>
        </el-form-item>
        <el-button class="btn" @click="login" v-if="isLoginState"
          >登录</el-button
        >
        <el-button class="btn" @click="register" v-else>注册</el-button>
      </el-form>
      <span class="switch">
        {{ isLoginState ? '没有账号?' : '已有账号?' }}
        <span class="click" @click="toggleState">{{
          isLoginState ? '注册' : '登录'
        }}</span>
      </span>
    </div>

    <!-- 底部img -->
    <img
      class="family_img"
      src="../../static/img/login_.jpg"
      alt=""
      :class="{ 'family_img-hidden': !changeState }"
    />
  </div>
</template>

<script>
import canvasImg from '../../static/img/canvas2.jpg';
import { createCanvas } from '../utils/cvcode';
import { Message } from 'element-ui';
import api from '../api';
export default {
  name: 'Login',
  data() {
    // 一定要放上面 不然报错
    const validateRepassword = async (rule, value, callback) => {
      console.log(this.currentInfo);
      if (value === this.currentInfo.password) {
        callback();
      } else {
        callback(new Error('两次输入的密码不一致'));
      }
    };
    return {
      changeState: true, // 进入页面 login推入
      isLoginState: true, // login / register 转换
      accountInfo: {
        account: '', // 账号
        password: null, // 密码
        cvCode: null, // 验证码
        cvCodeTimestamp: '', // 时间戳
        avatar:
          JSON.parse(window.localStorage.getItem('userInfo') || '{}').photo ||
          '' // 头像
      },
      // 注册信息
      registerInfo: {
        account: '', // 账号
        password: null, // 密码
        repassword: null,
        cvCode: null, // 验证码
        cvCodeTimestamp: '' // 时间戳
      },
      cvCode: '', // 验证码
      cvCoding: true, // 正在获取验证码?
      cvCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      // 校验规则
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '请输入3-10位的账号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            message: '输入密码长度必须大于6位'
          },
          {
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/,
            message: '密码必须包含至少一个大写字母、一个小写字母和一个数字',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          {
            validator: validateRepassword,
            message: '两次输入密码不一致',
            trigger: 'blur'
          }
        ],
        cvCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    };
  },
  computed: {
    currentInfo() {
      return this.isLoginState ? this.accountInfo : this.registerInfo;
    }
  },
  created() {
    this.getCVCode();
  },
  mounted() {
    setTimeout(() => {
      this.changeState = false;
    }, 1000);
  },
  methods: {
    // 切换 login/register 状态
    toggleState() {
      this.isLoginState = !this.isLoginState;
      this.currentInfo.account = '';
      this.currentInfo.password = '';
      this.currentInfo.repassword = '';
      this.currentInfo.cvCode = '';
      this.currentInfo.cvCodeTimestamp = '';
      this.getCVCode();
    },
    // 获取验证码
    getCVCode() {
      this.cvCoding = true;
      api.users.getCVCode().then((res) => {
        if (res.status == 200) {
          const { data, status, timestamp } = res;
          this.cvCode = data;
          this.cvCoding = true;
          this.currentInfo.cvCodeTimestamp = timestamp;

          this.$nextTick(() => {
            const currCanvas = this.$refs.currentCanvas;
            createCanvas(this.cvCode, currCanvas, canvasImg, () => {
              this.coding = false;
            });
          });
        }
      });
    },

    // 登录
    login() {
      console.log(this.currentInfo);
      this.$nextTick(() => {
        // 先校验格式
        this.$refs.currentInfo.validate((valid) => {
          if (valid) {
            api.users.login(this.currentInfo).then((res) => {
              console.log(res);
              let { status, data, msg } = res;
              if (status === 1001) {
                Message({
                  message: '账号/密码错误',
                  type: 'error'
                });
                (this.currentInfo.account = ''),
                  (this.currentInfo.password = '');
                return;
              } else if (status === 1002) {
                this.$alert(
                  '用户账号已被冻结,请联系管理员 shirleyicon@gmail.com',
                  'Warning',
                  {
                    confirmButtonText: 'OK'
                  }
                );
                return;
              } else if (status === 1003) {
                this.$alert(
                  '用户账号注销,如果帮助请联系管理员 shirleyicon@gmail.com',
                  'Warning',
                  {
                    confirmButtonText: 'OK'
                  }
                );
                return;
              } else if (status === 1004) {
                if (msg == '验证码已过期') {
                  Message({
                    message: '验证码过期',
                    type: 'warning'
                  });
                  this.currentInfo.cvCode = '';
                  this.getCVCode();
                } else if (msg == '验证码错误') {
                  Message({
                    message: '验证码错误',
                    type: 'warning'
                  });
                  this.currentInfo.cvCode = '';
                  this.getCVCode();
                }
                return;
              }

              if (status === 200) {
                const id = data.id;
                this.$store.dispatch('users/LOGIN', data);
                this.$notify({
                  title: `Hello ${data.account}`,
                  message: '登录成功！！！',
                  type: 'success',
                  showClose: false,
                  duration: 2000
                });
                const redirect = this.$router.currentRoute.query.redirect;
                const next = redirect ? redirect : '/home';
                this.$router.replace(next);
                // this.$socket.emit('login',{userId:id},(result)=>{console.log(result);})

                // this.currentInfo.account = '';
                // this.currentInfo.password = '';
                // this.currentInfo.repassword = '';
                // this.currentInfo.cvCode = '';
                // this.currentInfo.cvCodeTimestamp = '';
              }
            });
          }
        });
      });
    },

    register() {
      console.log(this.currentInfo);
      this.$nextTick(() => {
        this.$refs.currentInfo.validate((valid) => {
          if (valid) {
            api.users.register(this.currentInfo).then((res) => {
              console.log(res);
              const { status, data, msg } = res;
              if (status == 1005) {
                Message({
                  message: '账号已被注册',
                  type: 'error'
                });
                this.currentInfo = {
                  account: '',
                  password: null,
                  repassword: null,
                  cvCode: null
                };
              } else if (status === 1004) {
                if (msg == '验证码已过期') {
                  Message({
                    message: '验证码过期',
                    type: 'warning'
                  });
                  this.currentInfo.cvCode = '';
                  this.getCVCode();
                } else if (msg == '验证码错误') {
                  Message({
                    message: '验证码错误',
                    type: 'warning'
                  });
                  this.currentInfo.cvCode = '';
                  this.getCVCode();
                }
                return;
              } else if (status === 200) {
                Message({
                  message: '注册成功,请登录！',
                  type: 'success'
                });
                this.toggleState();
                this.currentInfo.account = data.account;
              }
            });
          }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
@transition1: all 1s linear;
@transition05: all 0.5s linear;

.Login {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .header {
    margin-top: 1.25rem;
    transition: @transition1;
    height: 14.375rem;
    &-small {
      transform: translateY(-10%) scale(0.8);
      margin-top: 2.1875rem;
    }
    .logo {
      width: 9.375rem;
      height: 9.375rem;
    }
    h1 {
      margin: 0.9375rem 0;
      font-family: cursive;
    }
  }

  .log_in {
    height: 200px;
    opacity: 0;
    transition: @transition1;
  }

  .log-in-appear {
    margin-bottom: 10px;
    opacity: 1;
    h1 {
      margin-bottom: 10px;
    }
  }

  .content {
    width: 350px;
    display: flex;
    flex-direction: column;
    .el-form-item {
      margin-bottom: 0px;
    }
    /deep/ .el-form-item__content {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    /deep/ .el-form-item__error {
      padding-top: 0px;
      top: 88%;
      left: 70px;
    }
    span {
      text-align: right;
      width: 60px;
      font-size: 14px;
    }
    .el-input {
      // width: 100%;
      flex: 1;
      margin: 15px 0 15px 0.625rem;
    }

    /deep/ .el-input__inner:focus {
      border-color: #fed19c;
    }
    .cvCode {
      .el-input {
        // width: 10.9375rem;
        margin-right: 0.625rem;
      }
    }
    .btn {
      width: 200px;
      text-align: center;
      margin: 10px auto;
      transition: @transition05;
    }
    .btn:hover,
    .el-button:focus,
    .el-button:hover {
      background-color: #fed19c;
      color: #fff;
      border: 1px solid #ffd19c;
    }
  }
  .switch {
    color: #bcbcbc;
    font-size: 14px;
    float: left;
    margin: 10px 15px;
    .click {
      /* 下划线 underline 无法控制下划线和文字的距离 */
      border-bottom: 1px solid;
      cursor: pointer;
      font-style: italic;
      transition: @transition05;
    }
    .click:hover {
      color: #fed19c;
    }
  }
  .family_img {
    opacity: 1;
    transition: @transition1;
    &-hidden {
      transform: translateY(100%);
      opacity: 0;
    }
  }
}

/* 响应式样式 */
@media (max-width: 499px) {
  .Login {
    .header {
      margin-top: 1.25rem;
      transition: @transition1;
      &-small {
        transform: translateY(-10%) scale(0.8);
        margin-top: 2.1875rem;
      }
      .logo {
        width: 6.25rem;
        height: 6.25rem;
      }
      h1 {
        font-size: 1.5625rem;
      }
    }
  }
  .log-in-appear {
    h1 {
      font-size: 1.5625rem;
    }
  }
  .content {
    width: 18.75rem;
    span {
      text-align: right;
      width: 3.125rem;
    }
    .el-input {
      width: 100%;
      margin: 1.25rem 0.625rem;
    }
    .cvCode {
      .el-input {
        width: 9.375rem;
      }
    }
  }
  .family_img {
    width: 100%;
    opacity: 1;
    transition: @transition1;
    &-hidden {
      transform: translateY(100%);
      opacity: 0;
    }
  }
}
</style>
