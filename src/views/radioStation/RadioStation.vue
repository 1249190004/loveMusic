<template>
  <div>
    <div name="fade" v-if="isLoading">
      <Laoding>
      </Laoding>
    </div>
    <Banner :rotation-chart="radioList" v-else/>
    <div class="tag">
      <el-tag v-for="(item,index) in categories" :key="index" type="info">
        {{item.name}}
      </el-tag>
    </div>
    <h4>推荐</h4>
    <div class="radio-main">
      <div class="main" v-for="(item,index) in recommend" :key="index" @click="clickDetail" :index="item.id">
        <img :src="item.picUrl" alt="">
        <img :src="item.dj.avatarUrl" alt="" class="avatarUrl">
        <span class="name">{{item.dj.nickname}}</span>
        <span class="copywriter">{{item.copywriter}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getRadioBanner} from "../../network/radio";

  import {getRadioCategories} from "../../network/radio";

  import {getRadioRecommend} from "../../network/radio";

  import {getRadioDetail} from "../../network/radio";

  import Laoding from "../../components/common/laoding/Laoding";

  import Banner from "../../components/common/banner/Banner";

  export default {
    name: "RadioStation",
    components: {
      Banner,
      Laoding
    },
    data() {
      return {
        radioList: [],
        categories: [],
        recommend: [],
        isLoading: true
      }
    },
    methods: {
      async getRadioBanner() {
        const res = await getRadioBanner()
        this.radioList = res.data
      },
      async getRadioCategories() {
        const res = await getRadioCategories()
        this.categories = res.categories
      },
      async getRadioRecommend() {
        const res = await getRadioRecommend()
        this.recommend = res.djRadios
        this.isLoading = false
      },
      async getRadioDetail(rid){
        const res = await getRadioDetail(rid)
        sessionStorage.setItem("state", JSON.stringify(res.programs))
        window.location.href = "/radioDetail"
      },
      clickDetail(e){
        this.getRadioDetail(e.target.parentElement.getAttribute("index"))
      }
    },
    created() {
      this.getRadioBanner()
      this.getRadioCategories()
      this.getRadioRecommend()
    }
  }
</script>

<style scoped lang="less">
  .tag {
    position: relative;
    top: -85px;

    .el-tag {
      margin-right: 15px;
    }
  }

  div.radio-main {
    margin-bottom: -100000%;
    width: 100%;
    border-top: 1px solid #cccccc;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    align-items: center;
  }

  div.main img {
    width: 100%;
    height: 200px;
  }

  div.main img, span {
    position: absolute;
    left: 10px;
  }

  .el-tag {
    position: static;
  }

  div.main {
    /*width: 33%;*/
    height: 270px;
    flex: 0 0 17%;
    position: relative;
    box-shadow: 0 0 15px black;
    left: 70px;
    top: 5px;
    border-radius: 10px;
    margin-right: 5px;
    margin-top: 15px;
    transition: all linear .2s;
    cursor: pointer;
  }

  div.main img:first-of-type {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  div.main img:first-of-type {
    /*top: 5px;*/
    left: 0;
  }

  div.main:hover {
    transform: translateY(-10px);
  }

  span.name {
    top: 202px;
    left: 35px;
  }

  span.copywriter {
    top: 225px;
  }

  img.avatarUrl {
    width: 24px !important;
    height: 24px !important;
    position: absolute;
    border-radius: 50%;
    top: 200px;
    /*top: 0;*/
  }

  h4 {
    text-align: left;
    margin-top: -50px;
  }
</style>
