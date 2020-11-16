import axios from "./axios";

export function getPersonal() {
  return axios({
    url: '/user/level'
  })
}
