// pages/newskill/newskill.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentUser: null,
    labels:["Photography","Music","Languages","Design", "Coding","Writing", "Fitness","Arts & Crafts","Other"],
    selectedLabel: '',
    sessionLength: ["0.5 hour", "1 hour", "half day", "whole day"],
    selectedSessionLength: '',
    dayss: [
      {value: '1', name: 'Monday', checked: 'false'},
      {value: '2', name: 'Tuesday', checked: 'false'},
      {value: '3', name: 'Wednesday', checked: 'false'},
      {value: '4', name: 'Thursday', checked: 'false'},
      {value: '5', name: 'Friday', checked: 'false'},
      {value: '6', name: 'Saturday', checked: 'false'},
      {value: '7', name: 'Sunday', checked: 'false'}
    ],
    selectedDays: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData ({
      currentUser: wx.getStorageSync('userInfo')
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
})