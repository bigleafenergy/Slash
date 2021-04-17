// pages/profile/profile.js
var app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    currentUser: null,
    allinfo: [],
    shares:[],
    weekendorweekday:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

    this.setData ({
      currentUser: getApp().globalData.userInfo
    })
    console.log("current user",getApp().globalData.userInfo)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    let allinfotabletable = new wx.BaaS.TableObject('_userprofile')
    let query = new wx.BaaS.Query()

    console.log("allinfotable",allinfotabletable)
    query.compare('id','=',this.data.currentUser.id)

    allinfotabletable.setQuery(query).find().then(
      (res) => {
        this.setData({
          allinfo: res.data.objects
        })
        console.log("allinfo", this.data.allinfo)
      }
    )

    let requeststable = new wx.BaaS.TableObject('slash_skills')
    let query2 = new wx.BaaS.Query()

    console.log("requesttable",requeststable)
    query2.compare('userid','=',this.data.currentUser.id)
    query2.compare('learn','=', false)

    requeststable.setQuery(query2).find().then(
      (res) => {
        this.setData({
          shares: res.data.objects
        })
      },
    )
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

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