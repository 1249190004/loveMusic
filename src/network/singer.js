import axios from "./axios";

export function getSinger(limit = 30) {
  return axios({
    url: '/top/artists',
    params: {
      limit
    }
  })
}

export function getKindSinger(type = -1, area = -1, initial = -1, limit = 24) {
  return axios({
    url: '/artist/list',
    params: {
      type,
      area,
      initial,
      limit
    }
  })
}

export function getSingerDetail(id) {
  return axios({
    url: '/artists',
    params: {
      id
    }
  })
}

export function getSingerAlbum(id, limit = 50) {
  return axios({
    url: '/artist/album',
    params: {
      id,
      limit
    }
  })
}

export function getSingerIntroduce(id) {
  return axios({
    url: '/artist/desc',
    params: {
      id
    }
  })
}

export function getSingerMv(id) {
  return axios({
    url: '/artist/mv',
    params: {
      id
    }
  })
}
