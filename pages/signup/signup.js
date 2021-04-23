// pages/signup/signup.js
Page({

  data: {
    showForm: false,
    currentUser: null,
    nickname: null,
    bio: null,
    contact: null,
    labels: [{name: "Photography", selected: false}, {name: "Music", selected: false}, {name: "Languages", selected: false}, {name: "Design", selected: false}, {name: "Coding", selected: false}, {name: "Writing", selected: false}, {name: "Fitness", selected: false}, {name: "Arts & Crafts", selected: false}, {name: "Coffee", selected: false}, {name: "Outdoor", selected: false}, {name: "Other", selected: false}],
    selectedLabel: ''
  },

  onLoad: function (options) {
    wx.getStorage({
      key: 'hasUserInfo',
      success: res=>{
        wx.redirectTo({
          url: '/pages/community/community',
        })
      },
      fail: res=>{
        this.setData({
          currentUser: wx.getStorageSync('userInfo')
        })
        console.log("showform", options)
        if (options.showform == "true"){
          this.setData({
            showForm: true
          })
        }
      }
    })

    // let Labels = new wx.BaaS.TableObject('slash_labels')
    // const self = this
    // Labels.find().then(
    //   (res) => {
    //     console.log('labels', res.data.objects)
    //     self.setData ({
    //       labels: res.data.objects
    //     })
    //     console.log('page-data-labels', this.data.labels)
    //   }
    // )
  },
  toIndex(){
    wx.redirectTo({
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

  submitUserProfile(){
    const self = this
    wx.getUserProfile({
      desc: "Get user info for login",
      success: res =>{
        
      //   wx.BaaS.auth.updateUserInfo(res).then(user => {
      //     // user 包含用户完整信息，详见下方描述
      //     console.log("user profile", user)
      //   }, err => {
      //     // **err 有两种情况**：用户拒绝授权，HError 对象上会包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 HError 对象（详情见下方注解）
      // })
        console.log("profile", res.userInfo)
        let userProfile = res.userInfo
        console.log('user profile check',userProfile)
        const self = this
        let userID = this.data.currentUser.id
        let Users = new wx.BaaS.TableObject('_userprofile')
        let user = Users.getWithoutData(userID)
        console.log("userProfile.avatarUrl", userProfile.avatarUrl)

        user.set({
          nickname: this.data.nickname,
          labels: this.data.selectedLabels,
          avatar: userProfile.avatarUrl,
          bio: this.data.bio,
          contact: this.data.contact,
          avatarUrl: userProfile.avatarUrl
        })
        user.update().then(
          (res)=>{
          wx.setStorageSync('userInfo', res.data)
          wx.setStorage({
            data: true,
            key: 'hasUserInfo',
            success: ()=>{
              wx.navigateTo({
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
        
      }}
    )

    
 
  },

  onReady: function () {
  
  },


})