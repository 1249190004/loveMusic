import axios from './axios'

export function getMusicList() {
  return axios({
    url: '/toplist/detail'
  })
}

export function getPlayList(id = 19723756) {
  return axios({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export function getAlbumDetail(id) {
  return axios({
    url: '/album',
    params: {
      id
    }
  })
}
