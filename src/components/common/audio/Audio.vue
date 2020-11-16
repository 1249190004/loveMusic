<template>
  <div>
    <audio :src="audioUrl[i].url" id="audio" @ended="overAudio" ref="audio"></audio>
    <div class="audio-box">

      <!--      歌曲信息-->
      <div class="singInformation">
        <img :src="audioUrl[i].imgUrl" alt="" class="head">
        <div class="sing">
          <div class="name">{{audioUrl[i].name}}</div>
          <div class="singer">{{audioUrl[i].singer}}</div>
        </div>
      </div>

      <!-- 控制播放-->
      <div class="control-play">
        <img src="../../../assets/img/prov.png" alt="" class="control" @click="provMusic">
        <!-- 播放 -->
        <div class="play" v-if="audioPlayShow" @click="playAudio">
          <img src="../../../assets/img/play.png" class="control">
        </div>
        <!-- 暂停-->
        <div class="play" v-else>
          <img src="../../../assets/img/pasul.png" @click="pauseAudio">
        </div>
        <img src="../../../assets/img/next.png" alt="" class="control" @click="nextMusic">
      </div>

      <span class="current-time">{{utils.formatSecondTime(currentTime)}}</span>
      <div class="wrapper" ref="wrapper" @click="setProgress">
        <div class="line-wrapper" ref="line" :style="{width: audioWidth + 'px'}">
        </div>
        <span class="circle" @mousedown="moveVoiceProgress($refs.line)"></span>
      </div>
      <span class="duration-time">{{utils.formatSecondTime(audioUrl[0].duration>1000?audioUrl[0].duration/1000:audioUrl[0].duration)}}</span>

      <!--      声音控制-->
      <div class="voice">
        <div @click="voiceControl">
          <img src="../../../assets/img/voice.png" alt="" v-if="voice">
          <img src="../../../assets/img/silence.png" alt="" v-else>
        </div>
        <div class="progress" ref="voiceProgress" @click="setVoiceProgress">
          <div class="progress-wrapper" ref="voice" :style="{width: voiceWidth + 'px'}"></div>
          <span class="circle" @mousedown="moveVoiceProgress($refs.voiceProgress)"></span>
        </div>
      </div>

      <!--歌词+播放方式+列表-->
      <div class="right">
        <div @click="playStyle" class="playStyle">
          <img src="../../../assets/img/order.png" alt="" v-if="play===0" title="顺序播放">
          <img src="../../../assets/img/loop.png" alt="" v-else-if="play===1" title="单曲循环">
          <img src="../../../assets/img/random.png" alt="" v-else title="随机播放">
        </div>
        <div class="lyric">
          <span>词</span>
          <div class="lyric-wrapper">
            <div v-if="currentLyric" class="lyric-main">
              <p
                      ref="lyricLine"
                      class="lyric-text"
                      :class="currentLyricNum === index ? 'active' : ''"
                      v-for="(item, index) of currentLyric.lines"
                      :key="index"
              >
                <!--                {{utils.formatTime(item.time)===utils.formatSecondTime(currentTime)}}-->
                {{ item.txt }}
              </p>
            </div>
            <div class="no-lyric" v-else>暂无歌词，请您欣赏</div>
          </div>
        </div>

        <!--        播放历史-->
        <div class="play-history">
          <img src="../../../assets/img/lists.png" alt="" @click="controlShow">
          <div class="history">
            <span class="title">播放历史</span>
            <img src="../../../assets/img/garbage.png" alt="" class="garbage" @click="garbage">
            <ul>
              <li v-for="(item,index) in audioUrl" :key="index">
                <span class="number" @click="playMusic" :index="index">{{utils.formatZero(index+1,2)}}</span>
                <span class="name" :title="item.name">{{item.name}}</span>
                <span class="delete"><img src="../../../assets/img/delete.png" alt="" @click="deleteItem"
                                          :index="index"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Lyric from 'lyric-parser'

  export default {
    name: "Audio",
    data() {
      return {
        audioUrl: [
          {
            imgUrl: '',
            name: '',
            singer: '',
            url: '',
            duration: 0,
            lyric: ''
          }
        ],
        audioPlayShow: true,
        audioWidth: 0,
        currentTime: 0,
        wrapWidth: 0,
        i: 0,
        voiceWidth: 150,
        voice: true,
        play: 0,
        currentLyric: null,
        currentLyricNum: 0
      }
    },
    //需要放在data下面
    watch: {},
    created() {
      this.audioUrl = JSON.parse(sessionStorage.getItem("audioUrl"))
      //监听sessionStorage值的变化
      window.addEventListener('setItem', () => {
        this.$nextTick(function () {
          this.overAudio()
        })

        this.audioUrl = JSON.parse(sessionStorage.getItem("audioUrl"))
        this.$nextTick(function () {
          this.i = 0
          this.playAudio()
        })
      })
    },
    methods: {
      playAudio() {
        clearInterval(this.audioInterval)
        this.audioPlayShow = false
        let audio = document.getElementById('audio')
        /**
         * this.$refs.line.offsetWidth 是容器的宽度
         * audio.duration 是音乐的播放时间长度
         */

        // let step = this.$refs.line.offsetWidth
        this.$nextTick(function () {
          this.wrapWidth = this.$refs.wrapper.offsetWidth
        })
        if (this.audioIsOver) {
          this.audioIsOver = false
          this.currentTime = 0
          this.audioWidth = 0
          audio.load()
        }
        this.audioInterval = setInterval(() => {
          this.audioWidth = this.add(this.audioWidth)
          this.currentTime += 1
        }, 1000)

        //解决 request was interrupted by a new load request
        this.$nextTick(function () {
          audio.play()
          this.setLyric()
        })
      },
      /**
       * 暂停音频
       */
      pauseAudio() {
        this.audioPlayShow = true
        let audio = document.getElementById('audio')
        audio.pause()
        // 清除定时器
        clearInterval(this.audioInterval)
      },
      /**
       * 音频播放完的时候
       */
      overAudio() {
        this.$nextTick(function () {
          this.audioWidth = this.$refs.line.offsetWidth
          this.audioWidth = 0
        })
        this.audioIsOver = true
        this.pauseAudio()
        if (this.play === 0) {
          this.nextMusic()
        } else if (this.play === 1) {
          this.playAudio()
        } else {
          this.i = Math.floor(Math.random() * this.audioUrl.length)
          this.playAudio()
        }
      },

      // 歌词回调
      lyricHandle({lineNum, txt}) {
        if (!this.$refs.lyricLine) {
          return
        }
        this.currentLyricNum = lineNum
        if (lineNum > 10) {
          let lineEl = this.$refs.lyricLine[lineNum - 10]
          if (this.$refs.lyricList) {
            this.$nextTick(() => {
              this.$refs.lyricList.scrollToElement(lineEl, 1000)
            })
          }
        } else {
          if (this.$refs.lyricList) {
            this.$nextTick(() => {
              this.$refs.lyricList.scrollTo(0, 0, 1000)
            })
          }
        }
        this.playingLyric = txt
      },

      // 设置进度条移动距离
      add(audioWidth) {
        return audioWidth + this.wrapWidth / parseInt(this.audioUrl[0].duration)
      },
      // 播放上一首歌曲
      provMusic() {
        this.i -= 1
        if (this.i < 0) {
          this.i = this.audioUrl.length - 1
        }
        this.$nextTick(function () {
          this.overAudio()
          this.playAudio()
        })
      },
      //播放下一首歌曲
      nextMusic() {
        this.i += 1
        if (this.i > this.audioUrl.length - 1) {
          this.i = 0
        }
        this.$nextTick(function () {
          this.audioWidth = 0
          this.audioIsOver = true
          this.playAudio()
        })
      },

      //鼠标移动控制进度条
      moveVoiceProgress(progress) {
        // console.log(this.$refs.voice.offsetWidth, e.target);
        console.log(progress.offsetWidth === 150)
        let that = this
        // console.log(e)
        // 拖动一定写到 down 里面才可以
        document.onmousemove = function (event) {
          progress.offsetWidth === 150 ? that.voiceWidth = event.clientX - progress.offsetLeft : that.audioWidth = event.clientX - progress.offsetLeft
          progress.offsetWidth === 150 ? that.$refs.audio.volume = 1 / 150 * that.voiceWidth : that.$refs.audio.currentTime = that.audioWidth / 450 * that.audioUrl[0].duration
          that.currentTime = that.audioWidth / 450 * that.audioUrl[0].duration
          window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
        document.onmouseup = function () {
          document.onmousemove = null; //弹起鼠标不做任何操作
        }
      },

      //点击控制进度条
      setProgress(event) {
        this.audioWidth = event.clientX - this.$refs.line.offsetLeft
        this.$nextTick(function () {
          this.pauseAudio()
          this.playAudio()
        })
        this.$refs.audio.currentTime = this.currentTime = this.audioWidth / 450 * this.audioUrl[0].duration
      },
      setVoiceProgress(event) {
        this.voiceWidth = event.clientX - this.$refs.voiceProgress.offsetLeft
        this.$refs.audio.volume = 1 / 150 * this.voiceWidth
      },

      //切换声音
      voiceControl() {
        this.voice = !this.voice
        this.voice === true ? this.$refs.audio.volume = 1 : this.$refs.audio.volume = 0
        this.$refs.audio.volume === 0 ? this.voiceWidth = 0 : this.voiceWidth = 150
      },

      //切换播放方式
      playStyle() {
        this.play >= 2 ? this.play = 0 : this.play += 1
      },

      //控制是否显示播放历史
      controlShow() {

      },

      //播放音乐
      playMusic(e) {
        this.i = e.target.getAttribute("index")
        this.playAudio()
      },

      //清除播放数据
      //vue对数组的监听用的是数组的7种变异方法（改写push、shift、splice等）
      garbage() {
        for (let i = 0; i < this.audioUrl.length; i++) {
          this.audioUrl.pop()
        }
        sessionStorage.clear()
      },
      deleteItem(e) {
        this.audioUrl.splice(e.target.getAttribute("index"), 1)
        sessionStorage.setItem("audioUrl", JSON.stringify(this.audioUrl))
      },
      //解析歌词
      setLyric() {
        const timeExp = /\[(\d{2}):(\d{2}):(\d{2})]/g
        this.currentLyric = new Lyric(this.audioUrl[0].lyric, this.lyricHandle)
        let pureMusicLyric = this.audioUrl[0].lyric
          .replace(timeExp, '')
          .trim()
        console.log(this.currentLyric.lines);
        console.log(pureMusicLyric)
      }
    }
  }
</script>

<style scoped lang="less">
  div.audio-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 72px;
    background: #fff;
    right: 0;
    left: 0;
    z-index: 8000;
    padding: 0 10px 0 20px;
    display: flex;
    /*justify-content: space-between;*/
    align-items: center;
    /*justify-content: center;*/
    box-shadow: 0 0 5px #cccccc;

    span.circle {
      width: 5px;
      height: 5px;
      display: inline-block;
      border: 2px solid;
      border-radius: 50%;
      transition: all linear .15s;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, .15);

      &:hover {
        transform: scale(1.2);
      }
    }

    div.singInformation {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;

      img.head {
        width: 60px;
        height: 60px;
        border-radius: 5px;
      }

      div.sing {
        flex: 0 0 65%;
        padding-left: 25px;

        div.name {
          font-size: 14px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100px;
          margin-bottom: 15px;
          font-weight: bold;
        }

        div.singer {
          font-size: 12px;
          color: #999;
        }
      }
    }

    div.control-play {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 100%;
      /*border: 1px solid;*/

      img.control, .play {
        width: 35px;
        height: 35px;
        /*margin: 0 25px;*/
        cursor: pointer;
      }

      div.play {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 50%;

        img {
          width: 40px;
          height: 40px;
        }
      }
    }

    div.wrapper {
      height: 3px;
      background: rgba(0, 0, 0, .05);
      border-radius: 2px;
      cursor: pointer;
      width: 450px;
      display: flex;
      align-items: center;
      /*justify-content: center;*/

      div.line-wrapper {
        height: 3px;
        display: inline-block;
        background: black;
      }
    }

    div.voice {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      /*margin-left: 35px;*/

      img {
        width: 22px;
        height: 22px;
        cursor: pointer;
      }

      div.progress {
        margin-left: 20px;
        height: 3px;
        width: 150px;
        background: rgba(0, 0, 0, .05);
        border-radius: 2px;
        cursor: pointer;
        display: flex;
        align-items: center;

        div.progress-wrapper {
          height: 3px;
          background: black;
          display: inline-block;
        }
      }
    }

    div.right {
      margin-left: 25px;
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      div {
        flex: 0 0 35%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      div.playStyle {
        cursor: pointer;
      }

      img {
        width: 22px;
        height: 22px;
      }

      div.play-history {
        position: relative;
        height: 100%;

        img {
          cursor: pointer;
        }

        &:hover {
          div.history {
            transform: translateX(0);
          }
        }

        div.history {

          display: block;
          position: absolute;
          width: 460px;
          height: 580px;
          box-shadow: 0 0 5px #cccccc;
          bottom: 72px;
          right: -5px;
          transform: translateX(500px);
          transition: all linear .3s;
          background: white;

          span.title {
            margin: 35px 20px 20px;
            font-weight: 500;
            font-size: 16px;
            display: inline-block;
          }

          img.garbage {
            float: right;
            margin-right: 25px;
            margin-top: 35px;
          }

          ul {
            overflow-y: scroll;
            max-height: calc(100% - 90px);
            list-style: none;

            li {
              padding: 8px 0;
              height: 40px;
              font-size: 14px;
              cursor: pointer;

              span {
                display: inline-block;
                margin: 0 25px;
              }

              span.name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 250px;
              }

              span.delete {
                float: right;
                cursor: pointer;

                &:hover {
                  background: #cccccc;
                }
              }

              span.number {
                display: inline-block;
                width: 18px;
              }

              &:hover {
                span.number {
                  background: url("../../../assets/img/play.png");
                  color: transparent;
                  background-size: cover;
                  width: 18px;
                }
              }
            }
          }
        }
      }
    }

    span.current-time, span.duration-time {
      font-size: 14px;
      color: gray;
      display: inline-block;
      margin: 0 30px 0 55px;
    }

    span.duration-time {
      margin: 0 30px;
    }

    div.lyric {
      position: relative;

      div.lyric-wrapper {
        display: none;
        position: absolute;
        bottom: 50px;
        right: -150px;
        width: 500px;
        height: 600px;
        background: white;
        box-shadow: 0 0 5px #cccccc;

        div.lyric-main {
          overflow-y: scroll;
          position: absolute;
          left: 50px;
          max-height: calc(100% - 90px);
          display: block !important;
          width: 500px !important;
        }

        .lyric-text {
          text-align: left;
          margin: 5px 0;
          line-height: 24px;
          font-size: 14px;
          font-weight: 300;
        }
      }
    }

    .active {
      color: red;
    }
  }
</style>
