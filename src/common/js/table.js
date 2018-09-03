// 首页镇街
export function TownList (that) {
  return [
    {
      title: '站号',
      key: 'station_name',
      align: 'center'
    },
    {
      title: '记录时间',
      key: 'datetime',
      align: 'center'
    },
    {
      title: '气温',
      key: 't',
      align: 'center',
      width: 65
    },
    {
      title: '小时雨量',
      key: 'r1h',
      align: 'center',
      width: 65
    },
    {
      title: '风速',
      key: 'wf10',
      align: 'center',
      width: 65
    },
    {
      title: '风向',
      key: 'wd10',
      align: 'center',
      width: 65
    },
    {
      title: '湿度',
      key: 'u',
      align: 'center',
      width: 65
    },
    {
      title: '气压',
      key: 'p',
      align: 'center',
      width: 65
    }
  ]
}

// 统计分析-多站同时
export function SyayicQuery (that) {
  return [
    {
      title: '站号',
      key: 'stationid',
      align: 'center',
      width: 80
    }, {
      title: '站点名称',
      key: 'station_name',
      align: 'center',
      width: 260
    }, {
      title: '气温',
      key: 't',
      sortable: true,
      align: 'center',
      width: 65
    }, {
      title: '10分钟风速',
      key: 'wf10',
      sortable: true,
      align: 'center',
      width: 76
    }, {
      title: '10分钟风向',
      key: 'wd10',
      sortable: true,
      align: 'center',
      width: 76
    }, {
      title: '2分钟风速',
      key: 'wf2',
      sortable: true,
      align: 'center',
      width: 76
    }, {
      title: '2分钟风向',
      key: 'wd2',
      sortable: true,
      align: 'center',
      width: 76
    }, {
      title: '1小时雨量',
      key: 'r1h',
      sortable: true,
      align: 'center',
      width: 76
    }, {
      title: '气压',
      key: 'p',
      sortable: true,
      align: 'center',
      width: 80
    }, {
      title: '相对湿度',
      key: 'u',
      sortable: true,
      align: 'center',
      width: 72
    }, {
      title: '电压',
      key: 'wpv',
      sortable: true,
      align: 'center',
      width: 74
    }, {
      title: '3小时雨量',
      width: 74,
      sortable: true,
      align: 'center',
      key: 'r3h'
    }, {
      title: '24小时雨量',
      width: 76,
      sortable: true,
      align: 'center',
      key: 'r24h'
    }, {
      title: '记录时间',
      key: 'datetime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          // DOM 属性
          domProps: {
            innerHTML: param.row.datetime.slice(0, 16)
          }
        })
      }
    }
  ]
}

// 统计分析-多站同时极值
export function HourQuerythead (that) {
  return [
    {
      title: '站号',
      key: 'stationid',
      width: 80,
      align: 'center'
    }, {
      title: '站点名称',
      key: 'station_name',
      width: 238,
      align: 'center'
    }, {
      title: '10分钟风向',
      key: 'wd10max',
      sortable: true,
      align: 'center'
    },
    {
      title: '10分钟风速',
      key: 'wf10max',
      sortable: true,
      align: 'center'
    }, {
      title: '时间',
      key: 'wf10maxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            // innerHTML:param.row.wf10maxtime.substring(10,param.row.wf10maxtime.length),
            innerHTML: param.row.wf10maxtime.slice(10, 16)
          }
        })
      }
    },
    {
      title: '3秒风向',
      key: 'wd3smax',
      sortable: true,
      align: 'center'
    },
    {
      title: '3秒风速',
      key: 'wf3smax',
      sortable: true,
      align: 'center'
    },
    {
      title: '时间',
      key: 'wf3smaxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.wf3smaxtime.substring(10, 16)
          }
        })
      }
    },
    {
      title: '温度最高',
      key: 'tmax',
      sortable: true,
      align: 'center'
    },
    {
      title: '最高时间',
      key: 'tmaxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.tmaxtime.substring(10, 16)
          }
        })
      }
    },
    {
      title: '温度最低',
      key: 'tmin',
      sortable: true,
      align: 'center'
    },
    {
      title: '最低时间',
      key: 'tmintime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.tmintime.substring(10, 16)
          }
        })
      }
    },
    {
      title: '气压最高',
      key: 'pmax',
      sortable: true,
      align: 'center'
    },
    {
      title: '最高时间',
      key: 'pmaxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.pmaxtime.substring(10, 16)
          }
        })
      }
    },
    {
      title: '气压最低',
      key: 'pmin',
      sortable: true,
      align: 'center'
    },
    {
      title: '最低时间',
      key: 'pmintime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.pmintime.substring(10, 16)
          }
        })
      }
    },
    {
      title: '湿度最大',
      key: 'umax',
      sortable: true,
      align: 'center'
    },
    {
      title: '最大时间',
      key: 'umaxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.umaxtime.substring(10, 16)
          }
        })
      }
    },
    {
      title: '湿度最小',
      key: 'umin',
      sortable: true,
      align: 'center'
    },
    {
      title: '最小时间',
      key: 'umintime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.umintime.substring(10, 16)
          }
        })
      }
    }
  ]
}

