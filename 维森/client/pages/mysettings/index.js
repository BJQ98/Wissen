var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
	data: {
		backgroundcolor: ['white', 'white'],
		userInfo: {},
    logged: false
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	changeBackground: function (e) {
		let that = this;
		let ids = e.currentTarget.id;
		let changecolor = "backgroundcolor[" + ids + "]"
		that.setData({
			[changecolor]: 'lightgray',
		})
	},
	toMyproject: function () {
		let that = this;
		wx.navigateTo({
			url: '../../pages/myproject/index',
		})
	},
	toMysubscribe: function () {
		let that = this;
		wx.navigateTo({
			url: '../../pages/mysubcribe/index',
		})
	},

	onLoad: function (options) {
		this.login()
	},
  login: function () {
    if (this.data.logged) return

    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
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
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
            },

            fail(error) {
              util.showModel('请求失败，试试授权后重新登陆吧！', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('请求失败，试试授权后重新登陆吧！', error)
      }
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
		this.setData({
			backgroundcolor: ['white', 'white'],
		})
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