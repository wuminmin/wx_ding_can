// example/xiao_shou_guan_li/xiao_shou_guan_li.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app_tittle: '销售助手123',
    app_des: '销售人员录入数据，管理人员查看进度',
    app_code_des: '您没有权限，请联系管理员',
    app_code: '13355661100',
    name: '销售助手123',
    page_name: '正在加载数据...',
    page_desc: '录入数据',
    xing_ming: '',
    xiao_qu_id: '',
    array: [],
    index: 0,
    lou_yu_id: '',
    lou_yu_id_list: [],
    lou_yu_list: [],
    countries: [],
    countryIndex: 0,
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryIndex: e.detail.value
    });
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'ding_can_cai_dan_fen_ye/',
            data: {
              code: res.code,
              name: that.data.name,
              page_name: that.data.page_name,
              page_desc: that.data.page_desc,
              countries_val: that.data.countries[that.data.countryIndex]
            },
            success: function (result) {
              if (result.data.描述 == "成功") {
                that.setData({
                  name: result.data.name,
                  page_name: result.data.page_name,
                  page_desc: result.data.page_desc,
                  lou_yu_list: result.data.lou_yu_list,
                });
              } else {
              }
              console.log('request success', result)
            }
          })
        } else {
          that.setData({
            showTopTips_fail_txt: res.errMsg,
            showTopTips_fail: true,
          });
          setTimeout(function () {
            that.setData({
              showTopTips_fail: false
            });
          }, 3000);
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },
  bindMenPaiHao: function (e) {
    console.log('bindMenPaiHao', e.target.id)
    var bindMenPaiHao_id = e.target.id;
    var that = this;
    wx.navigateTo({
      url: '../../example/cai_ji/cai_ji?bindMenPaiHao_id=' + bindMenPaiHao_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.name)
    console.log(options.page_name)
    console.log(options.page_desc)
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'ding_can_cai_dan_init/',
            data: {
              code: res.code,
              name: options.name,
              page_name: options.page_name,
              page_desc: options.page_desc,
            },
            success: function (result) {
              if (result.data.描述 == "成功") {
                that.setData({
                  name: result.data.name,
                  page_name: result.data.page_name,
                  page_desc: result.data.page_desc,
                  countries: result.data.countries,
                  lou_yu_list: result.data.lou_yu_list,
                });
              } else {
              }
              console.log('request success', result)
            }
          })
        } else {
          that.setData({
            showTopTips_fail_txt: res.errMsg,
            showTopTips_fail: true,
          });
          setTimeout(function () {
            that.setData({
              showTopTips_fail: false
            });
          }, 3000);
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})