<template>
  <div class="main">
    <el-menu mode="horizontal" :default-active="isActive1" @click.native="clickKind">
      <el-menu-item :index="item.area" v-for="(item,index) in singerKind" :key="index" :area="item.area">{{item.name}}
      </el-menu-item>
    </el-menu>
    <el-menu mode="horizontal" :default-active="isActive2" @click.native="clickSex">
      <el-menu-item :index="item.type" v-for="(item,index) in singerSex" :key="index" :type="item.type">{{item.name}}
      </el-menu-item>
    </el-menu>
    <el-menu mode="horizontal" :default-active="isActive3" @click.native="clickLetter">
      <el-menu-item class="el-menu-demo" :index="item" v-for="(item,index) in letter" :key="index">{{item}}
      </el-menu-item>
    </el-menu>
    <div name="fade" v-if="isLoading">
      <Laoding>
      </Laoding>
    </div>
    <div class="wrap" v-else>
      <div v-for="(item,index) in singer" :key="index">
        <span class="image">
          <el-image :src="item.img1v1Url" lazy :id="item.id" @click.native="singerDetail"></el-image>
          <!--          <img :src="item.img1v1Url" alt="" @load="photoComplete">-->
        </span>
        <span>{{item.name}}</span>
        <span>单曲数{{item.musicSize}}</span>
      </div>
    </div>
  </div>
</template>

<script>

  import Laoding from "../../components/common/laoding/Laoding";
  import {getKindSinger} from "../../network/singer";

  export default {
    name: "Singer",
    components: {
      Laoding
    },
    data() {
      return {
        singerList: [],
        singerKind:
          [
            {area: "-1", name: '全部'},
            {area: "7", name: '华语'},
            {area: "96", name: '欧美'},
            {area: "8", name: '日本'},
            {area: "16", name: '韩国'},
            {area: "0", name: '其他'},
          ]
        ,
        singerSex:
          [
            {type: "-1", name: '全部'},
            {type: "1", name: '男歌手'},
            {type: "2", name: '女歌手'},
            {type: "3", name: '乐队'},
          ],
        letter: [],
        singerImgUrl: [],
        isActive1: "-1",
        isActive2: "-1",
        isActive3: "-1",
        isLoading: true,
        singer: [],
        offset: 0,
        limit: 96
      }
    },
    created() {
      for (let i = 65; i < 91; i++) {
        this.letter.push(String.fromCharCode(i))
      }
      this.letter.push('其他')
      this.getKindSinger()
    },
    methods: {
      clickKind(e) {
        this.isActive1 = e.target.getAttribute("area")
        this.isLoading = true
        this.getKindSinger()
      },
      clickSex(e) {
        this.isActive2 = e.target.getAttribute("type")
        this.isLoading = true
        this.getKindSinger()
      },
      clickLetter(e) {
        this.isActive3 = e.target.innerText
        this.isLoading = true
        this.getKindSinger()
      },
      photoComplete() {
        this.count += 1
        if (this.count === 30) {
          this.isLoading = false
        }
      },
      async getKindSinger() {
        const res = await getKindSinger(this.isActive2, this.isActive1, this.isActive3)
        this.singer = res.artists
        this.isLoading = false
      },
      async singerDetail(e) {
        this.$store.commit("setSingerId", e.target.getAttribute("id"))
        window.location.href = '/singerDetail'
      }
    }
  }
</script>

<style lang="less" scoped>
  div.main {
    margin-bottom: -5550px;
  }

  .el-menu {
    /*margin-top: 15px;*/
    text-align: center;
  }

  .el-menu, .el-menu-item {
    font-size: 13px;
    border: none !important;
    height: 50px;
    line-height: 50px;
  }

  .el-menu-demo {
    width: 45px;
  }

  .is-active {
    /*background: #fa2800;*/
    /*color: #fff !important;*/
    font-weight: bold !important;
    /*border-radius: 14px;*/

    &:hover {
      /*background: red !important;*/
    }
  }

  h4 {
    margin-left: 50px;
  }

  p {
    /*height: 500px;*/
    text-align: center;
    line-height: 50px;
    font-weight: bold;
    height: 50px;
    width: 100%;
  }

  .wrap {
    display: flex;
    flex-flow: row wrap;
    /*width: 500px;*/
    height: 100%;

    .el-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      cursor: pointer;
    }

    div {
      flex: 12%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      /*padding: 25px 0;*/
      border: 1px solid #ffffff;
      box-sizing: border-box;
    }

    span {
      margin-top: 8px;
      font-size: 14px;
      font-weight: bold;
    }

    span:last-of-type {
      font-size: 12px;
      color: red;
    }
  }
</style>
