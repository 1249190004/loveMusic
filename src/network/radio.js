import axios from "./axios";

export function getRadioBanner() {
  return axios({
    url: '/dj/banner'
  })
}

//调用此接口 , 可获得电台类型
export function getRadioCategories() {
  return axios({
    url: '/dj/catelist'
  })
}

//调用此接口 , 可获得推荐电台
export function getRadioRecommend() {
  return axios({
    url: '/dj/recommend'
  })
}

//调用此接口传入rid, 可查看对应电台的电台节目以及对应的id
export function getRadioDetail(rid) {
  return axios({
    url: '/dj/program',
    params: {
      rid
    }
  })
}

//传入节目id能获取到节目音频
export function getRadioPlay(id) {
  return axios({
    url: '/song/url',
    params: {
      id
    }
  })
}
