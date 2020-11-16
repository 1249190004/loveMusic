<template>
  <div v-cloak>
    <el-container>
      <el-header width="100%">
        <MenuBar/>
      </el-header>
      <el-container>
        <el-aside width="15%">
          <Profile/>
          <SideBar>
<!--            <router-view></router-view>-->
          </SideBar>
        </el-aside>
        <el-main width="85%" scroll-container >
          <router-view></router-view>
        </el-main>
      </el-container>
      <PlayMusic></PlayMusic>
    </el-container>
    <Audio></Audio>
  </div>
</template>

<script>
  import MenuBar from "../../../views/menuBar/MenuBar";

  import Profile from "../../common/profile/Profile";
  import SideBar from "../../common/sideBar/SideBar";

  import PlayMusic from "../../common/playMusic/PlayMusic";

  import Audio from "../../common/audio/Audio";

  import {getPersonal} from "../../../network/personal";


  export default {
    name: "Home",
    components: {
      MenuBar,
      Profile,
      SideBar,
      PlayMusic,
      Audio
    },
    async created(){
      const data = await getPersonal()
      console.log(data);
    }
  }
</script>

<style scoped lang="less">
  .el-aside {
    background-color: rgb(245, 245, 247);
    color: #333;
    text-align: center;
    height: calc(100vh - 60px);
    overflow: hidden;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    line-height: 20px;
    overflow: auto;
    /*overflow-x: hidden;*/
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 5px;
    height: 0;
    background-color: #cccccc;
    border-radius: 10px;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #cccccc;
  }
</style>
