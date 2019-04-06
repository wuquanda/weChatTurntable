//app.js
App({

  globalData:{
    wheelArray: [
      {
        optionName: "决定一下今天的心情？",
        awards: [
          {
            name: "开心",  // 选项名
            color: 'red', // 选项的背景颜色
          },
          {
            name: "不开心", 
            color: 'blue',
          },
          {
            name:"无所谓",
            color:'green',
          }
        ],
      },
      {
        optionName:"今天干什么？",
        awards:[
          {
            name:"睡觉",
            color:'red',
          },
          {
            name:"看书",
            color:'yellow'
          },
          {
            name:"发呆",
            color:'blue'
          }
        ]
      }
    ]
  },
  onLaunch: function () {
    wx.getStorage({
      key: 'wheelArray',
      success: function(res) {
        this.setData({
          wheelArray:res.data
        })
        console.log("正在获取缓存")
      },
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
})