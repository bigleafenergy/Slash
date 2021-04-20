Component({
  data: {
    selected: 0,
    color: "#888888",
    selectedColor: "#111111",
    list: [{
      pagePath: "/pages/community/community",
      iconPath: "/pages/images/explore.png",
      selectedIconPath: "/pages/images/explore-selected.png",
      text: "Explore",
      isSpecial: false 
    }, {
      pagePath: "/pages/newskill/newskill",
      iconPath: "/pages/images/create.png",
      isSpecial: true
    }, {
      pagePath: "/pages/profile/profile",
      iconPath: "/pages/images/profile.png",
      selectedIconPath: "/pages/images/profile-selected.png",
      text: "Profile",
      isSpecial: false 
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      console.log("?", data.index)
      const url = data.pagepath
    //  wx.switchTab({url})
      wx.navigateTo({
        url: url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})

// tapOnCard: function(event){
//   console.log("tap",event.currentTarget.dataset.index)
//   let index = event.currentTarget.dataset.index 
//   this.setData({
//     activeStoryIndex: index
//   })

// },