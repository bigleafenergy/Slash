// pages/newskill/newskill.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentUser: null,
    description_offer: null,
    title_skills: null,
    labels:["Photography","Music","Languages","Design", "Coding","Writing", "Fitness","Arts & Crafts","Coffee", "Outdoors","Other"],
    selectedLabel: '',
    sessionLength: ["0.5 hour", "1 hour", "2 hours","half day", "whole day"],
    selectedSessionLength: '',
    days: [
      {value: '1', name: 'Monday', checked: 'false'},
      {value: '2', name: 'Tuesday', checked: 'false'},
      {value: '3', name: 'Wednesday', checked: 'false'},
      {value: '4', name: 'Thursday', checked: 'false'},
      {value: '5', name: 'Friday', checked: 'false'},
      {value: '6', name: 'Saturday', checked: 'false'},
      {value: '7', name: 'Sunday', checked: 'false'}
    ],
    available_time: [],
    city: null,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData ({
      currentUser: wx.getStorageSync('userInfo')
    })
    wx.getStorage({
      key: 'userInfo',
      success: res =>{
        if(res.data.nickname){
          this.setData({
            hasUserInfo: true
          })
        }else{
          this.setData({
            hasUserInfo: false
          })
          wx.navigateTo({
            url: '/pages/signup/signup?showform=true',
          })
        }
      }
    })

  },

  bindTitleInput(e){
    console.log("Title", e.detail.value)
    this.setData({
      title_skills: e.detail.value
    })
  },

  bindDescriptionInput(e){
    console.log("Description", e)
    this.setData({
      description_offer: e.detail.value
    })
  },

  chooseLabel(e){
    let label = e.currentTarget.dataset.name
    this.setData({
      selectedLabel: label
    }, ()=>{
  
    })
    console.log(this.data.selectedLabel)
  },

  resetLabel(e){
    this.setData({
      selectedLabel: ''
    }, ()=>{
    })
  },

  bindPickerChange(e){
    let selectedIndex = e.detail.value
    this.setData({
      selectedSessionLength: this.data.sessionLength[selectedIndex]
    })
    console.log("session length", this.data.selectedSessionLength)
  },

  bindTimePickerChange(e){
    console.log("picker", e.detail)
    let selectedIndex = e.detail.value
  },
  
  checkboxChange(e){
    let available_time = e.detail.value.map(day => parseInt(day))
    this.setData({available_time})
  },

  bindCityInput(e){
    console.log("Description", e)
    this.setData({
      city: e.detail.value
    })
  },

  submitLearnSkill(){
    const self = this
    let userID= this.data.currentUser.id
    console.log (userID)

    let Skills = new wx.BaaS.TableObject('slash_skills')
    let newSkill = Skills.create()
    newSkill.set({
      userid: userID,
      description_offer: this.data.description_offer,
      title_skills: this.data.title_skills,
      label: this.data.selectedLabel,
      session_length: this.data.selectedSessionLength,
      available_time: this.data.available_time,
      learn: true,
    })
    console.log("checking", this.data.selectedLabels)
    newSkill.save().then(
      (res)=>{
        console.log("new skill added", res)
        wx.showToast({
          title: "Posted!",
          icon: 'none',
        })
        wx.switchTab({
          url: '/pages/community/community',
        })
      },err=>{
        console.log("err", err)
      }
    )
  },

  submitTeachSkill(){
    const self = this
    let userID= this.data.currentUser.id
    console.log (userID)

    let Skills = new wx.BaaS.TableObject('slash_skills')
    let newSkill = Skills.create()
    newSkill.set({
      userid: userID,
      description_offer: this.data.description_offer,
      title_skills: this.data.title_skills,
      label: this.data.selectedLabel,
      session_length: this.data.selectedSessionLength,
      available_time: this.data.available_time,
      learn: false,
    })
    console.log("checking", this.data.selectedLabels)
    newSkill.save().then(
      (res)=>{
        console.log("new skill added", res)
        wx.showToast({
          title: "Posted!",
          icon: 'none',
        })
        wx.switchTab({
          url: '/pages/community/community',
        })
      },err=>{
        console.log("err", err)
      }
    )
  },
})