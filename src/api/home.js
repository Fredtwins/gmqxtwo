import { ajaxPost } from 'api/axios'
import { options } from 'api/config'
import { getUserIng } from 'common/js/util'

export function GetTopNav (search = {}) {
  let url = 'gmmeteo/sys/role/modulelist'

  let data = {
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}

// 首页四个镇街的表格数据
export function GetTownList (search = {}) {
  let url = '/gmmeteo/datacenter/townexampleinst'

  let data = {
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}

// 首页左边echarts图
export function getecharts (search = {}) {
  let url = '/gmmeteo/datacenter/stat/collectionresult'

  let data = {
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}

// 首页左边天气预报图
export function getrainList (search = {}) {
  let url = '/gmmeteo/datacenter/townwarning'

  let data = {
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }
  // console.log(data)
  return ajaxPost(url, data, options())
}
