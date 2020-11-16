<template>
  <div>
    <div name="fade" v-if="isLoading">
      <Laoding>
      </Laoding>
    </div>
    <div v-else>
      <Banner :rotation-chart="rotationChart"/>
      <h4>推荐歌单</h4>
      <RecommendSongSheet :recommend-songs="recommendSongs"/>
    </div>
  </div>
</template>

<script>
  import Banner from "../../components/common/banner/Banner";

  import RecommendSongSheet from "../../components/common/recommend/RecommendSongSheet";

  import Laoding from "../../components/common/laoding/Laoding";

  import {getRecommendSongSheet} from "../../network";

  import {getBanner} from "../../network";

  export default {
    name: "FindMusic",
    components: {
      Banner,
      RecommendSongSheet,
      Laoding
    },
    data() {
      return {
        recommendSongs: [],
        isLoading: true,
        rotationChart: []
      }
    },
    created() {
      this.getBanners()
      this.getRecommendSongSheets()
    },
    methods: {
      async getBanners() {
        const res = await getBanner()
        this.rotationChart = res.banners
      },
      async getRecommendSongSheets() {
        const {result: res} = await getRecommendSongSheet()
        this.recommendSongs = res.slice(0, 30)
        this.isLoading = false
      }
    }
  }
</script>

<style scoped>
  h4 {
    margin-top: -85px;
    margin-left: 55px;
    margin-bottom: 10px;
    text-align: left;
    /*height: 60px;*/
  }
</style>
