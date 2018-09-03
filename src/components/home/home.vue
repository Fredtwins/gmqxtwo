<template>
  <div class="homeconent">
    <Row type="flex" class="code-row-bg">
      <!--左边echarts图  -->
      <i-col span="8" class="box">
        <div class="leftecharts">
          <Card class="card1" dis-hover>
            <p slot="title">当天采集统计</p>
            <h2 class="times" v-model="times">{{times}}</h2>
            <div class="staticChart" id="staticChart"></div>
          </Card>
        </div>
      </i-col>
      <!--右边地图天气  -->
      <i-col span="15" class="rightbox">
        <i-col class="righttop">
          <div class="ditu">
            <!--更合镇  -->
            <div class="genghe">
              <a href="javascript:;" title="高明举世农业开发有限公司">
               <img :src="her1" alt="" width="50px" height="50px">
            </a>
              <div class="wenzi">举世农业</div>
            </div>
            <!--杨和镇  -->
            <div class="yanghe">
              <a href="javascript:;" title="高明杨梅丽堂蔬菜基地">
               <img :src="url2" alt="" width="50px" height="50px">
            </a>
              <div class="wenzi2">丽堂</div>
            </div>
            <!--荷城  -->
            <div class="hecheng">
              <a href="javascript:;" title="马宁泵站">
               <img :src="url3" alt="" width="50px" height="50px">
            </a>
              <div class="wenzi3">马宁</div>
            </div>
            <!--明城  -->
            <div class="mingcheng">
              <a href="javascript:;" title="高明云勇林场" >
               <img :src="url4" alt="" width="50px" height="50px">
            </a>
              <div class="wenzi4">云勇</div>
            </div>
          </div>
        </i-col>
        <!--实况图  -->
        <i-col class="righttext">
          <div>
            <Table stripe border :columns="theadArr" :data="dataSourceList" stripe></Table>
          </div>
        </i-col>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { TownList } from 'common/js/table'
import { GetTownList, getecharts, getrainList } from 'api/home'
import { ERR_OK } from 'api/config'
import echarts from 'echarts'
export default {
  data () {
    return {
      times: '',
      theadArr: TownList(this),
      dataSourceList: [],
      her1: [],
      url2: [],
      url3: [],
      url4: [],
    }
  },
  methods: {
    // 四个镇街的数据
    _GetTownList() {
      let search = {}
      GetTownList(search).then(res => {
        if (res.code === ERR_OK) {
          this.dataSourceList = res.result
        }
      })
    },
    // 左边echarts图
    _echartslist (obj) {
      let option = {}
      let myChart = echarts.init(document.getElementById('staticChart'))
      var xAxisDatas = ['', '', '', '']
      var yAxisDatas = ['', '', '', '']
      var yAxisDatas2 = ['', '', '', '']
      for (var i = 0; i < obj.keys.length; i++) {
        xAxisDatas.push(obj.keys[i])
      }
      // 实际采集的
      for (var j = 0; j < obj.actualCount.length; j++) {
        yAxisDatas.push(obj.actualCount[j])
      }
      // 应采集的
      for (var m = 0; m < obj.shouldCount.length; m++) {
        yAxisDatas2.push(obj.shouldCount[m])
      }
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['应采数据量', '实际采集数据量'],
          textStyle: {
            color: '#fff',
            fontSize: 16 // 用 legend.textStyle.fontSize 更改示例大小
          }
        },
        grid: {
          left: '0.2%',
          right: '0.2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0],
          position: 'bottom',
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 1 // 这里是坐标轴的宽度
            }
          },
        },
        yAxis: {
          type: 'category',
          data: xAxisDatas,
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 1 // 这里是坐标轴的宽度
            }
          },
          axisTick: {
            show: false
          },
          splitLine: { show: false }
        },
        series: [
          {
            name: '应采数据量',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#87CEEB'
              }
            },
            data: yAxisDatas2
          },
          {
            name: '实际采集数据量',
            type: 'bar',
            // xAxisIndex: 1,
            itemStyle: {
              normal: {
                color: '#98FB98'
              }
            },
            data: yAxisDatas
          }
        ]
      }
      myChart.setOption(option)
    },
    // 渲染echarts图
    _getechartsList () {
      let search = {}
      getecharts(search).then(res => {
        if (res.code === ERR_OK) {
          this.times = res.result.collectionTime
          this._echartslist(res.result)
        }
      })
    },
    // 右边天气预报图
    _getrain () {
      let search = {}
      getrainList(search).then(res => {
        if (res.code === ERR_OK) {
          this.her1 = 'static/alerticons/' + res.result[1].code + '.png'
          this.url2 = 'static/alerticons/' + res.result[2].code + '.png'
          this.url3 = 'static/alerticons/' + res.result[3].code + '.png'
          this.url4 = 'static/alerticons/' + res.result[0].code + '.png'
        }
      })
    }
  },
  mounted () {
    this._GetTownList()
    this._getechartsList()
    this._getrain()
  }
}
</script>

<style lang="less" scoped>
.homeconent {
  width: 100%;
  height: 100%;
  // height: 56.5rem;
  background: #13377b;
  overflow: auto;
  overflow: scroll;
  overflow: hidden;
  .code-row-bg {
    .box {
      border: 3px solid #41b0ff;
      margin: 4.5rem 16px 5.7rem 16px;
      height: 44.8rem;
      margin-left: 2rem;
      .leftecharts {
        h2 {
          color: #fdd158;
        }
      }
    }
    .rightbox {
      .righttop {
        border: 3px solid #41b0ff;
        margin: 4.5rem 2px 3.8rem 2px;
        height: 28rem;
        // background: #13377b;
        background-color: #fff;
        /* position: relative; */
        overflow: hidden;
        .ditu {
          background-image: url('../../../static/image/home/ditu5.jpg');
          background-repeat: repeat-y;
          width: 58rem;
          height: 27.6rem;
          margin-left: 16rem;
          overflow: hidden;
          background-size: cover;
          background-position: -160px -155px;
          .genghe {
            position: relative;
            top: 17.5rem;
            left: 17rem;
            width: 200px;
            height: 50px;
            overflow: hidden;
          }
          .yanghe {
            position: relative;
            top: 10rem;
            right: -28rem;
            width: 200px;
            height: 50px;
            overflow: hidden;
          }
          .hecheng {
            position: relative;
            top: -0.5rem;
            right: -34rem;
            width: 200px;
            height: 50px;
            overflow: hidden;
          }
          .mingcheng {
            position: relative;
            top: 1rem;
            right: -22rem;
            width: 200px;
            height: 50px;
            overflow: hidden;
          }
        }
      }
      .righttext {
        border:3px solid #41b0ff;
        .ivu-table-wrapper {
          padding-top: 0 !important;
        }
      }
    }
  }
}
.staticChart {
  width: 100%;
  height: 35rem;
  margin-top: 35px;
}
</style>


