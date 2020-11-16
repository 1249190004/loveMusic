import axios from "./axios";

export function getSongSheetList() {
  return axios({
    url: '/playlist/catlist'
  })
}

export function getHotSongSheetList() {
  return axios({
    url: '/playlist/hot'
  })
}

export function getSongsList(sonsList) {
  return axios({
    url: '/top/playlist',
    params: {
      order: sonsList.order,
      cat: sonsList.cat,
      limit: sonsList.limit,
      offset: sonsList.offset
    }
  })
}

export function getSongSheetLists(id) {
  return axios({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export function getSongSheetTag({cat = "全部", limit = 24, offset = 1, order = "hot"}) {
  return axios({
    url: '/top/playlist',
    params: {
      cat,
      limit,
      offset,
      order
    }
  })
}
