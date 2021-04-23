// pages/community/community.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // labels: [],
    allSkills: [],
    skillsWithLabel: [],
    // learnlocal: false,
    labels: [{name: "All", selected: true}, {name: "Photography", selected: false}, {name: "Music", selected: false}, {name: "Languages", selected: false}, {name: "Design", selected: false}, {name: "Coding", selected: false}, {name: "Writing", selected: false}, {name: "Fitness", selected: false}, {name: "Arts & Crafts", selected: false}, {name: "Coffee", selected: false}, {name: "Outdoor", selected: false}, {name: "Other", selected: false}],
    share: 1,

  },

  onShow: function (options) {
    this.setAllSkillsTable()
  },

  setAllSkillsTable() {
    const self = this
    let skillsTable = new wx.BaaS.TableObject('slash_skills')
    let query = new wx.BaaS.Query()

    let learnlocal = null
    if (this.data.share == 0) {
      learnlocal = true
    } else {
      learnlocal = false
    }
    query.compare('learn','=', learnlocal)
    skillsTable.setQuery(query).expand('userid').find().then(
      (res) => {
        this.setData({
          allSkills: res.data.objects.reverse()
        })
        console.log("all skill expand userid", this.data.allSkills)
      },(err) => {
        console.log("here we have an err", err)
      })

  },

  switchToSharing: function(e) {
    this.setData({
      learnlocal: true,
      share: 1
    })
    this.setAllSkillsTable()

    this.setData({
      labels: this.data.labels
    }, ()=>{
      this.setSelectedLabels()
    })
  },
  
  switchToLearning: function(e) {
    this.setData({
      learnlocal: false,
      share: 0
    })
    this.setAllSkillsTable()

    this.setData({
      labels: this.data.labels
    }, ()=>{
      this.setSelectedLabels()
    })
  },

  chooseLabel(e){
    let index = e.currentTarget.dataset.index
    if (index == 0){
      this.data.labels.forEach((label, index)=>{
        if (index!=0){
          label.selected = false
          this.setData({
            labels: this.data.labels,
            skillsWithLabel: []
          })
        } else {
          label.selected = true
          this.setData({
            labels: this.data.labels,
          })
        }
      })
    } else {
      console.log("choose label index", index)
      if(this.data.labels[0].selected == true && index != 0){
        this.data.labels[0].selected = false
        this.setData({
          labels: this.data.labels
        })
      }
      this.data.labels[index].selected = true
      this.setData({
        labels: this.data.labels
      }, ()=>{
        this.setSelectedLabels()
      })
    }
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
        console.log("label", label.name == "All")
      }
    })
    this.setData({
      selectedLabels: selectedLabels
    })

    let skillsTable = new wx.BaaS.TableObject('slash_skills')
    let query = new wx.BaaS.Query()
    console.log("selectedLabels", selectedLabels)

    let learnlocal = null
    if (this.data.share == 0) {
      learnlocal = true
    } else {
      learnlocal = false
    }
    query.compare('learn','=', learnlocal)

    if (selectedLabels.length == 0) {
      this.setData({
        skillsWithLabel: null
      })
    } else {
      query.in('label', selectedLabels)

      skillsTable.setQuery(query).expand('userid').find().then(
        (res) => {
        let skillsWithLabel = res.data.objects
        this.setData({
         skillsWithLabel: res.data.objects.reverse()
        })
        console.log("skillTablequery", res, skillsWithLabel)

        let weekArray = ["Mon", "Tue", "Wed", "Mon", "Tue", "Sun"]
        // console.log("skillsWithLabel 1", skillsWithLabel)
        skillsWithLabel.forEach((skill, idx)=>{
          skill["dayArray"] = []
          console.log("checking each skill", skill)
          skill.available_time.forEach((day, index)=>{
            skill["dayArray"].push(weekArray[day])
            this.setData({
              skillsWithLabel: this.data.skillsWithLabel
            })
          })
        })
      })
    }
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

  switchToSignup: function(e) {
    console.log("switchToSignupswitchToSignupswitchToSignup")
    wx.getStorage({
      key: 'hasUserInfo',
      success: res=>{
        console.log("success", res)
        getApp().globalData.globalSkillID = e.currentTarget.dataset.skill_id
        wx.navigateTo({
          url: '/pages/skilldetail/skilldetail',
        })
      },
      fail: res=>{
<<<<<<< HEAD
        console.log("????", res)
        wx.redirectTo({
=======
        wx.navigateTo({
>>>>>>> 4286419caf576ced1d4baf4cbbae3a5aeb69529e
          url: '/pages/signup/signup?showform=true',
        })
      }
    })
<<<<<<< HEAD

=======
>>>>>>> 4286419caf576ced1d4baf4cbbae3a5aeb69529e
  }


})  