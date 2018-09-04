import { ajaxPost } from 'api/axios'
import { options } from 'api/config'

// 多站同时
export function GetStationInstQuery (search = {}) {
  let url = 'gmmeteo/datacenter/stationinstquery/list'

  let data = {
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}

// 多站同时极值
export function GetHourInstQuery (search = {}) {
  let url = 'gmmeteo/datacenter/hourextremum/list'

  let data = {
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}

// 单站多日同时
export function GetDaywhildQuery (page = 1, search = {}) {
  let url = 'gmmeteo/datacenter/stationinstquery/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    system_id: '1000100',
    singleDaysMeanwhile: 1
  }

  return ajaxPost(url, data, options())
}

// 通用下拉菜单站点名称
export function GettownList () {
  let url = 'gmmeteo/datacenter/awsstation/list'

  let data = {
    searchValue: {
      dist: '高明区'
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}

// 单站同日时极值
export function GetDayHourQuery (page = 1, search = {}) {
  let url = 'gmmeteo/datacenter/hourextremum/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {datetime: -1},
    system_id: '1000100',
    singleDaysMeanwhile: 1
  }

  return ajaxPost(url, data, options())
}

// 多站同日
export function GetDayectremum (search = {}) {
  let url = 'gmmeteo/datacenter/dayextremum/list'

  let data = {
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}

// 单站同日多时
export function GetHourcompare (search = {}) {
  let url = 'gmmeteo/datacenter/stationinstquery/list'

  let data = {
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}

// 单站多日
export function GetDaycompare (page = 1, search = {}) {
  let url = 'gmmeteo/datacenter/dayextremum/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {datetime: -1},
    system_id: '1000100'
  }
  // console.log(page)
  return ajaxPost(url, data, options())
}

// 单站多日时极值
export function GetDayHourscompare (page = 1, search = {}) {
  let url = 'gmmeteo/datacenter/hourextremum/list'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {datetime: -1},
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}

// 分雨量
export function Getfiveminute (page = 1, search = {}) {
  let url = 'gmmeteo/datacenter/fiveminutesrainsum/list'

  let data = {
    page: page,
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}

// 时雨量
export function GetHourrain (page = 1, search = {}) {
  let url = 'gmmeteo/datacenter/hourrainsum/list'

  let data = {
    page: page,
    searchValue: {
      ...search
    },
    system_id: '1000100'
  }

  return ajaxPost(url, data, options())
}
