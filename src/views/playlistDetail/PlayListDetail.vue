<template>
  <div class="wrap">
    <!--    {{print}}-->
    <div name="fade" v-if="isLoading">
      <Laoding>
      </Laoding>
    </div>
    <div class="top" v-if="print.picUrl==null?print.coverImgUrl:print.picUrl">
      <img :src="print.picUrl==null?print.coverImgUrl:print.picUrl" alt="" class="cover">
      <ul>
        <li>
          <h2>{{print.name}}</h2>
        </li>
        <li>

          <img :src="print.artist==null?print.creator.avatarUrl:print.artist.picUrl" alt="" class="avatar" lazy>
          <span class="name">{{print.artist==null?print.creator.nickname:print.artist.name}} </span>
          <span class="time">{{(print.publishTime||print.createTime)|showDate}}创建</span>
        </li>
        <li v-if="print.company"><span class="company">发行公司：{{print.company}}</span></li>
        <li>
          <span v-if="print.tags.length !== 0">标签：</span>
          <span v-for="(item,index) in print.tags" :key="index" class="tag" @click="clickTagContent">{{item}}</span>
        </li>
        <li>
          <div class="description">{{print.description}}</div>
        </li>
      </ul>
    </div>

    <PlayMusicDetail></PlayMusicDetail>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  import {formatDate} from "../../common/util";

  import {getPlayMusic} from "../../network/play";

  import {getPlayList,} from "../../network/ranking";

  import {getAlbumDetail} from "../../network/ranking";

  import PlayMusicDetail from "../../components/common/playMusicDetail/PlayMusicDetail";

  import Laoding from "../../components/common/laoding/Laoding";

  export default {
    name: "PlayListDetail",
    components: {
      PlayMusicDetail,
      Laoding
    },
    data() {
      return {
        print: '',
        isLoading: true
      }
    },
    computed: {
      ...mapState({
        singId: state => state.sing.singId
      })
    },
    filters: {
      showDate(value) {
        let date = new Date(value);
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    methods: {
      async clickPlay(e) {
        // e.target.classList.add("clickBackground")
        const data = await getPlayMusic(e.target.getAttribute("index"))
        console.log(data)
      },
      async getPlayList() {
        const res = await getPlayList(this.singId)
        this.print = res.playlist
        this.$store.commit('setSingList', res.playlist)
        this.isLoading = false
        console.log(res.playlist)
      },
      async getAlbumDetail() {
        const res = await getAlbumDetail(this.singId)
        this.print = res.album
        this.isLoading = false
        console.log(res.album)
      },
      clickTagContent(e){
        sessionStorage.setItem('tag',e.target.innerText)
        window.location.href = "/singSheet"
      }
    },
    created() {
      if ((this.singId + '').length === 8 && (this.singId !== 19723756)) {
        this.getAlbumDetail()
      } else {
        this.getPlayList()
      }
    }
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

  ul li:last-of-type {
    margin-top: 0 !important;
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

  span.name {
    color: red;
  }

  span.time {
    font-size: 13px;
    color: grey;
  }

  div.description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-top: 20px;
  }
</style>
