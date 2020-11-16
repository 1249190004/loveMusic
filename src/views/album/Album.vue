<template>
  <div class="main">
    <div class="wrap" v-for="(item,index) in print.albums||print.hotAlbums" :key="index" @click="clickShowContent">
      <el-image :src="item.picUrl" alt="" lazy :id="item.id"></el-image>
      <span class="name">{{item.name}}</span>
      <span class="author">{{item.artists[0].name}}</span>
      <span class="time">{{item.publishTime|showDate}}</span>
      <span class="type">
        <span class="triangle"></span>
        {{item.type}}
      </span>
      <span class="square"></span>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../common/util";
  import {getSearchList} from "../../network/search";
  import {getSingerAlbum} from "../../network/singer";
  import {mapState} from "vuex"

  export default {
    name: "Album",
    data() {
      return {
        print: {}
      }
    },
    filters: {
      showDate(value) {
        let date = new Date(value);
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    computed: {
      ...mapState({
        singerId: state => state.sing.singerId
      })
    },
    methods: {
      async getSearchList() {
        const data = await getSearchList(sessionStorage.getItem("name"), 10)
        this.print = data.result
      },
      async getSingerAlbum() {
        const res = await getSingerAlbum(this.singerId)
        this.print = res
        console.log(res)
      },
      clickShowContent(e) {
        this.$store.commit('setSingId', e.target.getAttribute("id"));
        window.location.href = "/playListDetail"
      }
    },
    created() {
      if ("/singerDetail" === this.$route.path) {
        this.getSingerAlbum()
      } else {
        this.getSearchList()
      }
    }
  }
</script>

<style scoped lang="less">
  div.main {
    margin-top: 25px;
    margin-bottom: -100000%;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    /*justify-content: center;*/

    div.wrap {
      height: 285px;
      flex: 0 0 20%;
      /*border: 1px solid;*/
      position: relative;
      cursor: pointer;

      .el-image,
      span {
        position: absolute;
        left: 5px;
      }

      .el-image {
        width: 185px;
        height: 185px;
        left: 0;
        background: #cccccc;
        box-shadow: 5px 8px 0 #dddddd;
      }

      span.name {
        top: 200px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        width: 185px;
        text-align: left;
      }

      span.author {
        top: 225px;
        font-size: 13px;
        color: gray;
      }

      span.time {
        top: 242px;
        font-size: 12px;
        color: gray;
      }

      span.triangle {
        display: inline-block;
        border: 5px solid;
        border-color: black transparent transparent #ffffff;
        left: -2px;
        top: 7px;
        margin-left: 5px;
      }

      span.type {
        display: inline-block;
        background: #000000;
        color: #ffffff;
        font-size: 12px;
        font-weight: bold;
        left: 135px;
        top: 5px;
        padding: 2px 3px 2px 10px;
        /*width: 50px;*/
        border-radius: 5px;
      }

      span.square {
        display: inline-block;
        width: 184px;
        height: 184px;
        background: black;
        z-index: -1;
        border-radius: 92px;
        left: 10px;
        transition: all linear .2s;
      }

      &:hover {
        span.square {
          left: 20px;
        }
      }
    }
  }
</style>
