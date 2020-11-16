<template>
  <div class="main">
    <div class="wrap" v-for="(item,index) in print.mvs" :key="index">
      <el-image :src="item.imgurl" lazy></el-image>
      <span class="name">{{item.name}}</span>
      <span class="playtime"><span class="triangle"></span>{{utils.tranNumber(item.playCount,0)}}</span>
      <span class="time">{{utils.formatSecondTime(item.duration/1000)}}</span>
      <span class="play" @click="clickVideoDetail">
        <img src="../../../assets/img/play1.png" alt="" :id="item.id">
      </span>
    </div>
  </div>
</template>

<script>

  import {getSingerMv} from "../../../network/singer";

  import {mapState} from "vuex"
  import {getPlayMvList} from "../../../network/video";

  export default {
    name: "Mv",
    data() {
      return {
        print: {}
      }
    },
    methods: {
      async getSingerMv() {
        const res = await getSingerMv(this.singerId)
        this.print = res
      },
      async clickVideoDetail(e){
        const data = await getPlayMvList(parseInt(e.target.getAttribute("id")))
        sessionStorage.setItem("url", JSON.stringify(data))
        window.location.href = '/videoDetail'
      }
    },
    computed: {
      ...mapState({
        singerId: state => state.sing.singerId
      })
    },
    created() {
      this.getSingerMv()
    }
  }
</script>

<style scoped lang="less">
  div.main {
    margin-bottom: -100000%;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    /*justify-content: center;*/
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
