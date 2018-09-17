<template>
  <i-col span="21">
    <div class="heightMax">
      <div class="station">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">统计分析</Breadcrumb-item>
          <Breadcrumb-item class="blue">单站同日时极值</Breadcrumb-item>
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
                <Form-item label="选择年">
                  <Date-picker type="year" placeholder="选择年份" @on-change="yearChange" format="yyyy"></Date-picker>
                </Form-item>
                <Form-item label="选择月">
                  <Select v-model="formInline.month" style="width:200px">
                    <Option v-for="item in monthList" :value="item" :key="item.index"></Option>
                  </Select>
                </Form-item>
                <Form-item label="选择时">
                  <Select v-model="formInline.day" style="width:200px">
                    <Option v-for="item in hourList" :value="item" :key="item.index"></Option>
                  </Select>
                </Form-item>
              <Button type="primary" @click="submitSearch(1)">搜索</Button>
              <!-- <Button style="float: right" type="primary" @click="exportExcel">导出excel表格</Button> -->
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
import { DayHourExtremethead } from 'common/js/table'
import { GetDayHourQuery, GettownList } from 'api/stationlist'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      titlestation: '',
      formInline: {
        id: '',
        year: '',
        month: '',
        day: ''
      },
      stationList: [],
      loading: false,
      dataSourceList: [],
      total: 0,
      current: 1,
      theadArr: DayHourExtremethead(this),
      hourList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  },
  methods: {
    // 点击搜索
    submitSearch (page) {
      let search = {
        minute: 0
      }
      if (this.formInline.year) {
        search.year = this.formInline.year
      }
      if (this.formInline.month) {
        search.month = this.formInline.month
      }
      if (this.formInline.day) {
        search.day = this.formInline.day
      }
      if (this.formInline.id) {
        search.stationid = this.formInline.id
      }
      this.titlestation = search.stationid
      this._GetDayHourQuery(page, search)
    },
    // 选择年份
    yearChange (year) {
      if (year) {
        this.formInline.year = parseInt(year)
      } else {
        this.formInline.year = ''
      }
    },
    // 站名下拉菜单
    _GettownList () {
      GettownList().then(res => {
        if (res.code === ERR_OK) {
          this.stationList = res.result.result
        }
      })
    },
    // 列表查询
    _GetDayHourQuery (page, search) {
      this.loading = true
      GetDayHourQuery(page, search).then(res => {
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
      this._GetDayHourQuery(page)
    }
  },
  mounted() {
    this._GettownList()
    this._GetDayHourQuery()
  }
}
</script>

<style lang="less" scoped>
.heightMax {
  height: 52rem;
  min-width: calc(100vh - 40px);
  background: #e8f0f0;
  padding: 10px;
  margin-top: 16px;
  .station {
    .ml32 {
      .black {}
      .blue {}
    }
  }
}
.pullright {
  padding-top: 8px;
  padding-right: 5px;
  float: right;
}
.stationtitle {
  margin: 0 auto;
  text-align: center;
  font-weight: 900;
}
</style>


