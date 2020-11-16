<template>
  <div class="wrap">
    <el-menu mode="horizontal" default-active="1" @click.native="clickShowContent">
      <el-menu-item :type="type[0]" index="1">{{list[0]}}</el-menu-item>
      <el-menu-item :type="type[1]" index="2">{{list[1]}}</el-menu-item>
      <el-menu-item :type="type[2]" index="3">{{list[2]}}</el-menu-item>
      <el-menu-item :type="type[3]" index="4">{{list[3]}}</el-menu-item>
      <el-menu-item :type="type[4]" index="5">{{list[4]}}</el-menu-item>
    </el-menu>

    <div name="fade" v-if="isLoading" class="as">
      <Laoding>
      </Laoding>
    </div>
    <div class="main" v-else>
      <div class="wrapped" v-for="(item,index) in newSing" :key="index">
        <span class="number" @click="clickPlay" :index="item.hMusic.id">{{('00'+(index+1)).substring(parseInt(('00'+(index+1)).length/2),('00'+(index+1)).length)}}</span>
        <el-image :src="item.album.blurPicUrl" alt="" lazy></el-image>
        <span class="name">{{item.artists[0].name}}</span>
        <span class="company">{{item.album.company}}</span>
        <span class="playTime">{{utils.formatSecondTime(item.duration/1000)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getSing} from "../../network/play";
  import Laoding from "../../components/common/laoding/Laoding";

  export default {
    name: "NewMusic",
    components: {
      Laoding
    },
    data() {
      return {
        list: ["全部", "华语", "欧美", "日本", "韩国"],
        type: [0, 7, 96, 8, 16],
        newSing: [],
        isLoading: true,
        rid: 0
      }
    },
    methods: {
      async getSing() {
        const res = await getSing(this.rid)
        this.newSing = res.data
        this.isLoading = false
      },
      clickPlay() {
      },
      clickShowContent(e) {
        this.isLoading = true
        this.rid = e.target.getAttribute("type")
        this.getSing()
      }
    },
    created() {
      this.getSing()
    }
  }
</script>

<style scoped lang="less">
  span {
    top: 30px;
    font-size: 16px;
  }

  span.playTime {
    right: 15px;
  }

  span.company {
    left: 520px;
  }

  span.name {
    left: 185px;
  }

  span, .el-image {
    position: absolute;
  }

  span.number {
    left: 12px;
  }


  div.wrapped {
    width: 100%;
    position: relative;
    height: 75px;
    top: 60px;
  }

  div.wrapped:nth-child(odd) {
    background: rgb(245, 245, 247);
  }

  div.wrapped:nth-child(even) {
    /*background: black;*/
    /*opacity: .8;*/
  }

  div.wrapped:hover {
    background-color: rgb(232, 233, 237);
    cursor: pointer;

    span.number {
      background: url("../../assets/img/play.png");
      color: transparent;
      background-size: cover;
      display: inline-block;
      width: 18px;
    }
  }

  div.main {
    width: 100%;
    /*margin-bottom: -100%;*/
  }

  .wrap {
    width: 95%;
    margin-bottom: -50000px;
    padding-right: 20px;
    border-radius: 5px 0 5px 5px;
    box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
  }

  .el-menu{
    position: fixed;
    z-index: 999;
    width: 90%;
  }
  .el-menu-item {
    width: 100px;
    font-size: 15px;
    border: none !important;
  }

  .el-image {
    width: 60px;
    height: 60px;
    left: 75px;
    top: 9px;
  }

  .is-active {
    color: red !important;
    font-weight: bold;
  }
</style>
