var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var globalData = getApp().globalData
var base64 = require('../../utils/base64.js')



Page({
	data: {
		backgroundcolor: ['white', 'white', 'white','white'],
		userInfo: {},
    logged: false,
    requestResult:'',
    isread:true,
    messagelist:[]
	},

	changeBackground: function (e) {//点击时改变颜色
		let that = this;
		let ids = e.currentTarget.id;
		let changecolor = "backgroundcolor[" + ids + "]"
		that.setData({
			[changecolor]: 'lightgray',
		})
	},
	toMyproject: function () {
		wx.navigateTo({
			url: '../../pages/myproject/index',
		})
	},
  toAboutUs: function () {
    wx.navigateTo({
      url: '../../pages/aboutus/index',
    })
  },
  toMymessage: function () {
    wx.removeTabBarBadge({
      index:1
    })
    this.setData({
      isread:true
    })
    let that = this;
    var result = JSON.stringify(that.data.messagelist)
    let mode64 = base64.encode(result)
    let modeEncode = encodeURIComponent(mode64)
    wx.navigateTo({
      url: '../mymessage/index?resultValue=' + modeEncode
    })
  },
	toMysubscribe: function () {
		let that = this;
		wx.navigateTo({
			url: '../../pages/mysubcribe/index',
		})
	},


  login: function () {//腾讯云登录函数，我也不大懂，下面的注释不是我写的
    if (this.data.logged) return
    var that = this
    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功');
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
              util.showModel('请求3失败', error)
              console.log('request fail', error)
            }
          })
        }
      },
    })
  },
  bindGetUserInfo: function (e) {//同上
    if (this.data.logged) return;

    util.showBusy('正在登录');

    var that = this;
    var userInfo = e.detail.userInfo;

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {

          // 检查登录是否过期
          wx.checkSession({
            success: function () {
              // 登录态未过期
              util.showSuccess('登录成功');
              that.setData({
                userInfo: userInfo,
                logged: true
              })
            },

            fail: function () {
              qcloud.clearSession();
              // 登录态已过期，需重新登录
              var options = {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                userInfo: userInfo
              }
              that.doLogin(options);
            },
          });
        } else {
          util.showModel('用户未授权', e.detail.errMsg);
        }
      }
    });
  },

  doLogin: function (options) {
    var that = this;
    wx.login({
      success: function (loginResult) {
        var loginParams = {
          code: loginResult.code,
          encryptedData: options.encryptedData,
          iv: options.iv,
        }
        qcloud.requestLogin({
          loginParams, success() {
            util.showSuccess('登录成功');

            that.setData({
              userInfo: options.userInfo,
              logged: true
            })
          },
          fail(error) {
            util.showModel('登4录失败', error)
            console.log('登录失败', error)
          }
        });
      },
      fail: function (loginError) {
        util.showModel('登录5失败', loginError)
        console.log('登录失败', loginError)
      },
    });
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
			backgroundcolor: ['white', 'white', 'white', 'white'],
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
  changeword:function(){//每次点击生成随机数，并请求后端
    var that = this
    var num = Math.random()
    num = Math.ceil(num * 112)
    if (!this.data.logged){
      return
    }
    qcloud.request({
      url: `${config.service.host}/weapp/word`,
      data: {
        id: num
      },
      success(result) {
        that.setData({
          requestResult: result.data.data[0]
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  onLoad: function (options) {//打开页面也一样
    var time = new Date();
    var that=this
    var num = Math.random()
    num = Math.ceil(num * 112)
    this.login();
    qcloud.request({
      url: `${config.service.host}/weapp/word`,
      data: {
        id: num
      },
      success(result) {
        that.setData({
          requestResult: result.data.data[0]
        })
      },
      fail(error) {
        console.log('request fail', error);
      }
    })
    qcloud.request({//找到所有收藏项目
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
            var message=[]
            for (var i = 0; i < tempdata.length; i++) {
              tempdata[i].eventStart = tempdata[i].eventStart.slice(0, 10)
              var start_date = new Date(tempdata[i].eventStart.replace(/-/g, "/"))
              var days = start_date.getTime() - time.getTime()
              var day = parseInt(days / (1000 * 60 * 60 * 24))
              if(day==30||day==10||day==3||day==1){
                message.push(tempdata[i])
              }
            }
            if(message.length>0){
              that.setData({
                messagelist:message,
                isread:false
              })
              wx.setTabBarBadge({
                index: 1,
                text:message.length.toString()
              })
            }
          },
          fail(error) {
            console.log('request fail', error);
          }
        })
        util.showSuccess('请求成功完成')
      },
      fail(error) {
        console.log('request fail', error);
      }
    })
  },
})