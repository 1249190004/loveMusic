<template>
  <div class="top">
    <el-menu mode="horizontal" :default-active="isActive" :router="true">
<!--      <el-menu-item class="result">搜索结果</el-menu-item>-->
      <el-menu-item :type="item.id" v-for="(item,index) in  list" :index="item.path" :key="index">{{item.name}}
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: "Menu",
    data() {
      return {
        list: [
          {id: 1, name: '单曲', path: '/playMusicDetail'},
          {id: 10, name: '专辑', path: '/album'},
          {id: 100, name: '歌手', path: '/searchSinger'},
          {id: 1000, name: '歌单',path: '/recommendSongSheet'},
          {id: 1014, name: '视频',path: '/video'},
        ],
        isActive: '/playMusicDetail'
      }
    },
    created() {
      this.isActive = this.$route.path
    }
  }
</script>

<style scoped lang="less">
  .el-menu-item {
    border: none !important;
  }

  .is-active {
    /*color: red !important;*/
    font-weight: bold;
    border-bottom: 1px solid !important;
  }

  .result {
    font-weight: bolder !important;
    font-size: 22px;
    color: black;
    cursor: default;
  }
</style>
