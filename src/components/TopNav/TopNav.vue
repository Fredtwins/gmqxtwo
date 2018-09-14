<template>
  <!--头部导航条  -->
  <row>
    <i-col span="24">
        <!--头部导航栏  -->
      <div class="topNav clear">
        <div class="logo"><img src="../../../static/image/top/logo_01.png" style="height: 50px" alt=""></div>
        <div class="funcBtn">
          <Menu mode="horizontal" :theme="theme1" :active-name="pathName" @on-select="clickFn">
            <template v-for="v in navItem">
              <Submenu v-if="v.child" :name="v.link">
                <template slot="title">
                    <Icon :type="v.icon" class="iconsize"></Icon>
                    {{v.name}}
                </template>
                <Menu-item v-for="i in v.child" :name="i.link" :key="i.index">{{i.name}}</Menu-item>
              </Submenu>
              <Menu-item v-else :name="v.link">
                 <Icon :type="v.icon" class="iconsize"></Icon>
                {{v.name}}
              </Menu-item>
            </template>
          </Menu>
        </div>
        <div class="head-time">
          <div class="head-timIng">{{timIng.time}}</div>
          <div class="head-hr"></div>
          <div class="head-datIng">
            <div class="head-date">{{timIng.date}}</div>
            <div class="head-day">{{timIng.day}}</div>
          </div>
        </div>
      </div>
    </i-col>
  </row>
</template>

<script>
import { timeFilter, filterTimeDay, getUserIng } from 'common/js/util'
import { ERR_OK } from 'api/config'
import { GetTopNav } from 'api/home'
export default {
  data () {
    return {
      theme1: 'dark',
      navItem: [],
      timIng: {
        time: '',
        date: '',
        day: ''
      }
    }
  },
  methods: {
    // 点击哪个导航条就跳转到哪里
    clickFn (name) {
      this.$router.push('/main/' + name)
    },
    // 初始化时间
    initTime () {
      this.timIngInter = setInterval(() => {
        let time = new Date()
        this.timIng['time'] = timeFilter(time, 'HH:mm:ss')
        this.timIng['date'] = timeFilter(time, 'yyyy/MM/dd')
        this.timIng['day'] = filterTimeDay(time)
      }, 1000)
    },
    // 获取头部导航条
    topnav () {
      let roleids = ''
      var str = getUserIng().roles
      for (var i = 0; i < getUserIng().roles.length; i++) {
        for (var m = 0; m < str.length; m++) {
          roleids = roleids + str[m].roleid + ','
        }
      }
      roleids = roleids.substring(0, roleids.length - 1)
      roleids = roleids.concat('|#|in')
      let searchValue = {
        roleid: roleids
      }
      GetTopNav(searchValue).then(res => {
        if (res.code === ERR_OK) {
          this.navItem = res.result.result
        }
      })
    }
  },
  computed: {
    pathName () {
      var path = this.$route.fullPath.replace('/main/', '')
      for (var i in this.navItem) {
        if (path.indexOf(this.navItem[i].link) !== -1) {
          return this.navItem[i].link
        }
      }
    }
  },
  created () {
    this.initTime()
  },
  mounted () {
    this.topnav()
  },
}
</script>

<style lang="less" scoped>
@import url("../../../static/less/color.less");
.topNav {
  background: url('../../../static/image/top/top_02.png');
  background-size: cover;
  background: linear-gradient(#1554cd,#1137a0);
    .logo {
      float: left;
      height: 63px;
      color: #fff;
      vertical-align: middle;
      img {
        width: 100%;
        margin-top: 6px;
        vertical-align: middle;
      }
    }
    .funcBtn {
      float: right;
      z-index: 3;
      .ivu-menu {
        background: none;
        .ivu-menu-item {
          // padding: 0 5px;
          flex: 1;
          font-size: 14px;
          font-weight: bold;
          color: #fff;
          border-right: 1px solid #16a0eb;
          padding-left: 0px;
          // background-image: url('../../../static/image/top/button.png');
          // background: linear-gradient(#1554cd,#1137a0);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          // padding: 0 32px;
          text-align: center;
          // margin: 0 5px;
          position: relative;
          // opacity: 0.5;
          cursor: pointer;
          &.ivu-menu-item-active,
          &.ivu-menu-item-selected {
            color: @yellow;
            border-bottom: 3px solid @yellow;
          }
          &:hover {
            color: @yellow;
          }
        }
        .ivu-menu-submenu {
          padding: 0 5px;
          .ivu-select-dropdown {
            .ivu-menu-item {
              padding: 8px 4px;
            }
          }
        }
      }
    }
    .head-time {
      width: 210px;
      height: 40px;
      color: white;
      display: flex;
      align-items: center;
      position: absolute;
      left: 18rem;
      top: 0.8rem;
      z-index: 9999;
      .head-timIng {
        flex: 1;
        text-align: center;
        font-size: 28px;
        padding-right: 10px;
      }
      .head-hr {
        width: 1px;
        height: 30px;
        background-color: lightgray;
      }
      .head-datIng {
        flex: 1;
        font-size: 14px;
        padding-left: 10px;
        >div {
          text-align: justify;
          text-align-last: justify;
        }
      }
    }

    /* 定义blink类*/
    .blink {
        animation: blink 3s linear infinite;
        /* 其它浏览器兼容性前缀 */
        -webkit-animation: blink 3s linear infinite;
        -moz-animation: blink 3s linear infinite;
        -ms-animation: blink 3s linear infinite;
        -o-animation: blink 3s linear infinite;
    }

    /* 定义keyframe动画，命名为blink */
    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        50.01% {
            opacity: 0;
        }
        /* 注意这里定义50.01%立刻透明度为０，可以设置闪烁效果 */
        100% {
            opacity: 0;
        }
    }

    /* 添加兼容性前缀 */
    @-webkit-keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        50.01% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    @-moz-keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        50.01% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    @-ms-keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        50.01% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    @-o-keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        50.01% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }
}

.iconsize {
    width: 20px;
    height: 20px;
    font-size: 28px;
    padding-bottom: 28px;
}
</style>


