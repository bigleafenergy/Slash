// pages/community/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labels: [],
    skillsWithLabel: [],
    share: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    const self = this
    let labelsTable = new wx.BaaS.TableObject('slash_labels')

    console.log(labelsTable)
    labelsTable.limit(100).find().then(
      (res) => {
        console.log('here print label able', res)
        self.setData({
          labels: res.data.objects.reverse()
        }) 
      }, 
      (err) => {
        console.log("here we have an err", err)
    })










  },


  switchToLabel: function(e) {
    console.log("clicklable", e)
    let selectedLabelId = e.currentTarget.dataset.label_id
    console.log(selectedLabelId)

    let skillsTable = new wx.BaaS.TableObject('slash_skills')
    let query = new wx.BaaS.Query()

    console.log(skillsTable)
    query.compare('label_id','=',selectedLabelId)

    skillsTable.setQuery(query).find().then(
      (res) => {
        console.log("skillTablequery", res)
        this.setData({
          skillsWithLabel: res.data.objects
        })
      }
  )
  },

  switchToSharing: function(e) {
    this.setData({
      share: true
    })
  },
  switchToLearning: function(e) {
    this.setData({
      share: false
    })
  }

})