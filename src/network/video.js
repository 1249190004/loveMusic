import axios from "./axios";

export function getHotVideo() {
  return axios({
    url: '/video/category/list'
  })
}

export function getVideo() {
  return axios({
    url: '/video/group/list'
  })
}

export function getVideoList(offset) {
  return axios({
    url: '/video/timeline/all',
    params: {
      offset
    }
  })
}

export function getPlayVideoList(id) {
  return axios({
    url: '/video/url',
    params: {
      id
    }
  })
}

export function getPlayMvList(id) {
  return axios({
    url: '/mv/url',
    params: {
      id
    }
  })
}

export function getPlayMvDetail(mvid) {
  return axios({
    url: '/mv/detail',
    params: {
      mvid
    }
  })
}

export function getPlayVideoDetail(id) {
  return axios({
    url: '/video/detail',
    params: {
      id
    }
  })
}

export function getPlayRelated(id) {
  return axios({
    url: '/related/allvideo',
    params: {
      id
    }
  })
}

export function getVideoInfo(vid) {
  return axios({
    url: '/video/detail/info',
    params: {
      vid
    }
  })
}

export function getVideoComment(id, offset = 1) {
  return axios({
    url: '/comment/video',
    params: {
      id,
      offset
    }
  })
}

export function getMvComment(id, offset = 1) {
  return axios({
    url: '/comment/mv',
    params: {
      id,
      offset
    }
  })
}
