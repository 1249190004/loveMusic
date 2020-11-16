<template>
  <div class="main">
    <div name="fade" v-if="isLoading">
      <Laoding>
      </Laoding>
      <div class="wrapped">
        <span>共{{total}}条</span>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="31"
                :total="parseInt(total)"
                @current-change="changePage"
                :current-page="currentPage">
        </el-pagination>
      </div>
    </div>
    <div v-else>
      <MenuList @btnClick="btnClick" @itemClick="itemClick"/>
      <div name="fade" v-if="isLoadings">
        <Laoding>
        </Laoding>
      </div>
      <RecommendSongSheet :recommend-songs="songsList" v-else/>
      <div class="wrapped">
        <span>共{{total}}条</span>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="24"
                :total="parseInt(total)"
                @current-change="changePage"
                @next-click="changePage"
                :current-page="currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuList from "../../components/content/menuBar/MenuList";
  import RecommendSongSheet from "../../components/common/recommend/RecommendSongSheet";
  import Laoding from "../../components/common/laoding/Laoding";

  import {getSongSheetTag} from "../../network/songSheet";

  export default {
    name: "SongSheet",
    data() {
      return {
        songsList: [],
        songsLists: {
          order: "hot",
          cat: "全部",
          limit: 24,
          offset: 0
        },
        total: '',
        isLoading: true,
        isLoadings: false,
        currentPage: 1
      }
    },
    components: {
      MenuList,
      RecommendSongSheet,
      Laoding
    },
    created() {
      if (sessionStorage.getItem('tag')) {
        this.itemClick(sessionStorage.getItem('tag'))
      } else {
        this.getSongSheetTag()
      }
    },
    methods: {
      async getSongSheetTag() {
        const res = await getSongSheetTag(this.songsLists)

        this.songsList = res.playlists
        this.total = res.total
        if (res) {
          this.isLoading = false
          this.isLoadings = false
        }
      },
      changePage(newPage) {
        this.songsLists.offset = newPage * this.songsLists.limit
        this.currentPage = newPage
        this.isLoading = true
        this.getSongSheetTag()
      },
      btnClick(item) {
        this.isLoadings = true
        this.songsLists.order = item
        this.songsLists.offset = 0
        this.currentPage = 0
        this.getSongSheetTag()
      },
      async itemClick(tag) {
        this.songsLists.cat = tag
        this.songsLists.offset = 0
        this.currentPage = 0
        this.isLoadings = true
        await this.getSongSheetTag()
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin-bottom: -5000px;
  }

  .el-pagination {
    padding: 0;
  }

  .wrapped {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    /*margin: 350px 0 50px;*/
    position: relative;
    z-index: 999;
    /*left: 680px;*/
    bottom: -600px;
    height: 50px;
  }
</style>
