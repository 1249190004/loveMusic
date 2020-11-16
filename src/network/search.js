import axios from "./axios";

//获取热门搜索列表
export function getSearchSuggest() {
  return axios({
    url: '/search/hot/detail'
  })
}

//传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户等
export function getSearchList(keywords, type = 1) {
  return axios({
    url: '/cloudsearch/suggest',
    params: {
      keywords,
      type,
      limit: 50
    }
  })

}
