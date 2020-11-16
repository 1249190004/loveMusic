import axios from './axios'

export function getLoginMultidata(loginForm) {
  return axios({
    url: '/login/cellphone',
    params: {
      phone: loginForm.username,
      password: loginForm.password
    }
  })
}

export function getLoginData(uid) {
  return axios({
    url: '/user/detail',
    params: {
      uid
    }
  })
}
