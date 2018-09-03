import { getUserIng } from 'common/js/util'

let hostname = location.hostname

let httpUrl1 = 'http://192.168.1.138:8080/'
// let httpUrl1 = 'http://10.151.91.220:8080/'

export const httpUrl = httpUrl1

// 后台数据返回成功标识
export const ERR_OK = '0000'

// 找不到token
export const ERR_TOKEN_NOTFOUND = '0003'

// 登录超时
export const ERR_TIMEOUT = '0004'

// js访问 static 文件夹路径
export const Static = 'static/'

let system_id = 'system_id=1000100'

export const systemID = `${httpUrl1}${system_id}`

// 访问后台传的token值
export function options () {
  let user = getUserIng() || {}
  return {
    headers: {
      token: user.token
      // info: getUserIng()

    }
  }
}

// 自定义错误标识
export const ERR_CUSTOM = '2000'
