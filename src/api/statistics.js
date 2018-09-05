import { ajaxPost } from 'api/axios'
import { options } from 'api/config'

// 风力风向图
export function GetmonthAvgtu (page = 1, search = {}) {
  let url = 'gmmeteo/datacenter/stat/windrose'

  let data = {
    page: page,
    pageSize: 1,
    searchValue: {
      ...search
    },
    order: {
      year: -1,
      month: -1
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}
