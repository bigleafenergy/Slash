// pages/skilldetail/skilldetail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickSkill: [],
    userinfo: [],
    availableDay: [],
    currentUser: getApp().globalData.userInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const self = this
    let skillsTableDetailPage = new wx.BaaS.TableObject('slash_skills')
    let skillID = app.globalData.globalSkillID
    let dayArray = []

    skillsTableDetailPage.get(skillID).then(res => {
      console.log('skill id', res)
      self.setData({
        clickSkill: res.data
      })
    console.log('click skill printout', this.data.clickSkill)

    let availableTimeTable = this.data.clickSkill.available_time
    availableTimeTable.forEach((item) => {
      if (item == 1) {
        dayArray.push("Mon")
      } else if (item == 2) {
        dayArray.push("Tue")
      } else if (item == 3) {
        dayArray.push("Wed")
      } else if (item == 4) {
        dayArray.push("Thu")
      } else if (item == 5) {
        dayArray.push("Fri")
      } else if (item == 6) {
        dayArray.push("Sat")
      } else if (item == 7) {
        dayArray.push("Sun")
      } 

    })
    self.setData({availableDay: dayArray})



 




      console.log('user id', this.data.clickSkill.userid.id)
      let userTable = new wx.BaaS.TableObject('_userprofile')
  
    let query = new wx.BaaS.Query()
    // query.in('userinfo', [userTable.getWithoutData('this.data.clickSkill.userid.id')])
    // console.log("print out user info", this.data.userinfo)
    query.compare('id','=', this.data.clickSkill.userid.id)
    userTable.setQuery(query).find().then(
      (res) => {
        console.log("find user", res)
        self.setData({
          userinfo: res.data.objects[0]
        })
        console.log("print out user info", this.data.userinfo)
      })
    }, err => {
      // err
    })


    // query.compare('id','=', this.data.clickSkill.userid)
    // userTable.setQuery(query).find().then(
    //   (res) => {
    //     console.log("find user", res)
    //     self.setData({
    //       userinfo: res.data.objects
    //     })
    //     console.log("print out user info", this.data.userinfo)
    //   })





  },

  swap: function(e) {


    let requestTable = new wx.BaaS.TableObject('slash_requests')
    let newRequest = requestTable.create()
    newRequest.set({
      user_id: this.data.currentUser.id,
      skills_id:  this.data.clickSkill.id,

      
    })
    newRequest.save().then(
      (res)=>{
        console.log("new request added", res)
        wx.navigateTo({
          url: '/pages/requestSent/requestSent',
        })
      }
    )


  }

 
})