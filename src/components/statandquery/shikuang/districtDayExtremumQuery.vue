<template>
  <i-col span="21">
    <div class="heightMax">
      <div class="station">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">多站同日</Breadcrumb-item>
        </Breadcrumb>
        <Collapse accordion value="1" class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
            <Form ref="formInline" :model="formInline" inline :label-width="80">
              <Form-item label="时间段">
									<Date-picker
									:value="datetimers"
									type="datetime"
									v-model="formInline.datetime"
									format="yyyy-MM-dd"
									@on-change="datetimeChange1"
									>
									</Date-picker>
								</Form-item>
								<Button type="primary" @click="add">+ 1日</Button>
								<Button type="error" @click="del">- 1日</Button>
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
import { GetDayectremum } from 'api/stationlist'
import { ERR_OK } from 'api/config'
import { DayExtrmumthead } from 'common/js/table'
import { timeFilter } from 'common/js/util'
export default {
  data () {
    return {
      formInline: {
        datetime: ''
      },
      loading: false,
      dataSourceList: [],
      theadArr: DayExtrmumthead(this),
      datetimers: '',
      timeAgo: '',
      timeNew: ''
    }
  },
  methods: {
    // 选择时间
    datetimeChange1 (datetime) {
      this.timeAgo = new Date(datetime).getTime()
      this.formInline.datetime = datetime
    },
    // 点击搜索
    submitSearch () {
      let search = {}
      if (this.formInline.datetime) {
        search.datetime = this.formInline.datetime
      }
      this._GetDayectremum(search)
    },
    // 加一日
    add () {
      this.timeAgo = this.timeAgo + 24 * 60 * 60 * 1000
      let time = timeFilter(new Date(this.timeAgo), 'yyyy-MM-dd')
      this.formInline.datetime = time
    },
    // 减一日
    del () {
      this.timeAgo = this.timeAgo - 24 * 60 * 60 * 1000
      let time = timeFilter(new Date(this.timeAgo), 'yyyy-MM-dd')
      this.formInline.datetime = time
      console.log(this.formInline.datetime)
    },
    // 列表显示
    _GetDayectremum (search) {
      this.loading = true
      GetDayectremum(search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.dataSourceList = res.result.result
        }
      })
    }
  },
  created () {
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
    this._GetDayectremum()
  }
}
</script>

<style lang="less" scoped>

</style>