// 统计分析-单站多日同时
export function Daywhilethead (that) {
  return [
    {
      title: '站号',
      width: 80,
      align: 'center',
      key: 'stationid'
    },
    {
      title: '记录时间',
      key: 'datetime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          // DOM 属性
          domProps: {
            innerHTML: param.row.datetime.substring(0, 16)
          }
        })
      }
    }, {
      title: '气温',
      key: 't',
      width: 80,
      align: 'center',
      sortable: true
    }, {
      title: '10分钟风速(m/s)',
      key: 'wf10',
      align: 'center',
      sortable: true
    }, {
      title: '10分钟风向',
      key: 'wd10',
      align: 'center',
      sortable: true
    }, {
      title: '2分钟风速(m/s)',
      key: 'wf2',
      align: 'center',
      sortable: true
    }, {
      title: '2分钟风向',
      key: 'wd2',
      align: 'center',
      sortable: true
    }, {
      title: '1小时雨量',
      key: 'r1h',
      align: 'center',
      sortable: true
    }, {
      title: '气压',
      key: 'p',
      width: 80,
      align: 'center',
      sortable: true
    }, {
      title: '相对湿度',
      key: 'u',
      width: 120,
      align: 'center',
      sortable: true
    }, {
      title: '电压',
      key: 'wpv',
      width: 80,
      align: 'center',
      sortable: true
    }, {
      title: '3小时雨量',
      width: 74,
      key: 'r3h',
      align: 'center',
      sortable: true
    }, {
      title: '24小时雨量',
      width: 76,
      key: 'r24h',
      align: 'center',
      sortable: true
    }
  ]
}

// 统计分析-单站同日时极值
export function DayHourExtremethead (that) {
  return [
    {
      title: '站号',
      width: 80,
      align: 'center',
      key: 'stationid'
    },
    {
      title: '统计时间',
      key: 'datetime',
      align: 'center',
      width: 100,
      render: (h, param) => {
        return h('span', {
          // DOM 属性
          domProps: {
            innerHTML: param.row.datetime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最高温',
      key: 'tmax',
      align: 'center',
      width: 84,
      sortable: true
    }, {
      title: '最高温出现时间',
      key: 'tmaxtime',
      align: 'center',
      width: 100,
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.tmaxtime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最低温',
      key: 'tmin',
      width: 84,
      align: 'center',
      sortable: true
    }, {
      title: '最低温出现时间',
      key: 'tmintime',
      align: 'center',
      width: 100,
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.tmintime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最大湿度',
      key: 'umax',
      width: 82,
      align: 'center',
      sortable: true
    }, {
      title: '最大湿度出现时间',
      key: 'umaxtime',
      align: 'center',
      width: 100,
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.umaxtime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最小湿度',
      key: 'umin',
      width: 84,
      align: 'center',
      sortable: true
    }, {
      title: '最小湿度出现时间',
      key: 'umintime',
      align: 'center',
      width: 100,
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.umintime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最高气压(hPa) ',
      key: 'pmax',
      align: 'center',
      sortable: true
    }, {
      title: '最高气压出现时间',
      key: 'pmaxtime',
      align: 'center',
      width: 100,
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.pmaxtime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最低气压(hPa)',
      key: 'pmin',
      align: 'center',
      sortable: true
    }, {
      title: '最低气压出现时间',
      key: 'pmintime',
      align: 'center',
      width: 100,
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.pmintime.substring(0, 16)
          }
        })
      }
    }, {
      title: '3秒最大瞬间风速(m/s)',
      align: 'center',
      key: 'wf3smax'
    }, {
      title: '3秒最大瞬间风速出现时间',
      key: 'wf3smaxtime',
      align: 'center',
      width: 100,
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.wf3smaxtime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最大10分钟平均风速(m/s)',
      align: 'center',
      key: 'wf10max'
    }, {
      title: '最大10分钟平均风速出现时间',
      align: 'center',
      key: 'wf10maxtime',
      width: 100,
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.wf10maxtime.substring(0, 16)
          }
        })
      }
    }, {
      title: '降水量',
      align: 'center',
      key: 'r1',
      sortable: true
    }
  ]
}

