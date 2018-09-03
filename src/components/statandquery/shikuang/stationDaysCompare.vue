<template>
  <i-col span="21">
    <div class="heightMax">
      <div class="station">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">单站多日</Breadcrumb-item>
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
              <Form-item label="年份">
                <Date-picker
                v-model="formInline.year"
                type="year"
                placeholder="选择日期"
                @on-change="datetimeChange"
                ></Date-picker>
              </Form-item>
              <Form-item label="月份">
                <Select v-model="formInline.month" clearable style="width:150px" @on-change="datetimeChange1">
                  <Option value="1">1月</Option>
                  <Option value="2">2月</Option>
                  <Option value="3">3月</Option>
                  <Option value="4">4月</Option>
                  <Option value="5">5月</Option>
                  <Option value="6">6月</Option>
                  <Option value="7">7月</Option>
                  <Option value="8">8月</Option>
                  <Option value="9">9月</Option>
                  <Option value="10">10月</Option>
                  <Option value="11">11月</Option>
                  <Option value="12">12月</Option>
                </Select>
              </Form-item>
              <Button type="primary" @click="submitSearch(1)">搜索</Button>
            </Form>
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
import { DaycompareThead } from 'common/js/table'
import { ERR_OK } from 'api/config'
import { GetDaycompare, GettownList } from 'api/stationlist'
export default {
  data () {
    return {
      stationList: [],
      formInline: {
        id: '',
        month: '',
        year: ''
      },
      loading: false,
      dataSourceList: [],
      theadArr: DaycompareThead(this),
      total: 0,
      current: 1
    }
  },
  methods: {
    // 年份
    datetimeChange (year) {
      this.formInline.year = year
    },
    // 月份
    datetimeChange1 (month) {
      this.formInline.month = month
    },
    // 点击搜索
    submitSearch (page) {
      let search = {}
      let data = ''
      if (this.formInline.id) {
        search.stationid = this.formInline.id
      }
      if (this.formInline.year) {
        search.year = parseInt(this.formInline.year)
      }
      if (this.formInline.month) {
        search.month = parseInt(this.formInline.month)
      }
      this._GetDaycompare(page, search)
    },
    // 站名下拉框
    _GettownList() {
      GettownList().then(res => {
        if (res.code === ERR_OK) {
          this.stationList = res.result.result
        }
      })
    },
    // 列表渲染
    _GetDaycompare (page, search) {
      this.loading = true
      GetDaycompare(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.dataSourceList = res.result.result
          this.total = res.result.totalSize
          this.current = res.result.page
        }
      })
    },
    // 页码
    changePage (page) {
      this.page = page
      this.submitSearch(page)
    }
  },
  mounted() {
    this._GettownList()
    this._GetDaycompare()
  }
}
</script>

<style lang="less" scoped>

</style>


