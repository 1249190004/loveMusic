import axios from "./axios";

export function getPlayMusic(id) {
  return axios({
    url: '/song/url',
    params: {
      id
    }
  })
}

export function getSing(type = 0) {
  return axios({
    url: '/top/song',
    params: {
      type
    }
  })
}

export function getLyric(id) {
  return axios({
    url: '/lyric',
    params: {
      id
    }
  })
}
