<template>
  <div class="main" v-if="isShow">
    <div class="top">
      <div class="wrapped">
        <video :src="urls" controls autoplay></video>
      </div>
      <h4>{{briefIntroduction.data.title}}</h4>
      <div class="tag">
        <span class="tag" v-for="(item,index) in briefIntroduction.data.videoGroup" :key="index">{{item.name}}</span>
      </div>
      <div class="play">
        <span>发布：{{briefIntroduction.data.publishTime|showDate}}</span>
        <span>播放次数：{{utils.tranNumber(briefIntroduction.data.playTime||briefIntroduction
          .data.playCount,1)}}</span>
      </div>
      <div class="support">
        <span><img src="../../assets/img/like1.png" alt="">{{supportInfo.likedCount}}</span>
        <span><img src="../../assets/img/like2.png" alt="">{{supportInfo.shareCount}}</span>
        <span><img src="../../assets/img/like3.png" alt="">{{supportInfo.commentCount}}</span>
      </div>
      <div class="info">
        <img src="../../assets/img/info.png" alt="">Comments|{{supportInfo.commentCount||comments.length}}条评论
      </div>

      <div class="comments">
        <h3>精彩评论</h3>
        <Comment :comments="commentsHot"/>
        <h3>最新评论</h3>
        <Comment :comments="comments"/>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="20"
                @current-change="handleCurrentChange"
                :total="supportInfo.commentCount">
        </el-pagination>
      </div>
    </div>

    <div class="right">
      <div class="briefIntroduction">
        <h4>视频简介</h4>
        <div v-if="briefIntroduction.data.avatarUrl">
          <el-image :src="briefIntroduction.data.avatarUrl"></el-image>
          <span class="name">{{briefIntroduction.data.creator.nickname}}</span>
          <span class="title">{{briefIntroduction.data.title}}</span>
        </div>
        <span class="name" v-else>视频暂无简介</span>
      </div>

      <div class="recommend">
        <h4>相关推荐</h4>
        <div v-for="(item,index) in recommend" :key="index" class="recommend-item">
          <el-image :src="item.coverUrl"></el-image>
          <span class="name">{{item.title}}</span>
          <span class="title">{{item.creator[0].userName}}</span>
          <span class="play" @click="clickVideoDetail">
            <img src="../../assets/img/play1.png" alt="" :vid="item.vid">
         </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {
    getPlayMvDetail,
    getPlayVideoDetail,
    getPlayRelated,
    getVideoInfo,
    getMvComment,
    getVideoComment, getPlayMvList, getPlayVideoList
  } from "../../network/video";

  import {formatDate} from "../../common/util";

  import Comment from "../../components/common/comment/Comment";

  export default {
    name: "VideoDetail",
    components: {
      Comment
    },
    data() {
      return {
        url: {},
        briefIntroduction: {},
        isShow: false,
        recommend: [],
        supportInfo: {},
        commentsHot: [],
        comments: [],
        id: ''
      }
    },
    methods: {
      async getPlayMvDetail(mvid) {
        this.briefIntroduction = await getPlayMvDetail(mvid)
        this.isShow = true
      },
      async getPlayVideoDetail(id) {
        this.briefIntroduction = await getPlayVideoDetail(id)
        this.isShow = true
      },
      async getPlayRelated(id) {
        const res = await getPlayRelated(id)
        this.recommend = res.data
        console.log(this.recommend)
      },
      async getVideoInfo(vid) {
        const res = await getVideoInfo(vid)
        this.supportInfo = res
      },
      async getVideoComment(id, offset) {
        const res = await getVideoComment(id, offset)
        this.commentsHot = res.hotComments
        this.comments = res.comments
        console.log(res)
      },
      async getMvComment(id, offset) {
        const res = await getMvComment(id, offset)
        this.commentsHot = res.hotComments
        this.comments = res.comments
        console.log(res)
      },
      handleCurrentChange(page) {
        this.getVideoComment(this.id, page)
      },
      async clickVideoDetail(e){
        let data = null;
        if (e.target.getAttribute("vid").length < 10) {
          data = await getPlayMvList(parseInt(e.target.getAttribute("vid")))
        } else {
          data = await getPlayVideoList(e.target.getAttribute("vid"))
        }
        sessionStorage.setItem("url", JSON.stringify(data))
        window.location.href = '/videoDetail'
      }
    },
    created() {
      this.url = JSON.parse(sessionStorage.getItem("url"))
      if (this.url.data) {
        this.id = this.url.data.id
        this.getPlayMvDetail(this.id)
        this.getPlayRelated(this.id)

        this.getMvComment(this.id)

      } else {
        this.id = this.url.urls[0].id
        this.getPlayVideoDetail(this.id)
        this.getPlayRelated(this.id)
        this.getVideoInfo(this.id)

        this.getVideoComment(this.id)
      }
    },
    computed: {
      urls() {
        return this.url.data ? this.url.data.url : this.url.urls[0].url
      }
    },
    filters: {
      showDate(value) {
        let date = new Date(value);
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped lang="less">
  .el-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
  }

  div.main {
    margin-bottom: -5000px;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    justify-content: center;

    div.top, div.briefIntroduction {
      box-shadow: 0 0 15px #cccccc;
      border-radius: 5px;
    }

    div.right {
      margin-left: 15px;
    }

    div.wrapped {
      /*height: 640px;*/
      width: 750px;
      flex: 0 0 75%;

      video {
        width: 95%;
        margin-top: 12px;
        /*height: 100%;*/
      }
    }

    div.right {
      flex: 0 0 28%;
    }

    div.briefIntroduction {
      position: relative;
      left: 5px;
      height: 110px;
      padding: 10px;

      h4 {
        text-align: left;
        margin-left: 5px;
      }

      span, .el-image {
        position: absolute;
        font-size: 15px;
      }

      .el-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        top: 35px;
        left: 10px;
      }

      span.title {
        left: 10px;
        top: 88px;
      }

      span.name {
        top: 45px;
        left: 55px;
      }
    }

    div.recommend {
      position: relative;
      left: 5px;
      /*height: 110px;*/
      /*padding: 10px;*/
      margin-top: 15px;
      box-shadow: 0 0 15px #cccccc;
      border-radius: 5px;
      overflow: hidden;

      span.play {
        top: 75px;
        z-index: 999;
        position: absolute;
        left: 41%;
        display: none;
        cursor: pointer;
      }

      div.recommend-item {
        margin-top: 15px;
        position: relative;

        &:hover span.play{
          display: block;
        }
      }

      .el-image {
        width: 95%;
      }

      span {
        display: block;
        text-align: left;
        padding-left: 15px;
      }

      span.name {
        font-weight: bold;
      }

      span.title {
        font-size: 14px;
        color: gray;
      }

      h4 {
        text-align: left;
        margin-left: 15px;
        margin-top: 8px;
      }
    }

    div.top {
      padding-bottom: 25px;

      h4 {
        text-align: left;
        margin-left: 18px;
        margin-top: 5px;
        font-family: "Kristen ITC" !important;
      }

      div.tag, div.play, div.support, div.info, div.comments {
        text-align: left;
        margin-left: 18px;
        margin-top: 8px;
      }

      span.tag {
        display: inline-block;
        text-align: left;
        font-size: 13px;
        color: red;
        margin-left: 5px;
      }

      div.play {
        span {
          margin-right: 25px;
          color: gray;
          font-size: 14px;
        }
      }

      div.support {
        span {
          width: 60px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border-radius: 15px;
          padding: 0 15px;
          background: #f2f2f2;
          margin-right: 15px;
          color: #161e27;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          display: inline-block;
          overflow: hidden;

          img {
            vertical-align: -2px;
          }
        }
      }

      div.info {
        margin-top: 35px;
        width: 95%;
        height: 50px;
        border-bottom: 1px solid #cccccc;

        img {
          margin-right: 8px;
        }
      }

      div.comments {
        overflow: hidden;

        h3 {
          margin: 25px 0;
        }
      }
    }
  }

</style>
