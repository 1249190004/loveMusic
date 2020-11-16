<template>
  <div class="loginPosition">
    <div index="/login" v-if="getLoginState">
      <div class="hoverStyle" @click="clickLogin">
        <img src="../../../assets/img/login.png" alt=""><br><span>登录</span>
      </div>
    </div>
    <div v-else>
      <img :src="avatarUrl" alt="">
      <el-dropdown>
          <span class="el-dropdown-link">
            <span>{{userName}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user" @click.native="personalClick">个人主页</el-dropdown-item>
          <el-dropdown-item icon="el-icon-medal">我的等级</el-dropdown-item>
          <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
          <el-dropdown-item divided icon="el-icon-switch-button" @click.native="quitLogin" :split-button="true">退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {getLoginData} from "../../../network/login";

  export default {
    name: "Profile",
    data() {
      return {
        avatarUrl: '',
        userName: ''
      }
    },
    methods: {
      clickLogin() {
        this.$router.push("/login")
      },
      personalClick() {

      },
      quitLogin() {
        localStorage.clear()
        sessionStorage.clear()
        history.go(0)
      },
      async getLoginDatas() {
        const res = await getLoginData(localStorage.getItem("userId"))
        this.avatarUrl = res.profile.avatarUrl
        this.userName = res.profile.nickname
      }
    },
    created() {
      if (localStorage.getItem("userId")) {
        this.getLoginDatas()
      }

    },
    computed: {
      getLoginState() {
        return window.sessionStorage.getItem('token') === null
      }
    }
  }
</script>

<style scoped lang="less">
  div.loginPosition {
    /*float: left;*/
    margin: 25px;
  }

  .hoverStyle {
    cursor: pointer;
  }

  .el-menu-item:first-of-type {
    margin-left: 50px;
  }

  .el-menu-item:nth-child(8) {
    color: #000000;
    float: right;
    /*margin-right: 125px;*/

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }

    span {
      font-size: 14px;
      margin-left: 15px;
    }
  }

  span:hover {
    cursor: pointer;
  }

  .el-menu-item:last-of-type {
    float: right;
    font-size: 22px !important;
    color: #000000;
    /*margin-right: 150px;*/
  }

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
</style>
