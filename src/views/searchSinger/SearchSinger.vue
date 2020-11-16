<template>
  <div class="main">
    <div class="wrap" v-for="(item,index) in print.artists" :key="index">
      <el-image :src="item.img1v1Url" lazy></el-image>
      <span class="name">{{item.name}}</span>
    </div>
  </div>
</template>

<script>

  import {getSearchList} from "../../network/search";

  export default {
    name: "SearchSinger",
    data() {
      return {
        print: {}
      }
    },
    methods: {
      async getSearchList() {
        const data = await getSearchList(sessionStorage.getItem("name"), 100)
        this.print = data.result
      }
    },
    created() {
      this.getSearchList()
    }
  }
</script>

<style scoped lang="less">
  div.main {
    margin-bottom: -100000%;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    justify-content: center;
    margin-top: 10px;

    div.wrap {
      height: 175px;
      flex: 0 0 18%;
      /*border: 1px solid;*/
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .el-image{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-bottom: 15px;
      box-shadow: 2px 2px 5px #000000;
    }

    span.name{
      font-weight: bold;
    }
  }

</style>
