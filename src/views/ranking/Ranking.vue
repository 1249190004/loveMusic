<template>
  <div>
    <div name="fade" v-if="isLoading">
      <Laoding>
      </Laoding>
    </div>
    <div class="main" v-else>
      <span class="vertical"></span>
      <h4>云音乐特色榜</h4>
      <!--    第一层循环遍历榜单-->
      <div class="wrap" v-for="(item,index) in recommendSongsPre" :key="index">
        <el-image style="width: 155px; height: 175px" :src="item.picUrl||item.coverImgUrl"></el-image>
        <div class="font-Style">{{item.name}}</div>
        <div class="number">
          <span class="triangle"></span>
          {{Math.ceil(item.playCount/10000)>10000?Math.ceil(item.playCount/100000000)+"亿":Math.ceil(item.playCount/10000)+"万"}}
        </div>

        <!--      第二次循环遍历榜单前五歌曲名-->
        <div class="author">
          <div v-for="(item,index2) in rankingSing" :key="index2+3" class="item">
            <div v-if="index*5<=index2&&index2<(index+1)*5">
           <span class="singer-position">
              <span v-if="(index2%5+1)<4" class="numberColorStyle1">
              {{index2%5+1}}
            </span>
             <span v-else class="numberColorStyle2">
              {{index2%5+1}}
            </span>
             <span :title="item.name">{{item.name}}</span>
           </span>

              <!--            第三次循环遍历榜单歌曲对应作者-->
              <div class="author-position">
              <span v-for="(item1,index3) in item.ar"
                    :key="index3">
            <span v-if="parseInt(index3) === item.ar.length-1" :title="item1.name">{{(item1.name+"/").slice(0,item1.name.length)}}</span>
            <span v-else :title="item1.name">{{(item1.name+"/")}}</span>
          </span>
              </div>
            </div>
          </div>
          <div class="see-whole" v-if="isShow"><span title="查看全部" @click="queryContent" :index="item.id">查看全部></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {getMusicList} from "../../network/ranking";
  import {getPlayList} from "../../network/ranking";
  import Laoding from "../../components/common/laoding/Laoding";

  export default {
    name: "Ranking",
    components: {
      Laoding
    },
    data() {
      return {
        recommendSongsPre: [],
        rankingSing: [],
        isShow: false,
        isLoading: true,
        singerLists: [],
        singId: [19723756, 3779629, 2884035]
      }
    },
    created() {
      this.isLoading = true
      this.getMusicList()
      this.getPlayList()
    },
    methods: {
      async getMusicList() {
        const res = await getMusicList()

        this.recommendSongsPre = res.list.filter((value, index) => {
          if (index < 3) {
            return value;
          }
        })
        console.log(this.recommendSongsPre)
      },
      async getPlayList() {
        for (let re of this.singId) {
          this.rankingSing = this.rankingSing.concat((await getPlayList(re)).playlist.tracks.filter(((value, index) => {
            if (index < 5) {
              return value;
            }
            this.isShow = true
          })))
        }
        this.isLoading = false
      },
      async queryContent(e) {
        this.$store.commit('setSingId', e.target.getAttribute("index"))
        // console.log(this.$store.getters.getSingId)
        // sessionStorage.setItem("state", JSON.stringify((await getPlayList(e.target.getAttribute("index"))).playlist))
        window.location.href = '/playListDetail'
      }
    }
  }
</script>

<style scoped>
  span.vertical {
    display: inline-block;
    width: 4px;
    height: 22px;
    background-color: red;
    margin-left: 50px;
    margin-right: 10px;
  }

  h4 {
    display: inline-block;
  }

  div.main {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    margin-bottom: -150px;
  }

  div.wrap {
    flex: 0 0 100%;
    text-align: left;
    margin-left: 50px;
    margin-top: 25px;
    display: inline-block;
    width: 180px;
    height: 190px;
    box-sizing: border-box;
    background-color: white;
    /*cursor: pointer;*/
    margin-right: 15px;
    position: relative;
  }

  .number {
    position: absolute;
    top: 5px;
    left: 115px;
    padding: 0 5px;
    z-index: 2;
    font-size: 11px;
    font-weight: bold;
    line-height: 15px;
    background-color: #000000;
    color: #ffffff;
    border-radius: 5px;
  }

  .font-Style {
    font-size: 14px;
    font-weight: bold;
  }

  .author {
    position: absolute;
    left: 180px;
    top: 0;
    width: 80%;
    background-color: #cccccc;
  }

  .numberColorStyle1 {
    color: red;
    margin-left: 2px;
  }

  .numberColorStyle2 {
    /*color: #cccccc;*/
    margin-left: 2px;
  }

  .singer-position {
    /*position: absolute;
    left: -300px;*/
  }

  .author-position {
    float: right;
    margin-right: 16px;
  }

  .item {
    /*height: 25px;*/
    line-height: 29px;
  }

  .item:nth-child(odd) {
    width: 100%;
    /*background-color: rgba(0,0,0,.9);*/
    /*color: #cccccc;*/
  }

  .item:nth-child(even) {
    width: 100%;
    background-color: gray;
    color: white;
  }

  .item:hover {
    background-color: cornflowerblue;
    opacity: .5;
    cursor: pointer;
  }

  .see-whole {
    line-height: 29px;
    height: 29px;
    background-color: rgba(0, 0, 0, .9);
    color: white;
    text-align: right;
  }

  .see-whole:hover {
    cursor: pointer;
  }
</style>
