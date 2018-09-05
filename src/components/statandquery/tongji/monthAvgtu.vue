<template>
  <i-col span="21">
    <div class="heightMax">
      <div class="station">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">统计分析</Breadcrumb-item>
          <Breadcrumb-item class="blue">风向频率统计</Breadcrumb-item>
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
              <Form-item label="统计类型">
                <Select v-model="formInline.type" clearable style="width:150px">
                  <Option value="wd2">{{time1}}</Option>
                  <Option value="wd10">{{time2}}</Option>
                </Select>
              </Form-item>
              <Form-item label="年">
                <Date-picker v-model="formInline.year" type="year" @on-change="yearChange" clearable></Date-picker>
              </Form-item>
              <Form-item label="月">
                <Select v-model="formInline.month" clearable style="width:200px">
                  <Option v-for="item in monthArray" :value="item" :key="item.index"></Option>
                </Select>
              </Form-item>
              <Button type="primary" @click="submitSearch(1)">搜索</Button>
            </Form>
            </template>
          </Panel>
        </Collapse>
        <div class="center">
          <Table :loading="loading" :data="dataSourceList" :columns="theadArr" border></Table>
          <div class="ftu">
            <div class="fromtime" v-model="formInline.time_type">{{formInline.time_type}}</div>
            <div id="main" style="width: 600px;height:500px;"></div>
             <div class="jingfeng">{{jingfeng}}</div>
          </div>
        </div>
      </div>
    </div>
  </i-col>
</template>

<script>
import { GetmonthAvgtu } from 'api/statistics'
import { GettownList } from 'api/stationlist'
import { ERR_OK } from 'api/config'
import echarts from 'echarts'
import { monthAvgtuthead } from 'common/js/table'
export default {
  data () {
    return {
      stationList: [],
      monthArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      time1: '2分钟风向频率',
      time2: '10分钟风向频率',
      jingfeng: '',
      formInline: {
        id: '',
        type: '',
        month: '',
        year: '',
        time_type: ''
      },
      loading: false,
      dataSourceList: [],
      theadArr: monthAvgtuthead(this)
    }
  },
  methods: {
    // 列表渲染
    _GetmonthAvgtu(page, search) {
      this.loading = true
      GetmonthAvgtu(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.dataSourceList = res.result.result
          for (let i = 0; i < this.dataSourceList.length; i++) {
            for (let key in this.dataSourceList[i]) {
              this.dataSourceList[i][key] = (this.dataSourceList[i][key] * 100).toFixed(2)
            }
          }
          this.jingfeng = 'C=' + res.result.result[0].jingfeng + '%'
          this._GetMonthTU(res.result.result[0])
        }
      })
    },
    // 站名渲染
    _GettownList() {
      GettownList().then(res => {
        if (res.code === ERR_OK) {
          this.stationList = res.result.result
        }
      })
    },
    // 搜索
    submitSearch (page) {
      let search = {}
      if (this.formInline.id) {
        search.stationid = this.formInline.id
      }
      if (this.formInline.type) {
        search.type = this.formInline.type
      }
      if (this.formInline.year) {
        search.year = parseInt(this.formInline.year )
      }
      if (this.formInline.month) {
        search.month = parseInt(this.formInline.month)
      } else {
        this.$Notice.warning({
          title: '请选择风向类型'
        })
        return
      }
      this._GetmonthAvgtu(page, search)
    },
    // 选择年
    yearChange (year) {
      this.formInline.year = year
    },
    // 风力风向图
    _GetMonthTU(obj) {
      let option = {}
      var myChart = echarts.init(document.getElementById('main'))
      var fengli = []
      var indicator = [{
        text: 'N',
        max: 50
      }, {
        text: 'NNW',
        max: 50
      }, {
        text: 'NW',
        max: 50
      }, {
        text: 'WNW',
        max: 50
      }, {
        text: 'W',
        max: 50
      }, {
        text: 'WSW',
        max: 50
      }, {
        text: 'SW',
        max: 50
      }, {
        text: 'SSW',
        max: 50
      }, {
        text: 'S',
        max: 50
      }, {
        text: 'SSE',
        max: 50
      }, {
        text: 'SE',
        max: 50
      }, {
        text: 'ESE',
        max: 50
      }, {
        text: 'E',
        max: 50
      }, {
        text: 'ENE',
        max: 50
      }, {
        text: 'NE',
        max: 50
      }, {
        text: 'NNE',
        max: 50
      }]
      // console.log(indicator)
      for (var i = 0; i < indicator.length; i++) {
        fengli.push(obj[indicator[i].text])
      }
      // console.log(fengli)
      option = {
        title: {
          text: '玫瑰图中风频每圈间隔为10%',
          subtext: '风向频率',
          x: 'right',
          y: 'bottom',
          textStyle: { // 设置主标题风格
            color: 'blue' // 设置主标题字体颜色
          }
        },
        tooltip: {
          trigger: 'axis',
          show: true
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              title: '下载'
            }
          }
        },
        calculable: false,
        polar: [{
          indicator: indicator,
          radius: 150
        }],
        series: [{
          type: 'radar',
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default'
              }
            }
          },
          data: [{
            value: fengli,
            name: '风向'
          }],
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default',
                opacity: 0.1,
                color: '#CAE1FF'
              }
            }
          }
        }]
      }
      myChart.setOption(option)
    }
  },
  mounted () {
    this._GetmonthAvgtu()
    this._GettownList()
  }
}
</script>

<style lang="less" scoped>
#main {
  margin: 0 auto;
}

.ftu {
  position: relative;
}

.jingfeng {
  font-size: 26px;
  color: blue;
  position: absolute;
  top: 25rem;
  left: 62rem;
}
.fromtime {
  display: inline-block;
  font-size: 2em;
  position: relative;
  top: 3rem;
  left: 30rem;
}
</style>
