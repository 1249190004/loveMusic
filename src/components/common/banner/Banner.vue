<template>
  <div class="wrap">
    <el-carousel height="150px" type="card">
      <el-carousel-item v-for="(item,index) in rotationChart" :key="index">
        <span v-if="path==='/radioStation'"><img :src="item.pic" alt=""></span>
        <img :src="item.imageUrl" alt="" v-else>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

  export default {
    name: "Banner",
    props: {
      rotationChart: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        path: ''
      }
    },
    created() {
      this.path = this.$route.path
    }
  }
</script>

<style lang="less" scoped>
  .wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    line-height: 180px;
    /*height: 260px;*/

    .el-carousel {
      width: 90%;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }
    }
  }

  /deep/ .el-carousel__indicators {
    margin-top: -50px;
  }

</style>
