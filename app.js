// app.js
App({
  onLaunch() {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)

    let clientID = 'a3fb2113c0a97830d15b'  // 应用名称: TeamSlash的第一个小程序
    wx.BaaS.init(clientID)

    const self = this
    wx.BaaS.auth.loginWithWechat().then(res=> {
      console.log("baas login", res)
      wx.BaaS.auth.getCurrentUser().then(
        (res)=>{
          wx.setStorageSync('userInfo', res)
          self.globalData.userInfo = res
        },
        (err)=>{
          console.log('err', err)
        }
      )
    })
  },
  globalData: {
    userInfo: wx.getStorageSync('userInfo'),
    globalSkillID: 11,
    globalRequestID: null
  }
})
