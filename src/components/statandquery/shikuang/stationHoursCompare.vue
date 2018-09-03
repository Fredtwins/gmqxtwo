<template>
  <i-col span="21">
    <div class="heightMax">
      <div class="station">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">单站同日多时</Breadcrumb-item>
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
								<Form-item label="时间">
									<Date-picker :value="datetimers" type="datetime" v-model="formInline.datetime" @on-change="datetimeChange1">
									</Date-picker>
								</Form-item>
								<Form-item label="时间间隔">
									<Select v-model="formInline.time_type" clearable style="width:150px">
										<Option value="1">5分钟数据</Option>
										<Option value="2">整点数据</Option>
									</Select>
								</Form-item>
								<Button type="primary" @click="add">+1日</Button>
								<Button type="error" @click="del">-1日</Button>
								<Button type="primary" @click="submitSearch">搜索</Button>
            </Form>
            </template>
          </Panel>
        </Collapse>
        <div class="center">
          <Table :loading="loading" :data="dataSourceList" :columns="theadArr" border></Table>
        </div>
      </div>
    </div>
  </i-col>
</template>

<script>
import { Hourcomparethead } from 'common/js/table'
import { ERR_OK } from 'api/config'
import { GetHourcompare, GettownList } from 'api/stationlist'
import { timeFilter } from 'common/js/util'
export default {
  data () {
    return {
      formInline: {
        id: '',
        datetime: '',
        time_type: ''
      },
      loading: false,
      dataSourceList: [],
      theadArr: Hourcomparethead(this),
      stationList: [],
      datetimers: '',
      timeAgo: '',
      timeNew: '',
      timeAgos: ''
    }
  },
  methods: {
    // 搜索
    submitSearch () {
      let search = {}
      if (this.formInline.id) {
        search.stationid = this.formInline.id
      }
      if (this.formInline.datetime) {
        search.datetime = this.formInline.datetime
      }
      if (this.formInline.time_type === '2') {
        search.minute = 0
      }
      this._GetHourcompare(search)
    },
    // 表格显示
    _GetHourcompare (search) {
      this.loading = true
      GetHourcompare(search).then(res => {
        if (res.code === ERR_OK) {
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
    },
    // 加一日
    add () {
      this.timeAgo = this.timeAgo + 24 * 60 * 60 * 1000
      let time = timeFilter(new Date(this.timeAgo), 'yyyy-MM-dd HH:mm:ss')
      this.formInline.datetime = time
      this.timeAgos = this.formInline.datetime
    },
    // 减一日
    del () {
      this.timeAgo = this.timeAgo - 24 * 60 * 60 * 1000
      let time = timeFilter(new Date(this.timeAgo), 'yyyy-MM-dd HH:mm:ss')
      this.formInline.datetime = time
      this.timeAgos = this.formInline.datetime
    },
    // 选择时间
    datetimeChange1 (datetime) {
      this.formInline.datetime = datetime
    }
  },
  created() {
    // 获取时间
    var time = +new Date()
    var timec = new Date(time)
    var second = timec.getSeconds()
    var minutes = timec.getMinutes()
    var temp = minutes % 5
    var res = time - second * 1000 - 10 * 60 * 1000 - temp * 60 * 1000
    this.timeAgo = res
    this.timeNew = timec
  },
  mounted() {
    this._GetHourcompare()
    this._GettownList()
  }
}
</script>

<style lang="less" scoped>

</style>