// 统计分析-多站同日
export function DayExtrmumthead (that) {
  return [
    {
      title: '站号',
      width: 80,
      align: 'center',
      key: 'stationid'
    }, {
      title: '时间',
      key: 'datetime',
      align: 'center',
      width: 140
    }, {
      title: '气温最高',
      key: 'tmax',
      align: 'center',
      width: 78,
      sortable: true
    }, {
      title: '气温最低',
      key: 'tmin',
      align: 'center',
      width: 78,
      sortable: true
    }, {
      title: '最大10分钟风向',
      key: 'wd10max',
      align: 'center',
      width: 78,
      sortable: true
    }, {
      title: '最大10分钟风速',
      key: 'wf10max',
      align: 'center',
      width: 78,
      sortable: true
    }, {
      title: '10分钟风速时间',
      key: 'wf10maxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.wf10maxtime.slice(0, 16)
          }
        })
      }
    }, {
      title: '最大3秒风向',
      key: 'wd3smax',
      width: 75,
      align: 'center',
      sortable: true
    }, {
      title: '最大3秒风速',
      key: 'wf3smax',
      width: 75,
      align: 'center',
      sortable: true
    }, {
      title: '3秒风速时间',
      key: 'wf3smaxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.wf3smaxtime.slice(0, 16)
          }
        })
      }
    }, {
      title: '08-08时降雨量',
      key: 'r8',
      width: 140,
      align: 'center',
      sortable: true
    }, {
      title: '平均气温',
      width: 74,
      key: 'tdavg',
      align: 'center',
      sortable: true
    }
  ]
}

// 统计分析-单站同日多时
export function Hourcomparethead (that) {
  return [
    {
      title: '站号',
      key: 'stationid',
      width: 80,
      align: 'center'
    }, {
      title: '记录时间',
      key: 'datetime',
      align: 'center'
    }, {
      title: '气温',
      key: 't',
      width: 80,
      sortable: true,
      align: 'center'
    }, {
      title: '10分钟风速(m/s)',
      key: 'wf10',
      sortable: true,
      align: 'center'
    }, {
      title: '10分钟风向',
      key: 'wd10',
      sortable: true,
      align: 'center'
    }, {
      title: '2分钟风速(m/s)',
      key: 'wf2',
      sortable: true,
      align: 'center'
    }, {
      title: '2分钟风向',
      key: 'wd2',
      sortable: true,
      align: 'center'
    }, {
      title: '1小时雨量',
      key: 'r1h',
      sortable: true,
      align: 'center'
    }, {
      title: '气压',
      key: 'p',
      width: 80,
      sortable: true,
      align: 'center'
    }, {
      title: '相对湿度',
      key: 'u',
      width: 120,
      sortable: true,
      align: 'center'
    }, {
      title: '电压',
      key: 'wpv',
      width: 80,
      sortable: true,
      align: 'center'
    }, {
      title: '3小时雨量',
      width: 74,
      key: 'r3h',
      sortable: true,
      align: 'center'
    }, {
      title: '24小时雨量',
      width: 76,
      key: 'r24h',
      sortable: true,
      align: 'center'
    }
  ]
}

// 统计分析-单站多日
export function DaycompareThead (that) {
  return [
    {
      title: '站号',
      width: 80,
      align: 'center',
      key: 'stationid'
    }, {
      title: '时间',
      key: 'datetime',
      align: 'center',
      width: 200
    }, {
      title: '气温最高',
      key: 'tmax',
      width: 75,
      align: 'center',
      sortable: true
    }, {
      title: '气温最低',
      key: 'tmin',
      align: 'center',
      width: 75,
      sortable: true
    }, {
      title: '最大10分钟风向',
      key: 'wd10max',
      width: 75,
      align: 'center',
      sortable: true
    }, {
      title: '最大10分钟风速',
      key: 'wf10max',
      align: 'center',
      width: 75,
      sortable: true
    }, {
      title: '10分钟风速时间',
      key: 'wf10maxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.wf10maxtime.slice(0, 16)
          }
        })
      }
    }, {
      title: '最大3秒风向',
      key: 'wd3smax',
      width: 75,
      align: 'center',
      sortable: true
    }, {
      title: '最大3秒风速',
      key: 'wf3smax',
      width: 75,
      align: 'center',
      sortable: true
    }, {
      title: '3秒风速时间',
      key: 'wf3smaxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.wf3smaxtime.slice(0, 16)
          }
        })
      }
    }, {
      title: '08-08时降雨量',
      key: 'r8',
      align: 'center',
      width: 140,
      sortable: true
    }, {
      title: '平均气温',
      width: 74,
      align: 'center',
      key: 'tdavg',
      sortable: true
    }
  ]
}

