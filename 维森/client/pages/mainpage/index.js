//index.js
//获取应用实例
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
	data: {
    userInfo: {},
    logged: '?',
    takeSession: false,
    requestResult: ''
	},
	//事件处理函数
  login: function () {
    var that = this
    qcloud.login({
      success(result) {
        if (result) {
          that.setData({
            userInfo: result,
            logged: true
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
            },
            fail(error) {
              that.setData({
                logged:false
              })
            }
          })
        }
      },

      fail(error) {
        that.setData({
          logged: false
        })
      }
    })
  },
	toSearch: function () {
		wx.navigateTo({
			url: '../../pages/search/index'
		})
	},
	onLoad: function () {
    this.login()
	},
});
