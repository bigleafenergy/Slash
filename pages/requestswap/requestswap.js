// pages/requestswap/requestswap.js
const app = getApp()

Page({

  data: {
    request: [],
    availableDay: [],
    showView: false
  },

  onShow: function () {
    let requestID = app.globalData.globalRequestID
    console.log("within swap page", requestID)

    let requestrequesttable = new wx.BaaS.TableObject('slash_requests')

    requestrequesttable.expand(['skills_id','user_id']).get(requestID).then((res) => {
      console.log("within swappage expand res", res)
      this.setData({
        request: res.data
      })

      let availableTimeTable = this.data.request.skills_id.available_time
      let dayArray = []
      availableTimeTable.forEach((item) => {
        if (item == 1) {
          dayArray.push(" Mon")
        } else if (item == 2) {
          dayArray.push(" Tue")
        } else if (item == 3) {
          dayArray.push(" Wed")
        } else if (item == 4) {
          dayArray.push(" Thu")
        } else if (item == 5) {
          dayArray.push(" Fri")
        } else if (item == 6) {
          dayArray.push(" Sat")
        } else if (item == 7) {
          dayArray.push("Sun")
        } 
  
      })
      this.setData({availableDay: dayArray})

    })

  },

  swap: function () {
    this.setData({
      showView: (!this.data.showView)
    })
    let requestrequesttable = new wx.BaaS.TableObject('slash_requests')
    let requestID = app.globalData.globalRequestID
    let requestswap = requestrequesttable.getWithoutData(requestID)
    requestswap.set('confirmation', true)
    requestswap.update().then(res => {
      this.onShow(this.options)
    })


  },


  copyContact: function() {
    wx.setClipboardData({
      data: this.data.request.user_id.contact,
    })
  }

})