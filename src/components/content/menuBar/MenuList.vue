<template>
  <div class="wrap">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{isShow}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" style="overflow:scroll">
        <div v-for="(item,index1) in categories" :key="index1" class="content">
          <h4>{{item}}</h4>
          <span v-for="(item,index2) in cateList" :key="index2" @click="clickTag">
            <el-tag v-if="parseInt(index1)===parseInt(item.category)">{{item.name}}</el-tag>
          </span>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <el-menu mode="horizontal" @click.native="clickTag" :default-active="isActive">
      <span>热门标签:</span>
      <el-menu-item v-for="(item,index) in hotCateList" :key="index" :index="item.name">{{item.name}}</el-menu-item>
      <!--      <el-menu-item></el-menu-item>-->
    </el-menu>
    <div @click="btnClick" class="main">
      <button :class="{isActive:currentType===1}">{{hot}}</button>
      <button :class="{isActive:currentType===2}">{{news}}</button>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  import {getSongSheetList, getHotSongSheetList} from "../../../network/songSheet";

  export default {
    name: "MenuList",
    data() {
      return {
        cateList: [],
        categories: {},
        active: '',
        hotCateList: [],
        hot: '热门',
        news: '最新',
        currentType: 1,
        isShow: '全部'
      }
    },
    computed: {
      ...mapState({
        isActive: state => state.sing.isActive
      })
    },
    created() {
      this.getSongSheetLists()
      this.getHotSongSheetLists()
      if (sessionStorage.getItem('tag')){
        this.isShow = sessionStorage.getItem('tag')
        sessionStorage.removeItem('tag')
      }
    },
    methods: {
      async getSongSheetLists() {
        const res = await getSongSheetList()
        this.categories = res.categories
        this.cateList = res.sub
      },
      async getHotSongSheetLists() {
        const res = await getHotSongSheetList()
        this.hotCateList = res.tags
        // console.log(res.tags)
      },
      btnClick(event) {
        if (event.target.innerHTML === '热门') {
          this.currentType = 1
          this.$emit('btnClick', 'hot')
        } else {
          this.currentType = 2
          this.$emit('btnClick', 'new')
        }
      },
      clickTag(e) {
        this.isShow = e.target.innerText
        this.$store.commit('setIsActive', e.target.innerText)
        console.log(this.isActiveItem)
        this.$emit('itemClick', e.target.innerText)
      }
    }
  }
</script>

<style lang="less" scoped>
  .wrap {
    width: 95%;
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
      width: 65px;
      height: 50px;

      i {
        margin-left: 10px;
      }
    }

  }

  .main {
    margin-left: 100px;
  }

  .el-tag {
    padding: 8px 18px;
    background: #f7f7f7;
    border-radius: 16px;
    margin: 0 10px 10px 0;
    cursor: pointer;
    font-size: 12px;
    color: #161e27 !important;
    transition: all .3s;
    line-height: 16px;

    &:hover {
      background: red;
      color: #ffffff !important;
    }
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
      width: 75px;
    }
  }

  button {
    border: none;
    margin-left: 15px;
    padding: 5px 10px;
    background: #f7f7f7;
    cursor: pointer;
    z-index: 999;
    outline: none;
    border-radius: 3px;
  }

  .el-dropdown-menu {
    width: 45%;
    height: 50%;
  }

  .isActive {
    background-color: #fa2800;
    color: #ffffff;
  }

  .is-active {
    font-weight: bold;
  }

  /*css主要部分的样式*/
  /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
  /*ie不兼容*/
  ::-webkit-scrollbar {
    width: 1px; /*对垂直流动条有效*/
    height: 0; /*对水平流动条有效*/
  }

  /*定义滚动条的轨道颜色、内阴影及圆角*/
  /*::-webkit-scrollbar-track {*/
  /*  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
  /*  background-color: rosybrown;*/
  /*  border-radius: 3px;*/
  /*}*/


  /*!*定义滑块颜色、内阴影及圆角*!*/
  /*::-webkit-scrollbar-thumb {*/
  /*  !*border-radius: 7px;*!*/
  /*  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
  /*  background-color: #E8E8E8;*/
  /*}*/

  /*!*定义两端按钮的样式*!*/
  /*::-webkit-scrollbar-button {*/
  /*  !*background-color: cyan;*!*/
  /*}*/

  /*!*定义右下角汇合处的样式*!*/
  /*::-webkit-scrollbar-corner {*/
  /*  !*background:khaki;*!*/
  /*}*/
</style>
