//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')

App({
  globalData: {
    userInfo: null,
    translated: true
  },
  findvalue:function(op) {
    qcloud.request({//找到所有收藏项目
      url: `${config.service.host}/weapp/findcollect`,
      data: {
        keyword: op.globalData.userInfo.openId,
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
            var time=new Date()
            var tempdata = res.data.data
            var message = []
            for (var i = 0; i < tempdata.length; i++) {
              tempdata[i].eventStart = tempdata[i].eventStart.slice(0, 10)
              var start_date = new Date(tempdata[i].eventStart.replace(/-/g, "/"))
              var days = start_date.getTime() - time.getTime()
              var day = parseInt(days / (1000 * 60 * 60 * 24))
              if (day == 30 || day == 10 || day == 3 || day == 1) {
                message.push(tempdata[i])
              }
            }
            if (message.length > 0) {
              wx.setTabBarBadge({
                index: 1,
                text: message.length.toString()
              })
            }
          },
          fail(error) {
            console.log('request fail', error);
          }
        })
      },
      fail(error) {
        console.log('request fail', error);
      }
    })
  },
  onLaunch: function() {//登录先获取用户openid放到全局数据里面
    var that = this
    qcloud.setLoginUrl(config.service.loginUrl)
    qcloud.login({
      success(result) {
        if (result) {
          that.globalData.userInfo = result
          that.findvalue(that)
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              that.globalData.userInfo = result.data.data
              that.findvalue(that)
            },
            fail(error) {
              console.log('request fail', error)
            }
          })
        }
      },
    })
  },
})