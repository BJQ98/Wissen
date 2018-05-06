const app = getApp()

Page({
	data: {
		backgroundcolor: ['white', 'white'],
		userInfo: {}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	changeBackground: function (e) {
		var that = this;
		var ids = e.currentTarget.id;
		var changecolor = "backgroundcolor[" + ids + "]"
		that.setData({
			[changecolor]: 'lightgray',
		})
	},
	toMyproject: function () {
		var that = this;
		that.setData({
			'backgroundcolor[0]': 'white',
		})
		wx.navigateTo({
			url: '../../pages/myproject/index',
		})
	},
	toMysubscribe: function () {
		var that = this;
		that.setData({
			'backgroundcolor[1]': 'white',
		})
		wx.navigateTo({
			url: '../../pages/mysubcribe/index',
		})
	},

	onLoad: function (options) {
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
			})
		}
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