// 统计分析-单站多日时极值
export function DayHoursThead (that) {
  return [
    {
      title: '站号',
      width: 80,
      align: 'center',
      key: 'stationid'
    },
    {
      title: '统计时间',
      key: 'datetime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          // DOM 属性
          domProps: {
            innerHTML: param.row.datetime.substring(0, 16)
          }
        })
      }
    },
    {
      title: '最高温',
      key: 'tmax',
      align: 'center',
      sortable: true
    }, {
      title: '最高温出现时间',
      key: 'tmaxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.tmaxtime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最低温',
      key: 'tmin',
      align: 'center',
      sortable: true
    }, {
      title: '最低温出现时间',
      key: 'tmintime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.tmintime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最大湿度',
      key: 'umax',
      align: 'center',
      sortable: true
    }, {
      title: '最大湿度出现时间',
      key: 'umaxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.umaxtime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最小湿度',
      key: 'umin',
      align: 'center',
      sortable: true
    }, {
      title: '最小湿度出现时间',
      key: 'umintime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.umintime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最高气压(hPa) ',
      key: 'pmax',
      align: 'center',
      sortable: true
    }, {
      title: '最高气压出现时间',
      key: 'pmaxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.pmaxtime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最低气压(hPa)',
      key: 'pmin',
      align: 'center',
      sortable: true
    }, {
      title: '最低气压出现时间',
      key: 'pmintime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.pmintime.substring(0, 16)
          }
        })
      }
    }, {
      title: '3秒最大瞬间风速(m/s)',
      align: 'center',
      key: 'wf3smax'
    }, {
      title: '3秒最大瞬间风速出现时间',
      key: 'wf3smaxtime',
      align: 'center',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.wf3smaxtime.substring(0, 16)
          }
        })
      }
    }, {
      title: '最大10分钟平均风速(m/s)',
      align: 'center',
      key: 'wf10max'
    }, {
      title: '最大10分钟平均风速出现时间',
      align: 'center',
      key: 'wf10maxtime',
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.wf10maxtime.substring(0, 16)
          }
        })
      }
    }, {
      title: '降水量',
      align: 'center',
      key: 'r1',
      sortable: true
    }
  ]
}

// 统计分析-分雨量合计
export function FiveMinutesThead (that) {
  return [
    {
      title: '站号',
      align: 'center',
      key: 'stationid',
      width: 80
    }, {
      title: '站名',
      key: 'station_name',
      align: 'center'
    }, {
      title: '合雨量',
      key: 'sum_rain',
      align: 'center',
      sortable: true
    }, {
      title: '有雨记录量',
      key: 'count_rain',
      align: 'center',
      sortable: true
    }, {
      title: '最大5分钟雨量',
      key: 'max_rain',
      align: 'center',
      sortable: true
    }
  ]
}

// 统计分析-时雨量合计
export function hourrainthead (that) {
  return [
    {
      title: '站号',
      align: 'center',
      key: 'stationid',
      width: 80
    }, {
      title: '站名',
      key: 'station_name',
      align: 'center'
    }, {
      title: '合雨量',
      key: 'sum_r1',
      align: 'center',
      sortable: true
    }, {
      title: '有记录数',
      key: 'count_r1',
      align: 'center',
      sortable: true
    }, {
      title: '最大时雨量',
      key: 'max_r1',
      align: 'center',
      sortable: true
    }
  ]
}

// 统计分析-日雨量合计
export function dayrainthead (that) {
  return [
    {
      title: '站号',
      align: 'center',
      key: 'stationid',
      width: 80
    }, {
      title: '站名',
      key: 'station_name',
      align: 'center'
    }, {
      title: '合雨量',
      key: 'sum_r20',
      align: 'center',
      sortable: true
    }, {
      title: '有记录数',
      key: 'count_r20',
      align: 'center',
      sortable: true
    }, {
      title: '有雨日数',
      key: 'max_r20',
      align: 'center',
      sortable: true
    }
  ]
}
