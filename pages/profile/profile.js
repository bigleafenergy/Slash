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
    learn:[],
    availablearray:[],
    irequestpost:[],
    requested: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
    const self = this
    wx.getStorage({
      key: 'userInfo',
      success: res =>{
        if(res.data.nickname){
          this.setData({
            currentUser: res.data,
            hasUserInfo: false
          })
        }else{
          this.setData({
            hasUserInfo: false
          })
        }
      },
      fail: (err)=>{
        this.setData({
          hasUserInfo: false
        })
      }
    })
    
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
          shares: res.data.objects,
        })
        console.log("shares",this.data.shares)
        this.data.shares.forEach((element) => {
          
        });
      })

      let learnlearntable = new wx.BaaS.TableObject('slash_skills')
      let query3 = new wx.BaaS.Query()

      query3.compare('userid','=',this.data.currentUser.id)
      query3.compare('learn','=', true)

      learnlearntable.setQuery(query3).find().then(
        (res) => {
          this.setData({
            learn: res.data.objects,
          })
          console.log("learnlearnlearn",this.data.learn)
        },
      )

      let irequesttable = new wx.BaaS.TableObject('slash_requests')
      let query4 = new wx.BaaS.Query()
      let requestedlocal = []
      
      query4.compare('user_id','=',this.data.currentUser.id)
      console.log("this.data.currentUser.id", this.data.currentUser.id)
      irequesttable.setQuery(query4).expand('skills_id').find().then(
        (res) => {
          console.log("this.data.currentUser.id2", res)
          this.setData({
            irequestpost: res.data.objects,
          })
          console.log("irequestthis",this.data.irequestpost)
        }, err=>{
          console.log("error", err)
        }
      )



      let requestrequesttable = new wx.BaaS.TableObject('slash_requests')

      requestrequesttable.expand(['skills_id','user_id']).find().then((res) => {
        console.log("print out expand res", res)    
        console.log(getApp().globalData.userInfo)

        res.data.objects.forEach((req)=>{
          if (req.skills_id.userid === undefined) {
            return 
          }else if(req.skills_id.userid.id === self.data.currentUser.id){
            requestedlocal.push(req)
          }
        })
        // console.log("requested", requested)
        this.setData({
          requested: requestedlocal
        })
      })
      
  },
      

  clickonskillexchangelearn:function(e){
      app.globalData.globalSkillID = e.currentTarget.dataset.skill_id
        wx.navigateTo({
          url: '/pages/profileskill/profileskill',
        })
    },

    clickonskillexchangeshare:function(e){
      app.globalData.globalSkillID = e.currentTarget.dataset.skill_id
      wx.navigateTo({
        url: '/pages/profileskill/profileskill',
      })
    },

    clickonskillexchangeiwant:function(e){
      console.log("monica print e", e)
      app.globalData.globalSkillID = e.currentTarget.dataset.skill_id.id
      console.log("monica", app.globalData.globalSkillID)
      wx.navigateTo({
        url: '/pages/profileskill/profileskill',
      })
    },


    switchToSwapPage: function(e) {
      console.log("swappage switch", e)
      app.globalData.globalRequestID = e.currentTarget.dataset.request_id
      wx.navigateTo({
        url: '/pages/requestswap/requestswap',
      })
    }


})