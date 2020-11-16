<template>
  <div class="wrap">
    <div name="fade" v-if="isLoading">
      <Laoding>
      </Laoding>
    </div>
    <div class="bottom" v-else>
      <div class="main mains">
        <span>序号</span>
        <span class="name sing-name">歌曲</span>
        <span class="singer">播放</span>
        <span class="album">描述</span>
        <span>时长</span>
      </div>
      <div v-for="(item,index) in print" :key="index" class="main">
        <span class="number" @click="clickPlay" :index="item.id">{{('00'+(index+1)).substring(parseInt(('00'+(index+1)).length/2),('00'+(index+1)).length)}}</span>
        <!--        <img :src="item.al.picUrl" alt="">-->
        <el-image :src="item.radio.picUrl" lazy></el-image>
        <span class="name">{{item.name}}</span>
        <span class="singer">{{item.listenerCount}}</span>
        <span class="album">{{item.description}}</span>
        <span>{{utils.formatSecondTime(item.duration/1000)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  import {formatDate} from "../../common/util";

  import Laoding from "../../components/common/laoding/Laoding";

  export default {
    name: "RadioDetail",
    components: {
      Laoding
    },
    data() {
      return {
        isLoading: true
      }
    },
    computed: {
      ...mapState({
        print: state => state.singList
      })
    },
    filters: {
      showDate(value) {
        let date = new Date(value);
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    created() {
      if (sessionStorage.getItem("state")){
        this.isLoading=false
      }
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  div.wrap {
    margin-bottom: -99950px;
    box-shadow: 0 0 5px #cccccc;
  }

  ul {
    list-style: none;
    position: absolute;
    /*top: 25px;*/
    left: 260px;
    width: 75%;
    text-align: left;
  }

  ul li {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  ul li:nth-child(2) span {
    margin-right: 25px;
  }

  .el-image, img {
    width: 36px;
    height: 36px;
  }

  .el-image {
    position: absolute;
    top: 8px;
    left: 150px;
  }

  img.avatar {
    border-radius: 18px;
    margin-right: 15px;
    position: static !important;
  }

  img.cover {
    width: 200px;
    height: 200px;
    position: absolute;
    border-radius: 10px;
    box-shadow: 5px 8px #cccccc;
    left: 25px;
    top: 15px;
  }

  span.tag {
    background-color: rgb(250, 40, 0);
    display: inline-block;
    width: 50px;
    height: 25px;
    line-height: 25px;
    color: white;
    border-radius: 15px;
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    margin-right: 15px;
  }

  div.top {
    position: relative;
    height: 250px;
  }

  div.bottom {
    /*box-shadow: 0 0 5px #cccccc;*/
  }

  div.main {
    position: relative;
    height: 50px;
  }

  div.main:hover {
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

  .clickBackground {
    background: url("../../assets/img/pasul.png");
  }

  div.main:nth-child(odd) {
    width: 100%;
    background: #fafafa
  }

  div.main:nth-child(odd):hover {
    background-color: rgb(232, 233, 237);
  }

  div.mains:hover {
    background: #fafafa !important;
    cursor: default !important;
  }

  div.bottom span, img {
    position: absolute;
    top: 17px;
  }

  div.bottom span:first-of-type {
    left: 30px;
  }

  div.bottom span.name {
    left: 195px;
  }

  div.bottom img {
    left: 150px;
    top: 8px;
  }

  div.bottom span.sing-name {
    left: 150px;
  }

  div.bottom span.singer {
    left: 500px;
    display: inline-block;
  }

  div.bottom span.album {
    left: 750px;
    display: inline-block;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  div.bottom span:last-of-type {
    left: 1100px;
  }

  span.sing-img {
    left: -600px !important;
    top: -17px !important;
  }
</style>

