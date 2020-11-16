<template>
  <div>
    <div name="fade" v-if="isLoading">
      <Laoding>
      </Laoding>
    </div>
    <div class="bottom" v-else>
      <div class="maines mains">
        <span>序号</span>
        <span class="name sing-name">歌曲</span>
        <span class="singer">歌手</span>
        <span class="album">专辑</span>
        <span>时长</span>
      </div>
      <div>
        <div v-for="(item,index) in historySing.length===0?(print.tracks==null?(print.songs==null?print.hotSongs:print.songs):print.tracks):historySing"
             :key="index" class="maines">
          <span class="number" :index="item.id||item.song.id" @click="playMusic">{{('00'+(index+1)).substring(parseInt(('00'+(index+1)).length/2),('00'+(index+1)).length)}}</span>
          <el-image :src="item.song!=null?item.song.al.picUrl:item.al.picUrl" lazy></el-image>
          <span class="name" :title="item.song==null?item.name:item.song.name">{{item.song==null?item.name:item.song.name}}</span>
          <span class="singer">{{item.song!=null?item.song.ar[0].name:item.ar[0].name}}</span>
          <span class="album" :title="item.song==null?item.al.name:item.song.al.name">{{item.song==null?item.al.name:item.song.al.name}}</span>
          <span style="display: none">{{item.dt/1000||item.song.dt}}</span>
          <span>{{utils.formatSecondTime(item.dt/1000||item.song.dt/1000)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

  import {getPlayRecord} from "../../../network/profile";

  import {mapState} from "vuex"

  import {getSongSheetLists} from "../../../network/songSheet";

  import {getSearchList} from "../../../network/search";

  import {getSingerDetail} from "../../../network/singer";

  import {getAlbumDetail} from "../../../network/ranking";

  import {getPlayMusic, getLyric} from "../../../network/play";

  import Laoding from "../../../components/common/laoding/Laoding";


  export default {
    name: "PlayMusicDetail",
    components: {
      Laoding
    },
    data() {
      return {
        historySing: [],
        isLoading: true,
        print: {},
        time: ''
      }
    },
    computed: {
      ...mapState({
        singId: state => state.sing.singId,
        singerId: state => state.sing.singerId
      })
    },
    created() {
      // if (localStorage.getItem('userId') == null) {
      //   window.location.href = "/login"
      // }

      if (this.$route.matched[1].path === "/menu") {
        this.getSearchList()
      } else if (this.$route.path === '/singerDetail') {
        this.getSingerDetail()
      } else if ((this.singId + '').length === 8 && (this.singId !== 19723756)) {
        this.getAlbumDetail()
      } else if ("/playHistory" === this.$route.path) {
        this.getPlayRecord()
      } else {
        this.getSongSheetLists()
      }
      // console.log(this.historySing)
      //   if (print) {
      //     this.isLoading = false
      //   }
    },
    methods: {
      async getPlayRecord() {
        const res = await getPlayRecord(localStorage.getItem("userId"))
        this.historySing = res.allData
        this.isLoading = false
      },
      async getSongSheetLists() {
        const res = await getSongSheetLists(this.singId)
        this.print = res.playlist
        this.isLoading = false
      },
      async getSearchList() {
        const res = await getSearchList(sessionStorage.getItem('name'))
        this.print = res.result
        this.isLoading = false
        // sessionStorage.clear()
      },
      async getSingerDetail() {
        const res = await getSingerDetail(this.singerId)
        this.print = res
        this.isLoading = false
      },
      async getAlbumDetail() {
        const res = await getAlbumDetail(this.singId)
        this.print = res
        // this.time = res.songs
        this.isLoading = false
        console.log(this.print)
        console.log(res.album)
      },
      async playMusic(e) {
        let audioUrl = []
        if (sessionStorage.getItem("audioUrl") == null) {
          sessionStorage.setItem("audioUrl", JSON.stringify(audioUrl))
        }
        const res = await getPlayMusic(e.target.getAttribute("index"))
        let music = {}
        music.imgUrl = e.target.parentNode.childNodes[1].innerHTML.split("\"")[1]
        music.name = e.target.parentNode.childNodes[2].innerHTML
        music.singer = e.target.parentNode.childNodes[3].innerHTML
        music.url = res.data[0].url
        music.duration = e.target.parentNode.childNodes[5].innerHTML
        music.lyric = (await getLyric(e.target.getAttribute("index"))).lrc.lyric

        for (let music1 of JSON.parse(sessionStorage.getItem("audioUrl"))) {
          audioUrl.push(music1)
        }
        audioUrl.unshift(music)
        sessionStorage.setItem("audioUrl", JSON.stringify(audioUrl))
        this.resetSetItem('audioUrl', JSON.stringify(audioUrl));
      }
    }
  }
</script>

<style scoped lang="less">

  div.bottom {
    margin-bottom: -500000px;
  }

  .is-active {
    color: red !important;
    font-weight: bold;
  }

  .el-image, img {
    width: 36px;
    height: 36px;
  }

  .el-image {
    position: absolute;
    top: 8px;
    left: 152px;
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
    height: 50px;
  }

  .el-menu-item {
    font-size: 18px;
  }

  div.bottom {
    /*box-shadow: 0 0 5px #cccccc;*/
  }

  div.maines {
    position: relative;
    height: 50px;
    font-size: 14px;
  }

  span.number {
    display: inline-block;
    width: 18px;
  }

  div.maines:hover {
    background-color: rgb(232, 233, 237);
    cursor: pointer;

    span.number {
      background: url("../../../assets/img/play.png");
      color: transparent;
      background-size: cover;
      display: inline-block;
      width: 18px;
    }

  }

  .clickBackground {
    background: url("../../../assets/img/pasul.png");
  }


  div.maines:nth-child(odd):hover {
    background-color: rgb(232, 233, 237);
  }

  div.maines:nth-child(odd) {
    width: 100%;
    background: #fafafa
  }

  div.mains {
    color: #999;
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
    left: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    width: 175px;
    text-align: left;
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
