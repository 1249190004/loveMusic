<template>
  <div class="demo-image" ref="recommendRef">
    <div class="wrap" v-for="(item,index) in (recommendSongs.length === 0 ?print.playlists:recommendSongs)" :key="index"
         @click="itemCheck">
      <el-image style="width: 135px; height: 125px" :src="item.picUrl||item.coverImgUrl" :index="item.id"></el-image>
      <div class="font-Style">{{item.name}}</div>
      <div class="number">
          <span class="triangle">
          </span>
        {{Math.ceil(item.playCount/10000)>10000?Math.ceil(item.playCount/100000000)+"亿":Math.ceil(item.playCount/10000)+"万"}}
      </div>
    </div>
  </div>
</template>

<script>

  // import {getSongSheetLists} from "../../../network/songSheet";
  import {getSearchList} from "../../../network/search";


  export default {
    name: "RecommendSongSheet",
    props: {
      recommendSongs: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        print: {}
      }
    },
    methods: {
      async itemCheck(e) {
        // const data = await getSongSheetLists(e.target.getAttribute('index'))
        // this.$store.commit("setSingList", data)
        // this.$store.state.singList = data
        // sessionStorage.setItem("state", JSON.stringify(data.playlist))
        this.$store.commit('setSingId', e.target.getAttribute('index'))
        window.location.href = "/playListDetail"
      },
      async getSearchList() {
        const data = await getSearchList(sessionStorage.getItem("name"), 1000)
        this.print = data.result
      }
    },
    created() {
      this.getSearchList()
    }
  }
</script>

<style lang="less" scoped>
  span.triangle {
    display: inline-block;
    border: 5px solid;
    border-color: black transparent transparent #ffffff;
    left: 3px;
    top: 5px;
    margin-left: 5px;
  }

  .demo-image {
    width: 90%;
    display: flex;
    margin-left: 55px;
    flex-flow: row wrap;
    align-content: flex-start;
    align-items: center;
    padding: 10px 0;
    justify-content: center;
    border-top: 1px solid #ccc;
    /*margin-top: 45px;*/
    margin-bottom: -600px;
  }

  .el-image {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 0 5px #000000;
  }

  .wrap {
    /*margin-top: 45px;*/
    display: inline-block;
    width: 180px;
    height: 170px;
    box-sizing: border-box;
    background-color: white;
    flex: 0 0 15%;
    cursor: pointer;
    margin-right: 15px;
    position: relative;
  }

  .font-Style {
    /*width: 150px;*/
    font-size: 14px;
    /* display: flex;
     align-items: center;
     justify-content: center;*/
    font-weight: bold;
    /*overflow: hidden;*/
  }

  .number {
    position: absolute;
    padding-right: 5px;
    top: 5px;
    right: 25px;
    z-index: 2;
    font-size: 11px;
    font-weight: bold;
    line-height: 15px;
    background-color: #000000;
    color: #ffffff;
    border-radius: 5px;
  }

  .is-active {
    color: red !important;
    font-weight: bold;
  }

</style>
