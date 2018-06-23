// pages/search/index.js
var WxSearch = require('../../wxSearchView/wxSearchView.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		WxSearch.init(
			that,  // 本页面一个引用
			['Transport', 'Military'], // 热点搜索推荐，[]表示不使用
			[],// 搜索匹配，[]表示不使用
			that.mySearchFunction, // 提供一个搜索回调函数
			that.myGobackFunction //提供一个返回回调函数
		);
	},
	wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
	wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
	wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
	wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
	wxSearchClear: WxSearch.wxSearchClear,  // 清空函数
	mySearchFunction: function (value) {
		// do your job here
		// 示例：跳转
    wx.navigateTo({
			url: '../searchresult/index?searchValue=' + value
		})
	},
	myGobackFunction: function () {
		// do your job here
		// 示例：返回
		wx.redirectTo({
			url: '../index/index?searchValue=返回'
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
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
})