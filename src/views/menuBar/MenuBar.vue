<template>
  <div>
    <el-menu :default-active="getHighElement"
             class="el-menu-demo"
             mode="horizontal"
             :router="true"
             active-text-color="#409EFF">
      <el-menu-item index="/find">推荐</el-menu-item>
      <el-menu-item index="/ranking">排行榜</el-menu-item>
      <el-menu-item index="/singSheet">歌单</el-menu-item>
      <el-menu-item index="/singer">歌手</el-menu-item>
      <el-menu-item index="/radioStation">主播电台</el-menu-item>
      <el-menu-item index="/newMusic">最新音乐</el-menu-item>
      <el-menu-item>
        <el-autocomplete
                class="inline-input"
                v-model="state"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
                suffix-icon="el-icon-search"
                :popper-append-to-body="false"
                @change="handleSearch"
                @keydown.native="enterSearch"
        >
          <i
                  class="el-icon-edit el-input__icon"
                  slot="suffix"
                  :popper-append-to-body="false">
          </i>
          <template slot-scope="{ item }" :popper-append-to-body="false">
            <h3 class="search-suggest">{{item.title}}</h3>
            <div class="wrap">
              <span class="number">{{item.index}}</span>
              <span class="name">{{ item.value }}</span>
              <span class="content">{{item.content}}</span>
              <span class="score">{{ item.score }}</span>
            </div>
          </template>
        </el-autocomplete>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import {getSearchSuggest} from "../../network/search";

  import {getSearchList} from "../../network/search";

  export default {
    name: "MenuBar",
    data() {
      return {
        musicName: [],
        path: [],
        state: ''
      }
    },
    computed: {
      getHighElement() {
        return this.$route.path
      }
    },
    methods: {
      async getSearchSuggest() {
        const res = await getSearchSuggest()
        //增加对象数组index项
        // res.data.splice(0, 0, {"title": '热搜榜'})
        for (let i = 0; i < res.data.length; i++) {
          // res.data[0]['title'] = '热搜榜'

          res.data[i]['index'] = i + 1
        }
        //修改对象数组里的对象属性名
        this.musicName = JSON.parse(JSON.stringify(res.data).replace(/searchWord/g, 'value'))
      },
      querySearch(queryString, cb) {
        let restaurants = this.musicName;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(data) {
        this.handleSearch(data.value)
      },
      async handleSearch(value) {
        const data = await getSearchList(value)
        this.$store.commit('setSingList', data.result)
        sessionStorage.setItem("name", this.state)
        window.location.href = "/menu"
      },
      enterSearch(e) {
        if (e.key === "Enter") {
          this.handleSearch(this.state)
        }
      }
    },
    created() {
      // this.querySearch()
      this.getSearchSuggest()
    }
  }
</script>

<style scoped lang="less">

  /deep/ .el-autocomplete-suggestion li {
    height: 65px !important;
    position: relative;

    span {
      position: absolute;
      /*left: 5px;*/
    }

    &:hover {
      background: rgba(135, 135, 135, .2);
    }

    span.number {
      line-height: 65px;
      font-size: 17px;
      /*font-weight: bold;*/
    }


    span.name {
      top: 5px;
      left: 38px;
    }

    span.content {
      top: 26px;
      left: 38px;
      opacity: .8;
      font-size: 13px;
    }

    span.score {
      top: 8px;
      left: 125px;
      color: #cccccc;
    }
  }

  /deep/ .el-autocomplete-suggestion li:nth-child(-n+3) {
    span.number {
      color: red;
      font-weight: bold;
    }

    span.name {
      font-weight: bold;
    }
  }

  /deep/ .el-popper[x-placement^=bottom] {
    width: 400px !important;
    height: 500px;
    z-index: 999;
    box-shadow: 0 0 15px #cccccc;
  }

  /deep/ .el-scrollbar__wrap {
    max-height: 500px !important;
  }

  /*/deep/ .el-scrollbar__wrap--hidden-default {*/
  /*  height: 500px !important;*/
  /*}*/

  /*/deep/ .el-scrollbar__wrap--hidden-default {*/
  /*  max-height: 100%;*/
  /*  height: 500px;*/
  /*}*/

  /*/deep/ .el-autocomplete-suggestion__wrap, .el-scrollbar__wrap {*/
  /*  max-height: 500px;*/
  /*}*/

  /*/deep/ .el-scrollbar__wrap {*/
  /*  max-height: 350px;*/
  /*}*/

  .my-autocomplete {

    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }

  /deep/ .el-input__inner {
    width: 250px !important;
    display: inline-block !important;
    border-radius: 25px !important;
  }

  .el-menu-demo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-menu-item {
    font-size: 18px;
  }

  .el-menu-item:last-of-type {
    border: none !important;
  }

  .el-autocomplete-suggestion,
  .el-popper {
    width: 850px !important;
  }

</style>
