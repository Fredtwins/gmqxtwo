<template>
  <i-col span="21">
    <div class="heightMax">
      <div class="station">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">统计分析</Breadcrumb-item>
          <Breadcrumb-item class="blue">单站同期历史对比图</Breadcrumb-item>
        </Breadcrumb>
        <Collapse accordion value="1" class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
            <Form ref="formInline" :model="formInline" inline :label-width="80">
              <Form-item label="站点名称">
                <Select v-model="formInline.id" style="width:200px">
                  <Option v-for="item in stationList" :value="item.id" :key="item.index">{{item.cn}}</Option>
                </Select>
              </Form-item>
              <Form-item label="时间">
                <Date-picker type="month" v-model="formInline.datetime1" @on-change="datetimeChange1"></Date-picker>&nbsp;至&nbsp;
                <Date-picker type="month" v-model="formInline.datetime2" @on-change="datetimeChange2"></Date-picker>
              </Form-item>
              <Form-item label="历史时间">
                <Date-picker type="month" v-model="formInline.datetime3" @on-change="datetimeChange3"></Date-picker>&nbsp;至&nbsp;
                <Date-picker type="month" v-model="formInline.datetime4" @on-change="datetimeChange4"></Date-picker>
              </Form-item>
              <Form-item label="选择元素">
                <Select v-model="formInline.element" clearable style="width:100px">
                  <Option v-for="item in elementList" :value="item.name" :key="item.index"></Option>
                </Select>
              </Form-item>
              <Button type="primary" @click="submitSearch(1)">搜索</Button>
              <Button type="success" @click="submitSearchList">单站搜索</Button>
            </Form>
            </template>
          </Panel>
        </Collapse>
        <div class="center">
          <Table :loading="loading" :data="dataSourceList" :columns="theadArr" border></Table>
        </div>
        <!-- <div class="pullright page">
          <Page :total="total" :current="current" @on-change="changePage"></Page>
        </div> -->
        <template>
          <Modal v-model="looklists" class="modalx">
            <div slot="header" ref="inter">{{updateTitle}}</div>
            <Form :model="formItem">
              <div id="main" class="main" style="width: 72rem;height: 530px"></div>
            </Form>
          </Modal>
        </template>
      </div>
    </div>
  </i-col>
</template>

<script>
import { GettownList } from 'api/stationlist'
import { GetHistorcal, GetHisEcharts } from 'api/statistics'
import { ERR_OK } from 'api/config'
import { HistorcalThead } from 'common/js/table'
import echarts from 'echarts'
export default {
  data () {
    return {
      looklists: false,
      updateTitle: '',
      formItem: {},
      loading: false,
      dataSourceList: [],
      theadArr: HistorcalThead(this),
      stationList: [],
      formInline: {
        id: '',
        datetime1: '',
        datetime2: '',
        datetime3: '',
        datetime4: '',
        element: ''
      },
      elementList: [
        {
          name: '雨量',
          id: 'r8'
        }
      ]
    }
  },
  methods: {
    // 列表
    _GetHistorcal (search) {
      this.loading = true
      GetHistorcal(search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.dataSourceList = res.result.result
        }
      })
    },
    // 部门列表下拉框
    _GettownList () {
      GettownList().then(res => {
        if (res.code === ERR_OK) {
          this.stationList = res.result.result
        }
      })
    },
    // 点击搜索
    submitSearch () {
      let search = {}
      if (this.formInline.id) {
        search.stationid = this.formInline.id
      }
      if (this.formInline.datetime1 || this.formInline.datetime2) {
        search.daterange1  = `${this.formInline.datetime1}-01|#|${this.formInline.datetime2}-01`
      }
      if (this.formInline.datetime3 || this.formInline.datetime4) {
        search.daterange2 = `${this.formInline.datetime3}-01|#|${this.formInline.datetime4}-01`
      }
      if (this.formInline.element) {
        let index = this.elementList.findIndex(item => item.name === this.formInline.name)
        this.formInline.element = this.elementList[index].id
        search.element = this.formInline.element
      }
      this._GetHistorcal(search)
    },
    // 选择时间
    datetimeChange1 (datetime) {
      this.formInline.datetime1 = datetime
    },
    datetimeChange2 (datetime) {
      this.formInline.datetime2 = datetime
    },
    datetimeChange3 (datetime) {
      this.formInline.datetime3 = datetime
    },
    datetimeChange4 (datetime) {
      this.formInline.datetime4 = datetime
    },
    // 单站搜索echarts
    submitSearchList () {
      this.looklists = true
      this.updateTitle = '历史对比图'
      let search = {}
      if (this.formInline.id) {
        search.stationid = this.formInline.id
      }
      if (this.formInline.datetime1 || this.formInline.datetime2) {
        search.daterange1  = `${this.formInline.datetime1}-01|#|${this.formInline.datetime2}-01`
      }
      if (this.formInline.datetime3 || this.formInline.datetime4) {
        search.daterange2 = `${this.formInline.datetime3}-01|#|${this.formInline.datetime4}-01`
      }
      if (this.formInline.element) {
        for (var i = 0; i < this.elementList.length; i++) {
          if (this.elementList[i].name) {
            this.formInline.element = this.elementList[i].id
          }
        }
        search.element = this.formInline.element
      }
      GetHisEcharts(search).then(res => {
        if (res.code === ERR_OK) {
          this._GetHisEcharts(res.result)
        }
      })
    },
    // echarts图
    _GetHisEcharts (obj) {
      let option = {}
      let myChart = echarts.init(document.getElementById('main'))
      var colors = ['#5793f3', '#d14a61', '#675bba']
      let raintime = []
      let rainstime = []
      let rain = []
      let rains = []
      for (var i = 0; i < obj.result1.length; i++) {
        let str = obj.result1[i].yearMonth
        raintime.push(str)
        rain.push(obj.result1[i].r8sum)
      }
      for (var j = 0; j < obj.result2.length; j++) {
        let strtime = obj.result2[j].yearMonth
        rainstime.push(strtime)
        rains.push(obj.result2[j].r8sum)
      }
      option = {
        color: colors,

        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['现查询降水量', '历史降水量']
          // data: str
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1]
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  // console.log(params)
                  return '降水量  ' + params.value
                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                }
              }
            },
            data: raintime
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0]
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return '降水量  ' + params.value
                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                }
              }
            },
            data: rainstime
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '2015 降水量',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: rain
          },
          {
            name: '2016 降水量',
            type: 'line',
            smooth: true,
            data: rains
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  mounted() {
    this._GettownList()
    this._GetHistorcal()
  }
}
</script>

<style lang="less" scoped>

</style>
