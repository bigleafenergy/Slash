Component({
  data: {
    selected: 0,
    color: "#788475",
    selectedColor: "#251605",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/home.png",
      selectedIconPath: "/images/home-selected.png",
      text: "Home"
    }, {
      pagePath: "/pages/stories/stories",
      iconPath: "/images/quote.png",
      selectedIconPath: "/images/quote-selected.png",
      text: "Stories"
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