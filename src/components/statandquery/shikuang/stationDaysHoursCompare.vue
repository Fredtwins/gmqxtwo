<template>
  <i-col span="21">
    <div class="heightMax">
      <div class="station">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">统计分析</Breadcrumb-item>
          <Breadcrumb-item class="blue">单站多日时极值</Breadcrumb-item>
        </Breadcrumb>
        <Collapse accordion value="1" class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
            <Form ref="formInline" :model="formInline" inline :label-width="80">
              <Form-item label="站点名称" prop="station_name">
                <Select v-model="formInline.id" clearable style="width:200px">
                  <Option v-for="item in stationList" :value="item.id" :key="item.index">{{item.cn}}</Option>
                </Select>
              </Form-item>
              <Form-item label="选择年">
                <Date-picker v-model="formInline.year" type="year" placeholder="选择年份" @on-change="yearChange" format="yyyy"></Date-picker>
              </Form-item>
              <Form-item label="选择月">
                <Select v-model="formInline.month" style="width:200px">
                  <Option v-for="item in monthList" :value="item" :key="item.index"></Option>
                </Select>
              </Form-item>
              <Form-item label="选择时" prop="hour">
                <Select v-model="formInline.hour" style="width:200px">
                  <Option v-for="item in hourList" :value="item" :key="item.index"></Option>
                </Select>
              </Form-item>
              <Button type="primary" @click="submitSearch(1)">搜索</Button>
            </Form>
            <h1 class="stationtitle">{{titlestation}}</h1>
            </template>
          </Panel>
        </Collapse>
        <div class="center">
          <Table :loading="loading" :data="dataSourceList" :columns="theadArr" border></Table>
        </div>
        <div class="pullright page">
          <Page :total="total" :current="current" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </i-col>
</template>

<script>
import { GetDayHourscompare, GettownList } from 'api/stationlist'
import { DayHoursThead } from 'common/js/table'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      titlestation: '',
      current: 1,
      total: 0,
      formInline: {
        id: '',
        month: '',
        year: '',
        hour: ''
      },
      hourList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      loading: false,
      dataSourceList: [],
      theadArr: DayHoursThead(this),
      stationList: []
    }
  },
  methods: {
    submitSearch (page) {
      let search = {}
      if (this.formInline.id) {
        search.stationid = this.formInline.id
      }
      if (this.formInline.month) {
        search.month = this.formInline.month
      }
      if (this.formInline.year) {
        search.year = parseInt(this.formInline.year)
      }
      if (this.formInline.hour) {
        search.hour = this.formInline.hour
      }
      this.titlestation = search.stationid
      this._GetDayHourscompare(page, search)
    },
    changePage (page) {
      this.page = page
      this._GetDayHourscompare(page, search)
    },
    yearChange (year) {
      this.formInline.year = year
    },
    // 列表渲染
    _GetDayHourscompare (page, search) {
      this.loading = true
      GetDayHourscompare(page, search).then(res => {
        if (res.code ===ERR_OK ) {
          this.loading = false
          this.dataSourceList = res.result.result
        }
      })
    },
    // 站名下拉框
    _GettownList() {
      GettownList().then(res => {
        if (res.code === ERR_OK) {
          this.stationList = res.result.result
        }
      })
    }
  },
  mounted () {
    this._GetDayHourscompare()
    this._GettownList()
  }
}
</script>

<style lang="less" scoped>
.stationtitle {
  margin: 0 auto;
  text-align: center;
  font-weight: 900;
}
</style>
