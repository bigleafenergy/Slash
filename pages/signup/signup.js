// pages/signup/signup.js
Page({

  data: {
    currentUser: null,
    nickname: null,
    bio: null,
    labels: [{name: "Photography", selected: false}, {name: "Music", selected: false}, {name: "Languages", selected: false}, {name: "Design", selected: false}, {name: "Coding", selected: false}, {name: "Writing", selected: false}, {name: "Fitness", selected: false}, {name: "Arts & Crafts", selected: false}, {name: "Other", selected: false}],
    selectedLabel: ''
  },

  onLoad: function (options) {
    this.setData ({
      currentUser: wx.getStorageSync('userInfo')
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

  getUserProfile(){
    wx.getUserProfile({
      desc: "Get user info for login",
      success: res=>{
        console.log("profile", res.userInfo)
        let userInfo = res.userInfo
        const self = this
        wx.BaaS.auth.loginWithWechat(userInfo).then(
          (res) => {
            console.log('res',res)
            self.setData({
              currentUser: res
            })
            wx.setStorageSync('userInfo', res)
            // console.log(this.data.currentUser.id)
          }, (err) => {
            console.log('err',err)
          }
        )
      }}
    )
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

  submitUserProfile(){
    const self = this
    let userID= this.data.currentUser.id
    console.log (userID)
    let Users = new wx.BaaS.TableObject('_userprofile')
    let user = Users.getWithoutData(userID)
    user.set({
      nickname: this.data.nickname,
      labels: this.data.selectedLabels,
      bio: this.data.bio,
    })
    console.log("checking", this.data.selectedLabels)

    user.update().then(
      (res)=>{
        console.log("new post added", res)
        wx.showToast({
          title: "You're in!",
          icon: 'none',
        })
        wx.navigateTo({
          url: '/pages/community/community',
        })
      },err=>{
        console.log("err", err)
      }
    )
 
  },

  onReady: function () {
  
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})