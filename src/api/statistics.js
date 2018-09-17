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

// 单站多要素对比图
export function Getmultielement (search = {}) {
  let url = 'gmmeteo/datacenter/stationinstquery/list'

  let data = {
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}

// 单站同期历史对比图
export function GetHistorcal (search = {}) {
  let url = 'gmmeteo/datacenter/stationinstquery/list'

  let data = {
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}

// 单站同期历史对比图（echarts）
export function GetHisEcharts (search = {}) {
  let url = 'gmmeteo/datacenter/singleHistoricalPeriod/list'

  let data = {
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}
