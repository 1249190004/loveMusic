<template>
  <div>
    <div name="fade" v-if="isLoading">
      <Laoding>
      </Laoding>
    </div>
    <div class="wrap" v-else>
      <div v-for="(item,index) in singer" :key="index">
        <span class="image">
          <el-image :src="item.img1v1Url" @load.native="photoComplete" lazy></el-image>
          <!--          <img :src="item.img1v1Url" alt="" @load="photoComplete">-->
        </span>
        <span>{{item.name}}</span>
        <span>单曲数{{item.musicSize}}</span>
      </div>
    </div>
  </div>
</template>

<script>

  import Laoding from "../laoding/Laoding";
  import {getKindSinger} from "../../../network/singer";

  export default {
    name: "RecommendSinger",
    components: {
      Laoding
    },
    data() {
      return {
        isLoading: false,
        loading: false,
        singer: [],
        offset: 0,
        limit: 96
      }
    },
    methods: {
      photoComplete() {
        this.count += 1
        if (this.count === 30) {
          this.isLoading = false
        }
      },
      async getKindSinger() {
        const res = await getKindSinger(this.limit)
        this.singer = res.artists
      }
    },
    created() {
      this.getKindSinger()
    }
  }
</script>

<style lang="less" scoped>
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
