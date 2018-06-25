// pages/mysubmit/index.js
var util = require('../../utils/util.js')



Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteMaxLen: 160,
    text: ''
  },
  formSubmit: function(e) {
    if (e.detail.value.input) {
      wx.redirectTo({
        url: '../submitresult/index?resultValue=' + e.detail.value.input
      })
    }
    else{
      util.showModel('提交失败', '请输入您的反馈')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  bindWordLimit: function(e) {
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > this.data.noteMaxLen) return;
    this.setData({
      currentNoteLen: len //当前字数  
    });
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

  }
})