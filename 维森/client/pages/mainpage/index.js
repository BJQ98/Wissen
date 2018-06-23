//index.js
//获取应用实例
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },
  //事件处理函数
  toSearch: function () {
    wx.navigateTo({
      url: '../../pages/search/index'
    })
  },
 
  onLoad: function () {
    
  },
});
