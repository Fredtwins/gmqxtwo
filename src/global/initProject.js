// 全局js
import Vue from 'vue'
import axios from 'axios'
import iView from 'iview'

iView.LoadingBar.config({
  height: 3,
  // color: '#47cb89'
  color: '#ff7f27'
})

Object.assign(Vue.prototype, {
  static: 'static/',
  ajaxGet (obj) {
    axios({
      method: 'get',
      url: this.static + 'json/' + obj.url
    }).then(obj.success)
  },
  ajaxPost (obj, num) {
    var that = this
    this.$Loading.start()

    axios({
      method: 'post',
      url: parameters.domain + obj.url,
      data: obj.data,
      headers: {
        token: obj.token
      }
    }).then(function (res) {
      // console.log(res.data.code)
      switch (res.data.code) {
        case '0003':
          that.$Notice.warning({
            title: res.data.message
          })
          break
        case '0004':
          that.$Notice.warning({
            title: res.data.message
          })
          that.$router.push('/login')
          break
        case '0005':
          that.$Notice.warning({
            title: res.data.message
          })
          that.$router.push('/login')
          break
        default:

          obj.success(res)
          break
      }
    }
    ).catch(function (res) {
      /* that.$Notice.error({
                title: '操作失败！'
            }) */
    })
  },
  /* 设置本地存储数据 */
  setKey: function (key, val) {
    if (this.getKey(key)) {
      window.localStorage.removeItem(key)
    }
    window.localStorage.setItem(key, val)
  },
  /* 删除本地存储数据 */
  removeKey: function (key) {
    window.localStorage.removeItem(key)
  },
  /* 取本地存储数据 */
  getKey: function (key) {
    if (window.localStorage) {
      return window.localStorage.getItem(key)
    }
  },
  // 获取表格的宽度 高度
  getTableSize: function (parent, siblings, tableSize) {
  /*
  * parent:    上一级元素 如 '.water-electric-card'
  * siblings:  同级元素 如 ['.ivu-card-head', '.btnArea']
  * tableSize: 存放表格宽高的字段 如 'rainTableSize'
  * rainTableSize: {
  *	width: 100,
  *	height: 100
  * }
  */
    var that = this
    // 解决innerWidth()计算不准确
    setTimeout(function () {
      that[tableSize].height = $(parent).innerHeight()
      for (var i in siblings) {
        that[tableSize].height -= $(parent).find(siblings[i]).outerHeight()
      }
      that[tableSize].width = $(parent).innerWidth()
    }, 50)
  },
  isInArray: function (arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i].link) {
        return true
      }
    }
    return false
  },
  monthArray: ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  xunArray: ['', '上旬', '中旬', '下旬']
})

Object.assign(Date.prototype, {
  format (format) {
    var o = {
      'M+': this.getMonth() + 1, // month
      'd+': this.getDate(), // day
      'h+': this.getHours(), // hour
      'm+': this.getMinutes(), // minute
      's+': this.getSeconds(), // second
      'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
      'S': this.getMilliseconds() // millisecond
    }

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  }
})

/* Vue.prototype.$ajax = (obj) => {
	let url = 'static/json/';
	axios.get(url + obj.url).then(obj.callback);
}

Vue.prototype.$httpPost = function (url, option, okCallback) {

  return Vue.prototype.$http.post(url, option)
    .then((response) => {
      if (okCallback) {
        okCallback(response.data);
      }
    })
    .catch(function (error) {
      Vue.prototype.$Message.error(error);
    })
};
Vue.prototype.$AddDays = function (days, hour, minute, second) {
  var timeAdd = new Date();
  timeAdd.setDate(timeAdd.getDate() + days);
  timeAdd.setHours(hour == undefined ? timeAdd.getHours() : hour);
  timeAdd.setMinutes(minute == undefined ? timeAdd.getMinutes() : minute);
  timeAdd.setSeconds(second == undefined ? 0 : second);
  return timeAdd;
}; */

/* 地图部分全局方法开始 */
// 创建feature Layer
Vue.prototype.$createFeaturesLayer = function (name, features) {
  return new ol.layer.Vector({
    source: new ol.source.Vector({
      features: features
    }
    ),
    name: name,
    style: function (feature) {
      return feature.get('style')
    }
  })
}

/* 地图部分全局方法结束 */
