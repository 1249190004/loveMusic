<template>
  <div class="main">
    <h4>{{name}}简介</h4>
    <div class="profile">{{briefDesc}}</div>
    <div class="wrap" v-for="(item,index) in introduce.introduction" :key="index">
      <h3>{{item.ti}}</h3>
      <p class="text" v-html="item.txt"></p>
    </div>
  </div>
</template>

<script>

  import {getSingerIntroduce} from "../../network/singer";

  import {mapState} from "vuex"


  export default {
    name: "SingerIntroduce",
    props: {
      briefDesc: {
        type: String,
        default() {
          return ''
        }
      },
      name: {
        type: String,
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        introduce: {}
      }
    },
    methods: {
      async getSingerIntroduce() {
        const res = await getSingerIntroduce(this.singerId)
        if (res.code === 200) {
          if (res.introduction.length > 0) {
            res.introduction.map(item => {
              item.txt = item.txt.replace(/(\r\n|\n|\r)/gm, '<br />')
            })
          }
          this.introduce = res
        }
        console.log(res)
      }
    },
    computed: {
      ...mapState({
        singerId: state => state.sing.singerId
      })
    },
    created() {
      this.getSingerIntroduce()
    },
  }
</script>

<style scoped lang="less">
  div.main {
    font-size: 14px;
    line-height: 1.7;
    text-align: center;

    h4 {
      text-align: center;
      position: relative;
      margin: 30px 0;
      width: 98%;
      font-size: 16px;

      &:after {
        content: "";
        width: 40px;
        height: 2px;
        background: #fa2800;
        position: absolute;
        left: 50%;
        bottom: -10px;
        margin-left: -20px;
      }
    }

    div.profile {
      margin-bottom: 20px;
      text-align: center;
    }

    div.wrap {
      text-align: left;

      h3 {
        font-size: 15px;
        margin-bottom: 10px;
      }

      p.text {
        line-height: 30px;
        margin-bottom: 10px;
      }
    }
  }
</style>
