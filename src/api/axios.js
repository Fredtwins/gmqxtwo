import axios from 'axios'
import { httpUrl, ERR_TIMEOUT, ERR_TOKEN_NOTFOUND, system_id } from 'api/config'
import { removeUserIng, getUserIng } from 'common/js/util'

import iView from 'iview'

iView.LoadingBar.config({
  height: 3,
  // color: '#47cb89'
  color: '#ff7f27'
})

const info = getUserIng()

var timer = 1
// post接口,传入三个参数 url，data， option
export function ajaxPost (url = '', data = {}, option = {}) {
  iView.LoadingBar.start()
  // 拼接url的路径
  url = `${httpUrl}${url}`
  // 用axios的post方法请求
  return axios.post(url, data, option).then(res => {
    // if (res.data.message !== '用户名或密码错误' && res.data.code === ERR_TIMEOUT || res.data.code === ERR_TOKEN_NOTFOUND || res.data.code === '0005') {
    //     removeUserIng()
    //     window.location.href = location.pathname
    //     return
    // }
    // console.log(res)
    if (res.data.code === ERR_TIMEOUT || res.data.code === ERR_TOKEN_NOTFOUND || res.data.code === '0005') {
      this.$Notice.warning({
        title: res.data.message
      })
      removeUserIng()
      this.$router.push('/login')
      console.log(1)
    }
    // switch (res.data.code) {
    //   case '0003':
    //     that.$Notice.warning({
    //       title: res.data.message
    //     })
    //     break
    //   case '0004':
    //     that.$Notice.warning({
    //       title: res.data.message
    //     })
    //     that.$router.push('/login')
    //     break
    //   case '0005':
    //     that.$Notice.warning({
    //       title: res.data.message
    //     })
    //     that.$router.push('/login')
    //     break
    //   default:

    //     break
    // }
    iView.LoadingBar.finish()
    return Promise.resolve(res.data)
  }).catch(res => {
    iView.LoadingBar.error()
    return Promise.resolve(res.data)
  })
}
