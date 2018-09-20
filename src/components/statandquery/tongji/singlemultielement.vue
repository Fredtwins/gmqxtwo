<template>
  <i-col span="21">
    <div class="heightMax">
      <div class="station">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">统计分析</Breadcrumb-item>
          <Breadcrumb-item class="blue">单站多要素对比图</Breadcrumb-item>
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
              <Form-item label="时间段">
                <Date-picker type="datetime" v-model="formInline.datetime1" @on-change="datetimeChange1"></Date-picker>&nbsp;至&nbsp;
                <Date-picker type="datetime" v-model="formInline.datetime2" @on-change="datetimeChange2"></Date-picker>
              </Form-item>
              <Button type="primary" @click="submitSearch(1)">搜索</Button>
              <Button type="success" @click="gettownecharts">单站搜索</Button>
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
import { Getmultielement, GetHistorcal } from 'api/statistics'
import { ERR_OK } from 'api/config'
import { multielementThead } from 'common/js/table'
import echarts from 'echarts'
export default {
  data () {
    return {
      looklists: false,
      formItem: {},
      updateTitle: '',
      loading: false,
      dataSourceList: [],
      theadArr: multielementThead(this),
      stationList: [],
      formInline: {
        id: '',
        datetime1: '',
        datetime2: ''
      }
    }
  },
  methods: {
    // 列表
    _Getmultielement (search) {
      this.loading = true
      Getmultielement(search).then(res => {
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
        search.datetime = this.formInline.datetime1 + '|#|' + this.formInline.datetime2
      }
      this._Getmultielement(search)
    },
    // 选择时间
    datetimeChange1 (datetime) {
      this.formInline.datetime1 = datetime
    },
    datetimeChange2 (datetime) {
      this.formInline.datetime2 = datetime
    },
    // echarts图查询
    gettownecharts () {
      this.looklists = true
      this.updateTitle = '元素图'
      let search = {}
      if (this.formInline.id) {
        search.stationid = this.formInline.id
      }
      if (this.formInline.datetime1 || this.formInline.datetime2) {
        search.datetime = this.formInline.datetime1 + '|#|' + this.formInline.datetime2
      }
      GetHistorcal(search).then(res => {
        if (res.code === ERR_OK) {
          this.GetEchartsList(res.result.result)
        }
      })
    },
    // echarts图
    GetEchartsList (obj) {
      let option = {}
      var qiwen = []
      var qiya = []
      var shidu = []
      var dianya = []
      var rain = []
      var timesecharts = []
      let myChart = echarts.init(document.getElementById('main'))
      // 循环单站的名字
      for (var i = 0; i < obj.length; i++) {
        qiwen.push(obj[i].t)
        qiya.push(obj[i].p)
        shidu.push(obj[i].u)
        dianya.push(obj[i].wpv)
        rain.push(obj[i].r24h)
        timesecharts.push(obj[i].datetime)
      }
      option = {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['气温', '气压', '相对湿度', '电压', '雨量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: timesecharts
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '气温',
            type: 'line',
            stack: '总量',
            data: qiwen
          },
          {
            name: '气压',
            type: 'line',
            stack: '总量',
            data: qiya
          },
          {
            name: '相对湿度',
            type: 'line',
            stack: '总量',
            data: shidu
          },
          {
            name: '电压',
            type: 'line',
            stack: '总量',
            data: dianya
          },
          {
            name: '雨量',
            type: 'line',
            stack: '总量',
            data: rain
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  mounted() {
    this._GettownList()
    this._Getmultielement()
  }
}
</script>

<style lang="less" scoped>

</style>
