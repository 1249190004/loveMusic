import originAxios from 'axios'

export default function axios(option) {
  return new Promise((resolve, reject) => {
    const instance = originAxios.create({
      baseURL: 'https://nicemusic-api.lxhcool.cn/',
      timeout: 15000
    });

    instance.interceptors.request.use(config => {

      return config
    }, err => {
      return err
    })

    instance.interceptors.response.use(response => {
      return response.data
    }, err => {
      console.log('来到了response拦截failure中');
      // window.location.href = '/requestFail'
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误'
            break
          case 401:
            err.message = '未授权的访问'
            break
        }
      }
      return err
    })

    instance(option).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
