var app = getApp()
Page({
  data: {
    order:{},
    phone:'',
    number: '',
    name: '',
    product_name: '',
    create_time:'',

    innerAudioContext:null,

    showTopTips: false,
    showTopTips_normal: false,
    showTopTips_normal_txt: '',
    showTopTips_fail: false,
    showTopTips_fail_txt: '',

  },
  start: function (){
    let that = this
    wx.login({
      success(res){
        if (res.code) {
          wx.request({
            url: app.globalData.global_url + 'start_voice',
            data: {
              data: {
                app_id: app.globalData.app_id,
                code: res.code,
              }
            },
            success: function (result) {
              console.log(result)
              if (result.data.code == 1) {
                let res_data = result.data.data
                that.setData({
                  order: res_data,
                  phone: res_data.手机号,
                  number: res_data.预定数量,
                  name: res_data.姓名,
                  product_name: res_data.name,
                  create_time: res_data.create_time,
                })
                let mp3_text = res_data.姓名 + res_data.name + res_data.预定数量 + '份'
                wx.downloadFile({
                  url: app.globalData.global_url + 'ding_can_xia_zai_mp3' + '?mp3_text=' + mp3_text,
                  success(res){
                    console.log(res.tempFilePath)
                    if (res.statusCode === 200) {
                      that.innerAudioContext.src = res.tempFilePath
                      that.innerAudioContext.play(() => {
                        console.log('开始播放')
                      })
                      that.innerAudioContext.onEnded(() => {
                        console.log('结束播放')
                      })
                      that.innerAudioContext.onError((res) => {
                        console.log(res.errMsg)
                        console.log(res.errCode)
                      })
                    }
                  }
                })
              } else if (result.data.code == 2){
                that.setData({
                  phone: '没有提薪',
                  number: '',
                  name: '',
                  product_name: '',
                  create_time: '',
                  order: {},
                })
              }
            }
          })

        }
      }
    })
  },

  send_goods: function () {
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: app.globalData.global_url + 'send_goods',
            data: {
              data: {
                app_id: app.globalData.app_id,
                code: res.code,
                order: that.data.order,
              }
            },
            success: function (result) {
              console.log(result)
              if (result.data.code == 1) {
                let mp3_text = that.data.name + '已发货'
                wx.downloadFile({
                  url: app.globalData.global_url + 'ding_can_xia_zai_mp3' + '?mp3_text=' + mp3_text,
                  success(res) {
                    console.log(res.tempFilePath)
                    if (res.statusCode === 200) {
                      that.innerAudioContext.src = res.tempFilePath
                      that.innerAudioContext.play(() => {
                        console.log('开始播放')
                      })
                      that.innerAudioContext.onEnded(() => {
                        console.log('结束播放')
                      })
                      that.innerAudioContext.onError((res) => {
                        console.log(res.errMsg)
                        console.log(res.errCode)
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  onLoad: function (options) {
    this.innerAudioContext = wx.createInnerAudioContext()
  },

});