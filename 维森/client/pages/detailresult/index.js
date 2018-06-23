// pages/detailresult/index.js
var base64 = require('../../utils/base64.js')
var plugin = requirePlugin("WechatSI")
var globalData = getApp().globalData
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    resultValue: [],
    transDescription: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var transdescription
    let modeEncode = options.resultValue
    let modeDecode = decodeURIComponent(modeEncode)
    let mode = JSON.parse(base64.decode(modeDecode))
    qcloud.request({
      url: `${config.service.host}/weapp/collect`,
      data: {
        keyword1: globalData.userInfo.openId,
        keyword2: mode.ID
      },
      success(result) {
        if (result.data.data == true){
          that.setData({
            collected:true
          })
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
    if (globalData.translated) {
      plugin.translate({
        lfrom: "en_US",
        lto: "zh_CN",
        content: mode.eventDescription,
        success: function(res) {
          if (res.retcode == 0) {
            transdescription = res.result
            that.setData({
              resultValue: mode,
              transDescription: transdescription
            })

          } else {
            console.warn("翻译失败", res)
          }
        },
        fail: function(res) {
          console.log("网络失败", res)
        }
      })
    } else {
      that.setData({
        resultValue: mode,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

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

  },
  collect:function(){
    qcloud.request({
      url: `${config.service.host}/weapp/collect`,
      data: {
        keyword1: globalData.userInfo.openId,
        keyword2: this.data.resultValue.ID
      },
      success(result) {
        util.showSuccess('请求成功完成')
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
    this.setData({
      collected:true
    })
  },
  uncollect:function(){
    qcloud.request({
      url: `${config.service.host}/weapp/delcollect`,
      data: {
        keyword1: globalData.userInfo.openId,
        keyword2: this.data.resultValue.ID
      },
      success(result) {
        console.log(result)
        util.showSuccess('请求成功完成')
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
    this.setData({
      collected: false
    })
  }
})