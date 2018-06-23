//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')

App({
  globalData: {
    userInfo: null,
    translated: true
  },
  onLaunch: function() {
    var that = this
    qcloud.setLoginUrl(config.service.loginUrl)
    qcloud.login({
      success(result) {
        if (result) {
          that.globalData.userInfo = result

        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              that.globalData.userInfo = result.data.data
            },
            fail(error) {
              console.log('request fail', error)
            }
          })
        }
      },
    })
  },
})