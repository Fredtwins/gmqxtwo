import Vue from 'vue'
import Router from 'vue-router'

// 登录页面
const login = () => import('components/login/login')

// 入口
const main = () => import('components/home/Main')

// 主页
const home = () => import('components/home/home')

// 统计分析
const statandquery = () => import('components/statandquery/Index')

// 多站同时
const StationInstQuery = () => import('components/statandquery/StationInstQuery')

// 多站同时极值
const districtHourExtremumQuery = () => import('components/statandquery/shikuang/districtHourExtremumQuery')

// 单站多日同时
const singleDaysMeanwhileQuery = () => import('components/statandquery/shikuang/singleDaysMeanwhileQuery')

// 单站同日时极值
const singleDayHourExtreme = () => import('components/statandquery/shikuang/singleDayHourExtreme')

// 多站同日
const districtDayExtremumQuery = () => import('components/statandquery/shikuang/districtDayExtremumQuery')

// 单站同日多时
const stationHoursCompare  = () => import('components/statandquery/shikuang/stationHoursCompare')

// 单站多日
const stationDaysCompare = () => import('components/statandquery/shikuang/stationDaysCompare')

// 单站多日时极值
const stationDaysHoursCompare = () => import('components/statandquery/shikuang/stationDaysHoursCompare')

// 分雨量
const fiveMinutesRainSum = () => import('components/statandquery/shikuang/fiveMinutesRainSum')

// 时雨量
const hourRainSum = () => import('components/statandquery/shikuang/hourRainSum')

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: login,
      children: []
    },
    {
      path: '/main',
      component: main,
      children: [
        {
        path: '/main/home',
        component: home
        },
      // 统计分析
        {
          path: '/main/statandquery',
          component: statandquery,
          redirect: '/main/statandquery/districtInstQuery',
          children: [
            {
              path: '/main/statandquery/districtInstQuery',
              component: StationInstQuery
            }, {
              path: '/main/statandquery/districtHourExtremumQuery',
              component: districtHourExtremumQuery
            }, {
              path: '/main/statandquery/singleDaysMeanwhileQuery',
              component: singleDaysMeanwhileQuery
            }, {
              path: '/main/statandquery/singleDayHourExtreme',
              component: singleDayHourExtreme
            }, {
              path: '/main/statandquery/districtDayExtremumQuery',
              component: districtDayExtremumQuery
            }, {
              path: '/main/statandquery/stationHoursCompare',
              component: stationHoursCompare
            }, {
              path: '/main/statandquery/stationDaysCompare',
              component: stationDaysCompare
            }, {
              path: '/main/statandquery/stationDaysHoursCompare',
              component: stationDaysHoursCompare
            }, {
              path: '/main/statandquery/fiveMinutesRainSum',
              component: fiveMinutesRainSum
            }, {
              path:'/main/statandquery/hourRainSum',
              component: hourRainSum
            }
          ]
        }
      ]
    }
  ]
})
