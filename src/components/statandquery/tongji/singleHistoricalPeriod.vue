<template>
  <i-col span="21">
    <div class="heightMax">
      <div class="station">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">统计分析</Breadcrumb-item>
          <Breadcrumb-item class="blue">单站同期历史对比图</Breadcrumb-item>
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
                <Date-picker type="datetime" v-model="formInline.datetime1" @on-change="datetimeChange1"></Date-picker>&nbsp;至&nbsp;
                <Date-picker type="datetime" v-model="formInline.datetime2" @on-change="datetimeChange2"></Date-picker>
              </Form-item>
              <Form-item label="历史时间">
                <Date-picker type="datetime" v-model="formInline.datetime3" @on-change="datetimeChange3"></Date-picker>&nbsp;至&nbsp;
                <Date-picker type="datetime" v-model="formInline.datetime4" @on-change="datetimeChange4"></Date-picker>
              </Form-item>
              <Form-item label="选择元素">
                <Select v-model="formInline.element" clearable style="width:100px">
                  <Option v-for="item in elementList" :value="item.name" :key="item.index"></Option>
                </Select>
              </Form-item>
              <Button type="primary" @click="submitSearch(1)">搜索</Button>
              <Button type="success" @click="submitSearchList">单站搜索</Button>
            </Form>
            </template>
          </Panel>
        </Collapse>
        <div class="center">
          <Table :loading="loading" :data="dataSourceList" :columns="theadArr" border></Table>
        </div>
        <!-- <div class="pullright page">
          <Page :total="total" :current="current" @on-change="changePage"></Page>
        </div> -->
      </div>
    </div>
  </i-col>
</template>

<script>
import { GettownList } from 'api/stationlist'
import { GetHistorcal, GetHisEcharts } from 'api/statistics'
import { ERR_OK } from 'api/config'
import { HistorcalThead } from 'common/js/table'
export default {
  data () {
    return {
      loading: false,
      dataSourceList: [],
      theadArr: HistorcalThead(this),
      stationList: [],
      formInline: {
        id: '',
        datetime1: '',
        datetime2: '',
        datetime3: '',
        datetime4: '',
        element: ''
      },
      elementList: [
        {
          name: '雨量',
          id: 'r8'
        }
      ]
    }
  },
  methods: {
    // 列表
    _GetHistorcal (search) {
      this.loading = true
      GetHistorcal(search).then(res => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.dataSourceList = res.result.result
        }
      })
    },
    // 部门列表下拉框
    _GettownList () {
      GettownList().then(res => {
        if (res.code === ERR_OK) {
          this.stationList = res.result.result
        }
      })
    },
    // 点击搜索
    submitSearch () {
      let search = {}
      if (this.formInline.id) {
        search.stationid = this.formInline.id
      }
      if (this.formInline.datetime1 || this.formInline.datetime2) {
        search.datetime = this.formInline.datetime1 + '|#|' + this.formInline.datetime2
      }
      this._GetHistorcal(search)
    },
    // 选择时间
    datetimeChange1 (datetime) {
      this.formInline.datetime1 = datetime
    },
    datetimeChange2 (datetime) {
      this.formInline.datetime2 = datetime
    },
    datetimeChange3 (datetime) {
      this.formInline.datetime3 = datetime
    },
    datetimeChange4 (datetime) {
      this.formInline.datetime4 = datetime
    },
    // 单站搜索
    submitSearchList () {

    }
  },
  mounted() {
    this._GettownList()
    this._GetHistorcal()
  }
}
</script>

<style lang="less" scoped>

</style>
