<template>
  <div class="loginStyle">
    <el-form>
      <div class="form-wrapper">
        <div class="header">
          Login
        </div>
        <div class="input-wrapper">
          <div class="border-wrapper">
            <input type="text" class="border-item" placeholder="username" v-model="loginForm.username">
          </div>
          <div class="border-wrapper">
            <input type="password" class="border-item" placeholder="password" v-model="loginForm.password">
          </div>
        </div>
        <div class="action">
          <input type="button" class="btn" value="login" @click="loginVerification">
          <input type="button" class="btn" value="Register">
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {getLoginMultidata} from "../../../network/login";

  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: '15773116584',
          password: ''
        }
      }
    },
    methods: {
      async loginVerification() {
        await getLoginMultidata(this.loginForm).then(res => {
          if (res.code !== 200) return this.$message.error('登录失败！')
          this.$message.success('登录成功')
          localStorage.setItem("userId", res.profile.userId);
          localStorage.setItem("cookie", res.cookie)
          // this.$store.state.userId = localStorage.getItem("userId")
          window.sessionStorage.setItem('token', res.token)
          this.$router.push('/find')
        })
      }
    },
    created() {

    }
  }
</script>

<style scoped lang="less">
  .loginStyle {
    height: 100vh;
    background: url("../../../assets/img/bg1.jpg");
  }

  .el-form {
    height: 100%;
    font-family: "agency fb";
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    /*background-color: #0e92b3;*/
  }

  input {
    background: rgb(41, 45, 62) !important;
    color: #ffffff;
    font-family: "agency fb" !important;
  }

  a {
    color: #ffffff;
    text-decoration: none;
  }

  .btn:hover {
    background-color: #0e92b3 !important;
  }

  .form-wrapper {
    width: 300px;
    background-color: rgb(41, 45, 62);
    color: #fff;
    border-radius: 2px;
    padding: 50px;
  }

  .form-wrapper .header {
    text-align: center;
    font-size: 35px;
    text-transform: uppercase;
    line-height: 100px;
  }

  .form-wrapper .input-wrapper input {
    background-color: rgb(41, 45, 62);
    border: 0;
    width: 100%;
    text-align: center;
    font-size: 15px;
    color: #fff;
    outline: none;
  }

  .form-wrapper .input-wrapper input::placeholder {
    font-family: "agency fb";
    text-transform: uppercase;
  }

  .form-wrapper .input-wrapper .border-wrapper {
    background-image: linear-gradient(to right, #e8198b, #0eb4dd);
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-wrapper .input-wrapper .border-wrapper .border-item {
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    border-radius: 30px;
  }

  .form-wrapper .action {
    display: flex;
    justify-content: center;
  }

  .form-wrapper .action .btn {
    width: 60%;
    text-transform: uppercase;
    border: 2px solid #0e92b3;
    text-align: center;
    line-height: 50px;
    border-radius: 30px;
    cursor: pointer;
    outline: none;
  }

  .form-wrapper .action .btn:hover {
    background-color: #0e92b3;
  }

  .form-wrapper .icon-wrapper {
    text-align: center;
    width: 60%;
    margin: 20px auto;
    border-top: 1px dashed rgb(146, 146, 146);
    padding: 20px;
  }

  .form-wrapper .icon-wrapper i {
    font-size: 20px;
    color: rgb(187, 187, 187);
    cursor: pointer;
    border: 1px solid #fff;
    padding: 5px;
    border-radius: 20px;
  }
</style>
