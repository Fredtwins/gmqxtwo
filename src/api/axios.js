import Vue from 'vue'
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
    if (res.data.code === ERR_TIMEOUT || res.data.code === ERR_TOKEN_NOTFOUND || res.data.code === '0005') {
      Vue.prototype.$Notice.warning({
        title: res.data.message
      })
      removeUserIng()
      window.location.href = '/'
      return
    }
    iView.LoadingBar.finish()
    return Promise.resolve(res.data)
  }).catch(res => {
    iView.LoadingBar.error()
    return Promise.resolve(res.data)
  })
}
