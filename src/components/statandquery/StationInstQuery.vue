<template>
  <i-col span="21">
    <div class="heightMax">
      <div class="station">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">统计分析</Breadcrumb-item>
          <Breadcrumb-item class="blue">多站同时</Breadcrumb-item>
        </Breadcrumb>
        <Collapse accordion value="1" class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
            <Form ref="formInline" :model="formInline" inline :label-width="80">
              <Form-item label="时间">
                <Date-picker type="datetime" v-model="formInline.datetime" @on-change="datetimeChange"></Date-picker>
              </Form-item>
              <Button type="primary" @click="add">+1日</Button>
              <Button type="error" @click="del">-1日</Button>
              <Button type="primary" @click="adds">+1小时</Button>
              <Button type="error" @click="dels">-1小时</Button> &nbsp;&nbsp;&nbsp;
              <Button type="primary" @click="submitSearch">搜索</Button>
              <!-- <Button style="float: right" type="primary" @click="exportExcel">导出excel表格</Button> -->
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
import { SyayicQuery } from 'common/js/table'
import { GetStationInstQuery } from 'api/stationlist'
import { ERR_OK } from 'api/config'
import { timeFilter } from 'common/js/util'
export default {
  data () {
    return {
      formInline: {
        datetime: ''
      },
      loading: false,
      dataSourceList: [],
      theadArr: SyayicQuery(this),
      timeAgo: '',
      timeNew: '',
      timeAgos: ''
    }
  },
  methods: {
    // 日期时间
    datetimeChange (datetime) {
      this.formInline.datetime = datetime
    },
    // 点击搜索按钮
    submitSearch () {
      let search = {}
      if (this.formInline.datetime) {
        search.datetime = this.timeAgos
      }
      this._GetStationInstQuery(search)
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
    // 加一小时
    adds () {
      this.timeAgo = this.timeAgo + 60 * 60 * 1000
      let time = timeFilter(new Date(this.timeAgo), 'yyyy-MM-dd HH:mm:ss')
      this.formInline.datetime = time
      this.timeAgos = this.formInline.datetime
    },
    // 减一小时
    dels () {
      this.timeAgo = this.timeAgo - 60 * 60 * 1000
      let time = timeFilter(new Date(this.timeAgo), 'yyyy-MM-dd HH:mm:ss')
      this.formInline.datetime = time
      this.timeAgos = this.formInline.datetime
    },
    // 列表显示
    _GetStationInstQuery (search) {
      this.loading = true
      GetStationInstQuery(search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.dataSourceList = res.result.result
        }
      })
    }
  },
  created() {
    // 获取时间
    var time = +new Date()
    var timec = new Date(time)
    var second = timec.getSeconds()
    var minutes = timec.getMinutes()
    var temp = minutes
    var res = time - second * 1000 - temp * 60 * 1000
    this.timeAgo = res
    this.timeNew = timec
  },
  mounted() {
    this._GetStationInstQuery()
    this.add()
    this.del()
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
</style>
