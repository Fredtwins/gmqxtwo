<template>
  <i-col span="21">
    <div class="heightMax">
      <div class="station">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">统计分析</Breadcrumb-item>
          <Breadcrumb-item class="blue">日雨量</Breadcrumb-item>
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
                <Date-picker type="date" v-model="formInline.datetime1" @on-change="datetimeChange1"></Date-picker>&nbsp;至&nbsp;
                <Date-picker type="date" v-model="formInline.datetime2" @on-change="datetimeChange2"></Date-picker>
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
import { GetDayrain, GettownList } from 'api/stationlist'
import { ERR_OK } from 'api/config'
import { dayrainthead } from 'common/js/table'
export default {
  data () {
    return {
      formInline: {
        id: '',
        datetime1: '',
        datetime2: ''
      },
      loading: false,
      stationList: [],
      dataSourceList: [],
      theadArr: dayrainthead(this),
      total: 0,
      current: 1
    }
  },
  methods: {
    datetimeChange1 (datetime) {
      this.formInline.datetime1 = datetime
    },
    datetimeChange2 (datetime) {
      this.formInline.datetime2 = datetime
    },
    // 列表渲染
    _GetDayrain(page, search) {
      this.loading = true
      GetDayrain(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.dataSourceList = res.result.result
        }
      })
    },
    _GettownList() {
      GettownList().then(res => {
        if (res.code === ERR_OK) {
          this.stationList = res.result.result
        }
      })
    },
    // 搜索
    submitSearch(page) {
      let search = {}
      if (this.formInline.id) {
        search.stationid = this.formInline.id
      }
      if (this.formInline.datetime1 || this.formInline.datetime2) {
        search.datetime = this.formInline.datetime1 + '|#|' + this.formInline.datetime2
      }
      this._GetDayrain(page, search)
    },
    // 页码
    changePage (page) {
      this.page = page
      this._GetDayrain(page, search)
    }
  },
  mounted () {
    this._GetDayrain()
    this._GettownList()
  }
}
</script>

<style lang="less" scoped>

</style>
