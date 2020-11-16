import axios from './axios'

//获取轮播图
export function getPlayRecord(uid) {
  return axios({
    url: '/user/record',
    params:{
      uid
    }
  })
}

