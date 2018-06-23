// pages/myproject/index.js
var base64 = require('../../utils/base64.js')
var globalData = getApp().globalData
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
    requestResult: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/findcollect`,
      data: {
        keyword: globalData.userInfo.openId,
      },
      success(result) {
        var arr1 = result.data.data
        var requestarr = []
        for (var i = 0; i < arr1.length; i++) {
          requestarr.push(arr1[i].conferID);
        }
        qcloud.request({
          url: `${config.service.host}/weapp/findconfer`,
          data: {
            keyword: requestarr
          },
          success(res) {
            that.setData({
              requestResult: res.data.data
            })
          },
          fail(error) {
            util.showModel('请求失败', error);
            console.log('request fail', error);
          }
        })
        util.showSuccess('请求成功完成')
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
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
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/findcollect`,
      data: {
        keyword: globalData.userInfo.openId,
      },
      success(result) {
        var arr1 = result.data.data
        var requestarr = []
        for (var i = 0; i < arr1.length; i++) {
          requestarr.push(arr1[i].conferID);
        }
        qcloud.request({
          url: `${config.service.host}/weapp/findconfer`,
          data: {
            keyword: requestarr
          },
          success(res) {
            that.setData({
              requestResult: res.data.data
            })
          },
          fail(error) {
            util.showModel('请求失败', error);
            console.log('request fail', error);
          }
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
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

	},
  uncollect: function (e) {
    var that=this
    console.log(e.currentTarget.dataset.detail)
    var id = e.currentTarget.dataset.detail.ID
    qcloud.request({
      url: `${config.service.host}/weapp/delcollect`,
      data: {
        keyword1: globalData.userInfo.openId,
        keyword2: id
      },
      success(result) {
        util.showSuccess('请求成功完成')
        qcloud.request({
          url: `${config.service.host}/weapp/findcollect`,
          data: {
            keyword: globalData.userInfo.openId,
          },
          success(result) {
            var arr1 = result.data.data
            var requestarr = []
            for (var i = 0; i < arr1.length; i++) {
              requestarr.push(arr1[i].conferID);
            }
            qcloud.request({
              url: `${config.service.host}/weapp/findconfer`,
              data: {
                keyword: requestarr
              },
              success(res) {
                that.setData({
                  requestResult: res.data.data
                })
              },
              fail(error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
              }
            })
          },
          fail(error) {
            util.showModel('请求失败', error);
            console.log('request fail', error);
          }
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  }
});