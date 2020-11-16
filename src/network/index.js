import axios from './axios'

//获取轮播图
export function getBanner() {
  return axios({
    url: '/banner'
  })
}

//获取推荐歌单 数量默认为 30
export function getRecommendSongSheet() {
  return axios({
    url: '/personalized',
    params: {
      limit: 32
    }
  })
}

// 获取推荐歌曲
export function getRecommendSong() {
  return axios({
    url: '/personalized/newsong'
  })
}

//获取推荐歌手
export function getRecommendSinger() {
  return axios({
    url: '/top/artists?offset=0&limit=30'
  })
}
