import axios from "./axios";

export function getMv(mvList) {
  return axios({
    url: '/mv/all',
    params: {
      area: mvList.area,
      order: mvList.order,
      limit: mvList.limit,
      offset: mvList.offset
    }
  })

}
