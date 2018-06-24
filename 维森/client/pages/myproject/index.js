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
	onLoad: function (options) {//打开页面先获取用户收藏的数据
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/findcollect`,
      data: {
        keyword: globalData.userInfo.openId,
      },
      success(result) {
        var arr1 = result.data.data//所有的会议json数组
        var requestarr = []
        for (var i = 0; i < arr1.length; i++) {
          requestarr.push(arr1[i].conferID);
        }//解析成会议ID数组，方便查询语句
        qcloud.request({//请求中的请求，找到所有ID所对应的会议的详细信息
          url: `${config.service.host}/weapp/findconfer`,
          data: {
            keyword: requestarr
          },
          success(res) {
            var tempdata = res.data.data
            for (var i = 0; i < tempdata.length; i++) {
              tempdata[i].eventStart = tempdata[i].eventStart.slice(0, 10)
              tempdata[i].eventEnd = tempdata[i].eventEnd.slice(0, 10)
            }
            that.setData({
              requestResult:tempdata
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
    let modeEncode = encodeURIComponent(mode64)//以上为页面间传递json防止特殊字符影响操作
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
	onShow: function () {//每次显示页面时刷新收藏的数据，因为通过该页面点进去找到详细信息后，取消收藏返回该页面时做出反应
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
            var tempdata = res.data.data
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
    wx.stopPullDownRefresh()
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
  uncollect: function (e) {//直接在该页面取消收藏，e为按钮上绑定的事件，可以获取该一条会议的数据，主要获取ID来进行删除
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
                var tempdata = res.data.data
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