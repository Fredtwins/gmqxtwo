<template>
  <i-col span="3">
    <div class="dataexchange-nav">
      <Menu active-name="multiple" width="auto" @on-select="clickFn" v-if="biao.length">
        <celan v-for="(item,index) in biao" :item="item" :index="index" @emitClick="clickFn" :key="item.index"></celan>
      </Menu>
    </div>
  </i-col>
</template>

<script>
import Celan from './celan'
import { Getstatandquery } from 'api/celan'
import { ERR_OK } from 'api/config'
import { setAction, getAction, getUserIng } from 'common/js/util'
import { getSessionStorage } from 'common/js/dom'
export default {
  components: {
    'celan': Celan
  },
  data () {
    return {
      biao: []
    }
  },
  methods: {
    clickFn (name) {
      this.$router.push('/main/statandquery/' + name)
      // var obj = getAction()
      // obj.third = name
      // getSessionStorage('name', 'top')
      // setAction(obj)
    },
    // 显示侧边栏
    _Getstatandquery() {
      let roleids = ''
      var str = getUserIng().roles
      for (var i = 0; i < getUserIng().roles.length; i++) {
        for (var m = 0; m < str.length; m++) {
          roleids = roleids + str[m].roleid + ','
        }
      }
      roleids = roleids.substring(0, roleids.length - 1)
      roleids = roleids.concat('|#|in')
      let search = {
        roleid: roleids
      }
      Getstatandquery(search).then(res => {
        if (res.code === ERR_OK) {
          this.biao = res.result.result[0].children
        }
      })
    }
  },
  created () {
    // console.log(getAction())
    // if (!getAction().third) {
    //   this.acName = '1'
    // } else {
    //   this.acName = getAction().third
    // }
  },
  mounted() {
    this._Getstatandquery()
  }
}
</script>

<style lang="less" scoped>
.dataexchange-nav {
  height: 100%;
}
</style>
