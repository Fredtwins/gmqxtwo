<template>
  <i-col span="21">
    <div class="heightMax">
      <div class="station">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">统计分析</Breadcrumb-item>
          <Breadcrumb-item class="blue">时雨量</Breadcrumb-item>
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
                <Date-picker type="date" v-model="formInline.datetime1" @on-change="datetimeChange1"></Date-picker>
                &nbsp;&nbsp;&nbsp;
                <Select v-model="formInline.hour" style="width:160px">
                  <Option v-for="item in hourformArray" :key="item.index" :value="item"></Option>
                </Select>
                &nbsp;至&nbsp;
                <Date-picker type="date" v-model="formInline.datetime2" @on-change="datetimeChange2"></Date-picker>
                 &nbsp;&nbsp;&nbsp;
                <Select v-model="formInline.hours" style="width:160px">
                  <Option v-for="item in hoursformArray" :key="item.index" :value="item"></Option>
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
import { GetHourrain, GettownList } from 'api/stationlist'
import { ERR_OK } from 'api/config'
import { hourrainthead } from 'common/js/table'
export default {
  data () {
    return {
      formInline: {
        id: '',
        datetime1: '',
        datetime2: '',
        hour: '',
        hours: ''
      },
      loading: false,
      dataSourceList: [],
      theadArr: hourrainthead(this),
      stationList: [],
      total: 0,
      current: 1,
      hourformArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      hoursformArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      arr: '',
      str: ''
    }
  },
  methods: {
    datetimeChange1 (datetime) {
      this.formInline.datetime1 = datetime
    },
    datetimeChange2 (datetime) {
      this.formInline.datetime2 = datetime
    },
    submitSearch (page) {
      let search = {}
      if (this.formInline.id) {
        search.stationid = this.formInline.id
      }
      if (this.formInline.hour < 10) {
        this.str = `0${this.formInline.hour}`
      } else {
        this.str = this.formInline.hour
      }
      if (this.formInline.hours < 10) {
        this.arr = `0${this.formInline.hours}`
      } else {
        this.arr = this.formInline.hours
      }
      if (this.formInline.datetime1 || this.formInline.datetime2) {
        search.datetime = `${this.formInline.datetime1} ${this.str}:00:00|#|${this.formInline.datetime2} ${this.arr}:00:00`
      }
      this._GetHourrain(page, search)
    },
    changePage (page) {
      this.page = page
      this._GetHourrain(page, search)
    },
    // 列表渲染
    _GetHourrain (page, search) {
      this.loading = true
      GetHourrain(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.dataSourceList = res.result.result
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
    }
  },
  mounted() {
    this._GetHourrain()
    this._GettownList()
  }
}
</script>

<style lang="less" scoped>

</style>
