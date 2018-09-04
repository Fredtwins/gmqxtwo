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
              <Form-item label="时间段">
                <Date-picker type="datetime" v-model="formInline.datetime1" @on-change="datetimeChange1"></Date-picker>&nbsp;至&nbsp;
                <Date-picker type="datetime" v-model="formInline.datetime2" @on-change="datetimeChange2"></Date-picker>
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
        datetime2: ''
      },
      loading: false,
      dataSourceList: [],
      theadArr: hourrainthead(this),
      stationList: [],
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
    submitSearch (page) {
      let search = {}
      if (this.formInline.id) {
        search.stationid = this.formInline.id
      }
      if (this.formInline.datetime1 || this.formInline.datetime2) {
        search.datetime = this.formInline.datetime1 + '|#|' + this.formInline.datetime2
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
