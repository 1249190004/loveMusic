<template>
  <div class="main">
    <div class="top">
      <div class="cover">
        <el-image :src="singer.img1v1Url" class="head"></el-image>
        <img src="../../assets/img/arrow-lr.png" alt="">
        <p class="name">{{singer.name}}</p>
        <p class="attention">+关注TA</p>
        <p class="introduce">{{singer.briefDesc}}</p>
        <ul>
          <li><p class="num">{{singer.musicSize}}</p>
            <p class="text">单曲数</p></li>
          <li><p class="num">{{singer.albumSize}}</p>
            <p class="text">专辑数</p></li>
          <li><p class="num">{{singer.mvSize}}</p>
            <p class="text">MV数</p></li>
        </ul>
      </div>
    </div>

    <div class="bottom">
      <el-menu mode="horizontal" :default-active="isActive" @click.native="clickShowContent">
        <!--      <el-menu-item class="result">搜索结果</el-menu-item>-->
        <el-menu-item :type="item.id" v-for="(item,index) in  list" :index="item.path" :key="index" :path="item.path">
          {{item.name}}
        </el-menu-item>
      </el-menu>
      <PlayMusicDetail v-if="'/playMusicDetails'===this.isActive"></PlayMusicDetail>
      <Album v-if="'/album'===this.isActive"></Album>
      <SingerIntroduce v-if="'/searchSinger'===this.isActive" :brief-desc="briefDesc" :name="name"></SingerIntroduce>
      <div v-if="'/recommendSongSheet'===this.isActive">
        <img src="../../assets/img/empty.png" alt="">
        <p class="empty">哎呀，这里啥也没有~</p>
      </div>
      <Mv v-if="'/video'===this.isActive"></Mv>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  import {getSingerDetail} from "../../network/singer";

  import PlayMusicDetail from "../../components/common/playMusicDetail/PlayMusicDetail";

  import Album from "../album/Album";

  import SingerIntroduce from "../singerIntroduce/SingerIntroduce";

  import Mv from "../../components/common/mv/Mv";

  export default {
    name: "SingerDetail",
    components: {
      PlayMusicDetail,
      Album,
      SingerIntroduce,
      Mv
    },
    data() {
      return {
        singer: {},
        list: [
          {id: 1, name: '作品', path: '/playMusicDetails'},
          {id: 10, name: '专辑', path: '/album'},
          {id: 100, name: '歌手详情', path: '/searchSinger'},
          {id: 1000, name: '相似歌手', path: '/recommendSongSheet'},
          {id: 1014, name: '视频', path: '/video'},
        ],
        isActive: '/playMusicDetails',
        briefDesc: '',
        name: ''
      }
    },
    computed: {
      ...mapState({
        singerId: state => state.sing.singerId
      })
    },
    methods: {
      async getSingerDetail() {
        const res = await getSingerDetail(this.singerId)
        this.singer = res.artist
        this.briefDesc = res.artist.briefDesc
        this.name = res.artist.name
      },
      clickShowContent(e) {
        console.log(e.target.getAttribute("path"))
        this.isActive = e.target.getAttribute("path")
      },

    },
    created() {
      this.getSingerDetail()
    }
  }
</script>

<style scoped lang="less">

  div.main {
    margin-bottom: -5000px;
  }

  div.top {
    width: 100%;
    position: relative;
    height: 580px;
    background: url(../../assets/img/top-bg.jpg) 50% no-repeat;
    background-size: cover;

    div.cover {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .6);


      img {
        width: 100%;
        position: relative;
        top: 365px;
      }

      .el-image.head {
        position: relative;
        top: 75px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: #fff;
        border: 3px solid hsla(0, 0%, 100%, .6);

        &:hover {
          box-shadow: 0 0 15px #ffffff;
        }
      }

      p.name {
        margin-top: 20px;
        font-size: 24px;
        font-weight: 700;
        color: #fff;
        line-height: 24px;
      }

      p.attention {
        margin: 24px auto;
        padding: 0;
        height: 36px;
        width: 96px;
        font-size: 12px;
        line-height: 36px;
        color: #fff;
        border: 1px solid hsla(0, 0%, 100%, .6);
        cursor: pointer;
        border-radius: 18px;

        &:hover {
          box-shadow: 0 0 9px inset #ffffff;
        }
      }

      p.introduce {
        margin: 0 auto 24px;
        width: 740px;
        height: 48px;
        font-size: 14px;
        font-weight: 600;
        color: hsla(0, 0%, 100%, .6);
        line-height: 24px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      ul {
        list-style: none;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        li {
          margin: 0 50px;
          text-align: center;

          p.num {
            color: #ffffff;
            margin-bottom: 8px;
            font-size: 24px;
            line-height: 24px;
            font-weight: bold;
          }

          p.text {
            color: hsla(0, 0%, 100%, .6);
          }
        }
      }
    }
  }

  div.bottom {
    margin-top: 30px;

    ul {
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;

      li {
        margin: 0 20px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
      }
    }

    p.empty{
      margin: -20px auto 20px;
    }
  }

  .is-active {
    border-bottom: 1px solid !important;
  }
</style>
