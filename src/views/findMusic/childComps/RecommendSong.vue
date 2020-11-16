<template>
  <div>
    <!--<h4>推荐歌曲</h4>
    <div class="wrap">
      <div class="song-item" v-for="(item,index) in songs" :key="index">
        <div class="item1">
          <span>{{('00' + (index+1)).substr((index+1+' ').length-1)}}</span>
          <div><img :src="item.picUrl" alt=""></div>
          <p>
            <span>{{item.name}}</span><br>
            <span>{{item.song.album.artists[0].name}}</span>
          </p>
        </div>
        <p class="item2">《{{item.name}}》</p>
        <span class="item3">{{ utils.formatSecondTime(item.song.duration/1000) }}</span>
      </div>
    </div>-->
  </div>
</template>

<script>
  import {getRecommendSong} from "../../../network";

  export default {
    name: "RecommendSong",
    data() {
      return {
        songs: []
      }
    },
    created() {
      this.getRecommendSonges()
    },
    methods: {
      async getRecommendSonges() {
        const res = await getRecommendSong()
        this.songs = res.result
      }
    }
  }
</script>

<style lang="less" scoped>
  h4{
    margin-top: 35px;
    margin-left: 50px;
  }
  .wrap {
    width: 95%;
    display: flex;
    margin: 0 auto;
    flex-flow: row wrap;
    font-size: 14px;
  }

  .song-item {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    height: 80px;
    flex: 45%;
    border-bottom: solid 1px #e6e6e6;
    margin: 10px;
    box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
  }

  img {
    width: 55px;
    height: 55px;
  }

  .item1, .item2, .item3 {
    flex: 50%;
    text-align: center;
  }

  .item1 {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    span, div, p {
      flex: 33%;
      overflow: hidden; /* 超出的部分隐藏起来 */
      white-space: nowrap; /* 不显示的地方用省略号...代替 */
      text-align: center;
      text-overflow: ellipsis
    }
  }

  .item2, .item1 span:first-of-type, .item3 {
    font-weight: bold;
  }
</style>
