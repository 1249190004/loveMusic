<template>
  <div class="main">
    <div class="wrap" v-for="(item,index) in print.videos" :key="index">
      <el-image :src="item.coverUrl" lazy></el-image>
      <span class="name">{{item.title}}</span>
      <span class="playtime"><span class="triangle"></span>{{Math.ceil(item.playTime/10000)>10000?Math.ceil(item.playTime/100000000)+"亿":Math.ceil(item.playTime/10000)+"万"}}</span>
      <span class="time">{{utils.formatSecondTime(item.durationms/1000)}}</span>
      <span class="play" @click="clickVideoDetail">
        <img src="../../assets/img/play1.png" alt="" :vid="item.vid">
      </span>
    </div>
  </div>
</template>

<script>
  import {getSearchList} from "../../network/search";

  import {getPlayVideoList, getPlayMvList} from "../../network/video";

  export default {
    name: "Video",
    data() {
      return {
        print: {}
      }
    },
    methods: {
      async getSearchList() {
        const data = await getSearchList(sessionStorage.getItem("name"), 1014)
        this.print = data.result
      },
      async clickVideoDetail(e) {
        let data = null;
        if (e.target.getAttribute("vid").length < 10) {
          data = await getPlayMvList(parseInt(e.target.getAttribute("vid")))
        } else {
          data = await getPlayVideoList(e.target.getAttribute("vid"))
        }
        sessionStorage.setItem("url", JSON.stringify(data))
        window.location.href = '/videoDetail'
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
      height: 250px;
      flex: 0 0 25%;
      /*border: 1px solid;*/
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      &:hover {
        span.play {
          display: block;
          cursor: pointer;
        }
      }
    }

    .el-image, span {
      position: absolute;
    }

    .el-image {
      width: 290px;
      height: 175px;
      margin-bottom: 15px;
    }

    span.play {
      display: none;
    }

    span.name {
      top: 220px;
    }

    span.time {
      top: 180px;
      color: #ffffff;
      display: inline-block;
      width: 290px;
      background: rgba(0, 0, 0, .7);
      text-align: left;
      line-height: 26px;
    }

    span.playtime {
      right: 15px;
      background: black;
      color: #ffffff;
      top: 32px;
      font-size: 12px;
      border-radius: 5px;
      padding-left: 12px;
    }

    span.triangle {
      display: inline-block;
      border: 5px solid;
      border-color: black transparent transparent #ffffff;
      left: 5px;
      top: 5px;
    }
  }
</style>
