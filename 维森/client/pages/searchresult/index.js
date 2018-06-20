// pages/searchresult/index.js
var WxSearch = require('../../wxSearchView/wxSearchView.js');
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var base64 = require('../../utils/base64.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',
    requestResult: []
  },
  returnsearch:function(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchValue: options.searchValue
    });
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/demo`,
      data: {
        keyword: options.searchValue
      },
      success(result) {
        util.showSuccess('请求成功完成')
        that.setData({
          requestResult: result.data.data
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  todetail:function(e){
    var result = JSON.stringify(e.currentTarget.dataset.detail)
    let mode64 = base64.encode(result)
    let modeEncode = encodeURIComponent(mode64)
    wx.navigateTo({
      url: '../detailresult/index?resultValue=' + modeEncode
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})