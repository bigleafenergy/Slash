// pages/signup/signup.js
Page({

  data: {
    showForm: false,
    currentUser: null,
    nickname: null,
    bio: null,
    contact: null,
    labels: [{name: "Photography", selected: false}, {name: "Music", selected: false}, {name: "Languages", selected: false}, {name: "Design", selected: false}, {name: "Coding", selected: false}, {name: "Writing", selected: false}, {name: "Fitness", selected: false}, {name: "Arts & Crafts", selected: false}, {name: "Coffee", selected: false}, {name: "Outdoors", selected: false}, {name: "Other", selected: false}],
    selectedLabel: ''
  },

  onLoad: function (options) {
    if(options.showform === "true"){
      this.setData({
        showForm: true
      })
    }else{
      wx.getStorage({
        key: 'userInfo',
        success: res=>{
          if(res.data.nickname){
            this.setData({
              userInfo: res.data,
              hasUserInfo: true
            })
          }else{
            this.setData({
              hasUserInfo: false,
            })
          }
        }
      })
    }
  },

  toIndex(){
    wx.switchTab({
      url: '/pages/community/community',
    })
  },

  bindNameInput: function(e){
    console.log("Name", e)
    this.setData({
      nickname: e.detail.value
    })
  },

  chooseLabel(e){
    let index = e.currentTarget.dataset.index
    this.data.labels[index].selected = true
    this.setData({
      labels: this.data.labels
    }, ()=>{
      this.setSelectedLabels()
    })
    
  },

  resetLabel(e){
    let index = e.currentTarget.dataset.index
    this.data.labels[index].selected = false
    this.setData({
      labels: this.data.labels
    }, ()=>{
      this.setSelectedLabels()
    })
  },

  setSelectedLabels(){
    let selectedLabels = []
    this.data.labels.forEach((label)=>{
      if (label.selected){
        selectedLabels.push(label.name)
      }
    })
    this.setData({
      selectedLabels: selectedLabels
    })
  },

  bindLabelInput: function(e){
    console.log("Label", e)
    this.setData({
      label: e.detail.value
    })
  },

  bindBioInput: function(e){
    console.log("Bio", e)
    this.setData({
      bio: e.detail.value
    })
  },

  bindContactInput: function(e){
    console.log("Bio", e)
    this.setData({
      contact: e.detail.value
    })
  },

  login(){
    const self = this
    const _getLoginCode = new Promise(resolve => {
      wx.login({
        success: res => resolve(res.code)
      })
    })

    const _getUserProfile = new Promise(resolve => {
      wx.getUserProfile({
        desc: 'Get User Profile',
        success: res => resolve(res)
      })
    })

    Promise.all([_getLoginCode, _getUserProfile]).then(result => {
      const [code, userProfile] = result
      wx.BaaS.auth.updateUserInfo(userProfile, {code}).then(res => {
        // user 包含用户完整信息，详见下方描述
        console.log(res)
        let userID = res.id
        let Users = new wx.BaaS.TableObject('_userprofile')
        let user = Users.getWithoutData(userID)

        user.set({
          nickname: res.nickname,
          labels: self.data.selectedLabels,
          avatar: res.avatar,
          bio: self.data.bio,
          contact: self.data.contact,
        })

        user.update().then((res)=>{
          wx.setStorageSync('userInfo', res.data)
          wx.setStorage({
            data: true,
            key: 'hasUserInfo',
            success: ()=>{
              wx.switchTab({
                url: '/pages/community/community',
              })
            }
            })
            console.log("new post added", res)
            wx.showToast({
              title: "You're in!",
              icon: 'none',
            })
          },err=>{
            console.log("err", err)
          }
        )
      }, err => {
        // **err 有两种情况**：用户拒绝授权，HError 对象上会包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 HError 对象（详情见下方注解）
        console.log("Login error", err)
        wx.showToast({
          icon: 'error',
          title: 'Authorization fail',
        })
      })
    })
  },

  onReady: function () {
  
  },

})