<template>
  <div>
    <h5>我的音乐</h5>
    <el-menu
            :default-active="getHighElement"
            class="el-menu-vertical-demo"
            text-color="#000"
            :router="true"
            active-text-color="rgb(252,128,104)">
      <el-menu-item index="/playHistory">
        <i><img src="../../../assets/img/history.png" alt=""></i>
        <span slot="title">播放历史</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i><img src="../../../assets/img/list.png" alt=""></i>
        <span slot="title">试听列表</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i><img src="../../../assets/img/like.png" alt=""></i>
        <span slot="title">我喜欢的音乐</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i><img src="../../../assets/img/collection.png" alt=""></i>
        <span slot="title">我的收藏</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "SideBar",
    computed: {
      getHighElement() {
        return this.$route.path
      }
    }
  }
</script>

<style scoped lang="less">

  h5 {
    background-color: rgb(255, 255, 255);
    width: 100%;
    text-align: left;
    margin-left: 25px;
    font-weight: 600;
  }

  .el-menu-item {
    text-align: left;
  }

  span {
    font-size: 17px;
  }
</style>
