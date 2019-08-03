App({
    onLaunch: function () {
        console.log('App Launch')
      wx.getSystemInfo({
        success: function (res) {
          console.log(res.model)
          console.log(res.pixelRatio)
          console.log(res.windowWidth)
          console.log(res.windowHeight)
          console.log(res.language)
          console.log(res.version)
          console.log(res.platform)
        }
      })
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    globalData: {
      hasLogin: false,
      kao_shi_da_lei: '',
      kao_shi_xiao_lei: '',
      // global_url: 'https://wx.wuminmin.top/'
      global_url:'http://127.0.0.1:8000/'
    },
});