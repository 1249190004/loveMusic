<template>
  <div>
    <div class="wrap" v-for="(item,index) in comments" :key="index">
      <img :src="item.user.avatarUrl" alt="" class="head">
      <div class="top">
        <span class="name">{{item.user.nickname}}</span>
        <span class="time">{{utils.formatMsgTime(item.time)}}</span>
      </div>
      <div class="content">
        <span class="content">{{item.content}}</span>
        <div class="replay" v-if="item.beReplied.length!==0">
          <span class="name">@{{item.beReplied[0].user.nickname}}</span> : {{item.beReplied[0].content}}
        </div>
      </div>
      <span class="support">
            <img src="../../../assets/img/support.png" alt="">
            ({{item.likedCount}})|
            <img src="../../../assets/img/info.png" alt="">
          </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Comment",
    props: {
      comments: {}
    }
  }
</script>

<style scoped lang="less">
  div.wrap {
    position: relative;
    width: 95%;
    height: 100px;

    div.top{
      position: relative;
      /*top: -50px;*/
      left: 50px;
    }
    img, span {
      position: absolute;
    }

    img.head {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    span.name {
      left: 50px;
      top: 5px;
      position: static!important;
      font-weight: bold;
    }


    div.content {
      position: absolute;
      left: 50px;
      top: 25px;
      height: auto;
      width: 93%;
      font-size: 12px;
      color: #4a4a4a;
      line-height: 1.6;
      padding: 8px 10px;
      background: #f5f5f5;
      margin-top: 5px;
      border-radius: 3px;
      font-family: "Kristen ITC";

      span {
        position: static !important;
      }

      div.replay {
        height: 25px;
        line-height: 25px;
        background: #ffffff;

        span.name {
          color: red;
        }
      }
    }

    span.time {
      position: static!important;
      display: inline-block;
      margin-left: 10px;
      /*left: 165px;*/
      /*top: 8px;*/
      color: gray;
      font-size: 13px;
    }

    span.support {
      right: 0;
      font-size: 14px;
      text-align: center;
      top: 5px;

      img {
        position: static;
        vertical-align: -2px;
      }
    }
  }
</style>
