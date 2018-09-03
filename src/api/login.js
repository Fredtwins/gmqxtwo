import { ajaxPost } from 'api/axios'

export function goLogin (obj) {
  let url = 'gmmeteo/sys/userinfo/login'

  let data = {
    username: obj.username,
    password: obj.password
  }

  return ajaxPost(url, obj)
}
