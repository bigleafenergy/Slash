// pages/community/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // labels: [],
    skillsWithLabel: [],
    // learnlocal: false,
    labels: [{name: "Photography", selected: false}, {name: "Music", selected: false}, {name: "Languages", selected: false}, {name: "Design", selected: false}, {name: "Coding", selected: false}, {name: "Writing", selected: false}, {name: "Fitness", selected: false}, {name: "Arts & Crafts", selected: false}],
    share: 1,

  },





  onLoad: function (options) {
  },

  onShow: function (options) {
    // const self = this
    // let labelsTable = new wx.BaaS.TableObject('slash_labels')

    // console.log(labelsTable)
    // labelsTable.limit(100).find().then(
    //   (res) => {
    //     console.log('here print label able', res)
    //     self.setData({
    //       labels: res.data.objects.reverse()
    //     }) 
    //   }, 
    //   (err) => {
    //     console.log("here we have an err", err)
    // })










  },


  switchToLabel: function(e) {
    console.log("clicklable", e)
    let selectedLabel = e.currentTarget.dataset.label_name
    console.log(selectedLabel)

    let skillsTable = new wx.BaaS.TableObject('slash_skills')
    let query = new wx.BaaS.Query()

    console.log(skillsTable)
    query.compare('label','=', selectedLabel)
    query.compare('learn','=', this.data.learnlocal)

    skillsTable.setQuery(query).find().then(
      (res) => {
        console.log("skillTablequery", res)
        this.setData({
          skillsWithLabel: res.data.objects
        })
      }
  )

  let index = e.currentTarget.dataset.index
  this.data.labels[index].selected = true
  this.setData({
    labels: this.data.labels
  }, ()=>{
    this.setSelectedLabels()
  })


  },

  switchToSharing: function(e) {
    this.setData({
      learnlocal: true,
      share: 1
    })

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

    this.setData({
      labels: this.data.labels
    }, ()=>{
      this.setSelectedLabels()
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

    // console.log("clicklable", e)
    // let selectedLabel = e.currentTarget.dataset.label_name
    // console.log(selectedLabel)

    let skillsTable = new wx.BaaS.TableObject('slash_skills')
    let query = new wx.BaaS.Query()
    let localskillsWithLabel = []
    // console.log(skillsTable)
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
      skillsTable.setQuery(query).find().then(
        (res) => {
        console.log("skillTablequery", res)
        this.setData({
         skillsWithLabel: res.data.objects
        })

        // this.data.skillsWithLabel.forEach((post) => {
        //   console.log(post.available_time)
        //   if (post.available_time.length == 2) {
        //     post.avai_weekday = "All week"
        //     console.log("week", post.avai_weekday)
        //   } else if (post.available_time.length == 3 ) {
        //     post.avai_weekday = "Weekend"
        //     console.log(post.avai_weekday)
        //   }
        // })

      })

      // selectedLabels.forEach((selectedbaby) => {
      //   console.log(selectedbaby)
      //   query.compare('label','=', selectedbaby)

      //   skillsTable.setQuery(query).find().then(
      //     (res) => {
      //       console.log("skillTablequery", res)
            
      //       localskillsWithLabel.push(res.data.objects)
      //       console.log("LOCAL skillTablequery", localskillsWithLabel)

      //     })

          
      // })
      // query.compare('label','=', selectedLabels)
      // this.setData({
      //   skillsWithLabel: localskillsWithLabel
      // })
      // console.log("setdata skillTablequery", this.data.skillsWithLabel)

  

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

  switchToSignup: function() {
    wx.navigateTo({
      url: '/pages/signup/signup',
    })
  }

})