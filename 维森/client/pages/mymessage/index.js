//logs.js
var util = require('../../utils/util.js')
var base64 = require('../../utils/base64.js')
var plugin = requirePlugin("WechatSI")
var globalData = getApp().globalData
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


Page({
  data: {
    message:[]
  },
  todetail: function (e) {
    var that = this
    var res = e.currentTarget.dataset.detail
    res.translated = globalData.translated
    var result = JSON.stringify(res)
    let mode64 = base64.encode(result)
    let modeEncode = encodeURIComponent(mode64)
    wx.navigateTo({
      url: '../detailresult/index?resultValue=' + modeEncode
    })
  },
  onLoad: function (options) {
    var time = new Date()
    let modeEncode = options.resultValue
    let modeDecode = decodeURIComponent(modeEncode)
    let mode = JSON.parse(base64.decode(modeDecode))
    var tempdata = mode
    console.log(mode)
    for (var i = 0; i < tempdata.length; i++) {
      tempdata[i].eventStart = tempdata[i].eventStart.slice(0, 10)
      tempdata[i].eventEnd = tempdata[i].eventEnd.slice(0, 10)
      var start_date = new Date(tempdata[i].eventStart.replace(/-/g, "/"))
      var days = start_date.getTime() - time.getTime()
      var day = parseInt(days / (1000 * 60 * 60 * 24))
      tempdata[i].day = day
    }
    tempdata.sort(function (a, b) {
      return a.day > b.day ? 1 : -1;
    })
    this.setData({
      message:tempdata
    })
  },
 
})
