import { ajaxPost } from 'api/axios'
import { options } from 'api/config'

// 统计分析侧边栏
export function Getstatandquery (search = {}) {
  let url = 'gmmeteo/sys/role/modulelist'

  let data = {
    name: '统计分析',
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}
