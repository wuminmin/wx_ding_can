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
      app_id: 'wx32c0a3c1a3bfa81d',//池州通服小程序
      // app_id:'wx10547371f9547456',//池州铁塔小程序
      hasLogin: false,
      kao_shi_da_lei: '',
      kao_shi_xiao_lei: '',
      // global_url: 'https://wx.wuminmin.top/canteen/'//池州通服小程序
      // global_url: 'https://tieta.wuminmin.top/canteen/'//池州铁塔小程序
      global_url:'http://127.0.0.1:80/canteen/'
    },
});