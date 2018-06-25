// pages/mysubcribe/index.js
var WxSearch = require('../../wxSearchView/wxSearchView.js');
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var base64 = require('../../utils/base64.js')
var globalData = getApp().globalData

function randomWord() {
  var str = '',
    arr = ['an', 'li', 'ba', 'qu', 'mar', 'ta', 'bu', 'am', 'pu', 'te', 'na', 'ga', 'll', 'la', 'ni']
  // 随机产生
  var pos = Math.round(Math.random() * (arr.length - 1));
  str += arr[pos];
  console.log(str)
  return str;
}

function randomnum() {
  var num = Math.random()
  num = Math.ceil(num * 3293)
  return num
}

function randomlist() {
  var arr = []
  for (var i = 0; i < 10;) {
    var num = randomnum()
    if (arr.indexOf(num) == -1) {
      i++
      arr.push(num)
    }
  }
  return arr
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    requestResult: [],
    translated: true,
  },
  returnsearch: function() {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/findconfer`,
      data: {
        keyword: randomlist()
      },
      success(result) {
        var tempdata = result.data.data
        tempdata.sort(function (a, b) {
          return a.eventStart < b.eventStart ? 1 : -1;
        })
        for (var i = 0; i < tempdata.length; i++) {
          tempdata[i].eventStart = tempdata[i].eventStart.slice(0, 10)
          tempdata[i].eventEnd = tempdata[i].eventEnd.slice(0, 10)
        }
        that.setData({
          requestResult: tempdata
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  todetail: function(e) {
    var that = this
    var res = e.currentTarget.dataset.detail
    res.translated = that.data.translated
    var result = JSON.stringify(res)
    let mode64 = base64.encode(result)
    let modeEncode = encodeURIComponent(mode64)
    wx.navigateTo({
      url: '../detailresult/index?resultValue=' + modeEncode
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/findconfer`,
      data: {
        keyword: randomlist()
      },
      success(result) {
        util.showSuccess('刷新成功！')
        var tempdata = result.data.data
        /*
        tempdata.sort(function (a, b) {
          return a.eventStart < b.eventStart ? 1 : -1;
        })*/
        for (var i = 0; i < tempdata.length; i++) {
          tempdata[i].eventStart = tempdata[i].eventStart.slice(0, 10)
          tempdata[i].eventEnd = tempdata[i].eventEnd.slice(0, 10)
        }
        that.setData({
          requestResult: tempdata
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})