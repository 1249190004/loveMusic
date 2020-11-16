<template>
  <div class="wrap">
    <el-dropdown>
      <span class="el-dropdown-link">
        全部<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" style="overflow:scroll">
          <span v-for="(item,index2) in cateList" :key="index2">
            <el-tag>{{item.name}}</el-tag>
          </span>
      </el-dropdown-menu>
    </el-dropdown>
    <el-menu mode="horizontal">
      <span>分类:</span>
      <el-menu-item v-for="(item,index) in hotCateList" :key="index">{{item.name}}</el-menu-item>
      <el-menu-item></el-menu-item>
    </el-menu>
    <div style="margin-left: 25%">
      <button>全部</button>
    </div>
  </div>
</template>

<script>
  import {getVideo, getHotVideo} from "../../../network/video";

  export default {
    name: "MenuVideoList",
    data() {
      return {
        cateList: [],
        active: '',
        hotCateList: []
      }
    },
    created() {
      this.getVideos()
      this.getHotVideos()
    },
    methods: {
      async getVideos() {
        const res = await getVideo()
        this.cateList = res.data
        // console.log(res)
      },
      async getHotVideos() {
        const res = await getHotVideo()
        if (res.code !== 200){
         this.$message.error('error')
        }
        this.hotCateList = res.data
      }
    }
  }
</script>

<style lang="less" scoped>
  .wrap {
    width: 100%;
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    margin-bottom: 20px;
    padding-right: 20px;
    border-radius: 5px 0 5px 5px;
    box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
  }

  .el-dropdown {
    outline: none;

    .el-dropdown-link {
      padding: 10px 15px;
      background: #fa2800;
      border-radius: 5px 0 5px 5px;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        margin-left: 10px;
      }
    }

  }

  .el-tag {
    padding: 8px 18px;
    background: #f7f7f7;
    border-radius: 16px;
    margin: 0 10px 10px 0;
    cursor: pointer;
    font-size: 12px;
    color: #161e27 !important;
    transition: all 0.4s;
    line-height: 16px;


  }

  h4 {
    display: flex;
    align-items: center;
    font-size: 15px;
    margin-bottom: 15px;
    color: #161e27;
    margin-top: 15px;
  }

  .content {
    margin-left: 15px;
  }

  .el-menu {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }

  button {
    border: none;
    margin-left: 150px;
    padding: 5px 10px;
    background-color: #fa2800;
    color: #ffffff;
    cursor: pointer
  }

  .el-dropdown-menu {
    width: 45%;
    height: 50%;
  }

  /*css主要部分的样式*/
  /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
  /*ie不兼容*/
  ::-webkit-scrollbar {
    width: 1px; /*对垂直流动条有效*/
    height: 0; /*对水平流动条有效*/
  }
</style>
