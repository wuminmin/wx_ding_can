const app = getApp()
// example/ding_dan/ding_dan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    showTopTips_normal: false,
    showTopTips_normal_txt: '',
    showTopTips_fail: false,
    showTopTips_fail_txt: '',

    name: '',
    page_name: '',
    page_desc: '',
    xing_ming: '',
    shi_tang_di_zhi: '',

    date: "",
    start_date: "",
    end_date: "",
    time: "12:01",

    zao_can_shu_liang: '',
    zao_can_jia_ge: '',
    zao_can_qian_dao: '',
    zao_can_ding_can_shi_jian: '',
    zao_can_qu_xiao_shi_jian: '',

    zhong_can_shu_liang: '',
    zhong_can_jia_ge: '',
    zhong_can_qian_dao: '',
    zhong_can_ding_can_shi_jian: '',
    zhong_can_qu_xiao_shi_jian: '',

    wan_can_shu_liang: '',
    wan_can_jia_ge: '',
    wan_can_qian_dao: '',
    wan_can_ding_can_shi_jian: '',
    wan_can_qu_xiao_shi_jian: '',

    hiddenmodalput: true,
    modal_tittle: '取消订餐',
    qu_xiao_zao_can_flag: false,
    qu_xiao_zhong_can_flag: false,
    qu_xiao_wan_can_flag: false,

    isAgree_zhong_can: false,
    isAgree_wan_can: false,

  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    });
    var that = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'ding_can_ding_dan/',
            data: {
              code: res.code,
              date: that.data.date,
              name: that.data.name,
              page_name: that.data.page_name,
              page_desc: that.data.page_desc,
            },
            success: function(result) {
              if (result.data.描述 == "下载成功") {
                that.setData({
                  // name: result.data.主菜单name,
                  // page_name: result.data.子菜单page_name,
                  // page_desc: result.data.子菜单page_desc,

                  // xing_ming: result.data.姓名,
                  // shi_tang_di_zhi: result.data.食堂地址,
                  // date: result.data.日期,
                  // start_date: result.data.开始日期,
                  // end_date: result.data.结束日期,

                  zao_can_shu_liang: result.data.早餐食堂就餐预订数,
                  zao_can_jia_ge: result.data.早餐价格,
                  zao_can_qian_dao: result.data.早餐食堂就餐签到,
                  zao_can_ding_can_shi_jian: result.data.早餐订餐时间,
                  zao_can_qu_xiao_shi_jian: result.data.早餐取消时间,

                  zhong_can_shu_liang: result.data.中餐食堂就餐预订数,
                  zhong_can_jia_ge: result.data.中餐价格,
                  zhong_can_qian_dao: result.data.中餐食堂就餐签到,
                  zhong_can_ding_can_shi_jian: result.data.中餐订餐时间,
                  zhong_can_qu_xiao_shi_jian: result.data.中餐取消时间,

                  wan_can_shu_liang: result.data.晚餐食堂就餐预订数,
                  wan_can_jia_ge: result.data.晚餐价格,
                  wan_can_qian_dao: result.data.晚餐食堂就餐签到,
                  wan_can_ding_can_shi_jian: result.data.晚餐订餐时间,
                  wan_can_qu_xiao_shi_jian: result.data.晚餐取消时间,

                });
              } else {
                that.setData({
                  showTopTips_fail_txt: result.data.描述,
                  showTopTips_fail: true,

                  zao_can_shu_liang: '',
                  zao_can_jia_ge: '',
                  zao_can_qian_dao: '',
                  zao_can_ding_can_shi_jian: '',
                  zao_can_qu_xiao_shi_jian: '',

                  zhong_can_shu_liang: '',
                  zhong_can_jia_ge: '',
                  zhong_can_qian_dao: '',
                  zhong_can_ding_can_shi_jian: '',
                  zhong_can_qu_xiao_shi_jian: '',

                  wan_can_shu_liang: '',
                  wan_can_jia_ge: '',
                  wan_can_qian_dao: '',
                  wan_can_ding_can_shi_jian: '',
                  wan_can_qu_xiao_shi_jian: '',
                });
                setTimeout(function() {
                  that.setData({
                    showTopTips_fail: false
                  });
                }, 3000);
              }
              console.log('request success', result)
            }
          })
        } else {
          that.setData({
            showTopTips_fail_txt: res.errMsg,
            showTopTips_fail: true,
          });
          setTimeout(function() {
            that.setData({
              showTopTips_fail: false
            });
          }, 3000);
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  qu_xiao_zao_can: function () {
    this.setData({
      hiddenmodalput: false,
      modal_tittle: '取消早餐',
      qu_xiao_zao_can_flag: true,
    })
    console.log(this.data.qu_xiao_zhong_can_flag)

  },

  qu_xiao_zhong_can: function() {
    this.setData({
      hiddenmodalput: false,
      modal_tittle: '取消中餐',
      qu_xiao_zhong_can_flag: true,
    })
    console.log(this.data.qu_xiao_zhong_can_flag)

  },

  qu_xiao_wan_can: function(options) {
    this.setData({
      hiddenmodalput: false,
      modal_tittle: '取消晚餐',
      qu_xiao_wan_can_flag: true,
    })
    console.log(this.data.qu_xiao_wan_can_flag)

  },

  confirm: function() {
    var that = this;
    console.log('ding_can_qu_xiao',that.data.date);
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'ding_can_qu_xiao/',
            data: {
              code: res.code,
              date: that.data.date,
              name: that.data.name,
              page_name: that.data.page_name,
              page_desc: that.data.page_desc,
              qu_xiao_zao_can_flag: that.data.qu_xiao_zao_can_flag,
              qu_xiao_zhong_can_flag: that.data.qu_xiao_zhong_can_flag,
              qu_xiao_wan_can_flag: that.data.qu_xiao_wan_can_flag,
            },
            success: function(result) {
              if (result.data.描述 == "早餐取消成功" ||result.data.描述 == "中餐取消成功" || result.data.描述 == "晚餐取消成功") {
                that.setData({
                  hiddenmodalput:true,
                  showTopTips_normal_txt: result.data.描述,
                  showTopTips_normal: true,
                  qu_xiao_zhong_can_flag: false,
                  qu_xiao_wan_can_flag: false,

                  zao_can_shu_liang: result.data.早餐食堂就餐预订数,
                  zao_can_jia_ge: result.data.早餐价格,
                  zao_can_qian_dao: result.data.早餐食堂就餐签到,
                  zao_can_ding_can_shi_jian: result.data.早餐订餐时间,
                  zao_can_qu_xiao_shi_jian: result.data.早餐取消时间,

                  zhong_can_shu_liang: result.data.中餐食堂就餐预订数,
                  zhong_can_jia_ge: result.data.中餐价格,
                  zhong_can_qian_dao: result.data.中餐食堂就餐签到,
                  zhong_can_ding_can_shi_jian: result.data.中餐订餐时间,
                  zhong_can_qu_xiao_shi_jian: result.data.中餐取消时间,

                  wan_can_shu_liang: result.data.晚餐食堂就餐预订数,
                  wan_can_jia_ge: result.data.晚餐价格,
                  wan_can_qian_dao: result.data.晚餐食堂就餐签到,
                  wan_can_ding_can_shi_jian: result.data.晚餐订餐时间,
                  wan_can_qu_xiao_shi_jian: result.data.晚餐取消时间,

                });
                setTimeout(function () {
                  that.setData({
                    showTopTips_normal: false
                  });
                }, 3000);
              } else {
                that.setData({
                  hiddenmodalput: true,
                  showTopTips_fail_txt: result.data.描述,
                  showTopTips_fail: true,
                  qu_xiao_zhong_can_flag: false,
                  qu_xiao_wan_can_flag: false,

                  zao_can_shu_liang: result.data.早餐食堂就餐预订数,
                  zao_can_jia_ge: result.data.早餐价格,
                  zao_can_qian_dao: result.data.早餐食堂就餐签到,
                  zao_can_ding_can_shi_jian: result.data.早餐订餐时间,
                  zao_can_qu_xiao_shi_jian: result.data.早餐取消时间,

                  zhong_can_shu_liang: result.data.中餐食堂就餐预订数,
                  zhong_can_jia_ge: result.data.中餐价格,
                  zhong_can_qian_dao: result.data.中餐食堂就餐签到,
                  zhong_can_ding_can_shi_jian: result.data.中餐订餐时间,
                  zhong_can_qu_xiao_shi_jian: result.data.中餐取消时间,

                  wan_can_shu_liang: result.data.晚餐食堂就餐预订数,
                  wan_can_jia_ge: result.data.晚餐价格,
                  wan_can_qian_dao: result.data.晚餐食堂就餐签到,
                  wan_can_ding_can_shi_jian: result.data.晚餐订餐时间,
                  wan_can_qu_xiao_shi_jian: result.data.晚餐取消时间,
                });
                setTimeout(function() {
                  that.setData({
                    showTopTips_fail: false
                  });
                }, 3000);
              }
              console.log('request success', result)
            }
          })
        } else {
          that.setData({
            hiddenmodalput: true,
            showTopTips_fail_txt: res.errMsg,
            showTopTips_fail: true,
          });
          setTimeout(function() {
            that.setData({
              showTopTips_fail: false
            });
          }, 3000);
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

  },

  cancel: function() {
    // if (this.data.qu_xiao_zhong_can_flag) {
      this.setData({
        hiddenmodalput: true,
        qu_xiao_zao_can_flag: false,
        qu_xiao_zhong_can_flag: false,
        qu_xiao_wan_can_flag: false,
      })
    // }

    // if (this.data.qu_xiao_wan_can_flag) {
    //   this.setData({
    //     hiddenmodalput: true,
    //     qu_xiao_wan_can_flag: false,
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(options.name)
    console.log(options.page_name)
    console.log(options.page_desc)
    that.setData({
      name: options.name,
      page_name: options.page_name,
      page_desc: options.page_desc,
    });
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'ding_can_ding_dan/',
            data: {
              code: res.code,
              date: that.data.date,
              name: options.name,
              page_name: options.page_name,
              page_desc: options.page_desc,
            },
            success: function(result) {
              if (result.data.描述 == "下载成功") {
                that.setData({
                  xing_ming: result.data.姓名,
                  shi_tang_di_zhi: result.data.食堂地址,
                  date: result.data.日期,
                  start_date: result.data.开始日期,
                  end_date: result.data.结束日期,

                  zao_can_shu_liang: result.data.早餐食堂就餐预订数,
                  zao_can_jia_ge: result.data.早餐价格,
                  zao_can_qian_dao: result.data.早餐食堂就餐签到,
                  zao_can_ding_can_shi_jian: result.data.早餐订餐时间,
                  zao_can_qu_xiao_shi_jian: result.data.早餐取消时间,

                  zhong_can_shu_liang: result.data.中餐食堂就餐预订数,
                  zhong_can_jia_ge: result.data.中餐价格,
                  zhong_can_qian_dao: result.data.中餐食堂就餐签到,
                  zhong_can_ding_can_shi_jian: result.data.中餐订餐时间,
                  zhong_can_qu_xiao_shi_jian: result.data.中餐取消时间,

                  wan_can_shu_liang: result.data.晚餐食堂就餐预订数,
                  wan_can_jia_ge: result.data.晚餐价格,
                  wan_can_qian_dao: result.data.晚餐食堂就餐签到,
                  wan_can_ding_can_shi_jian: result.data.晚餐订餐时间,
                  wan_can_qu_xiao_shi_jian: result.data.晚餐取消时间,

                });
              } else {
                that.setData({
                  showTopTips_fail_txt: result.data.描述,
                  showTopTips_fail: true,
                  date: result.data.日期,
                  start_date: result.data.开始日期,
                  end_date: result.data.结束日期,
                });
                setTimeout(function() {
                  that.setData({
                    showTopTips_fail: false
                  });
                }, 3000);
              }
              console.log('request success', result)
            }
          })
        } else {
          that.setData({
            showTopTips_fail_txt: res.errMsg,
            showTopTips_fail: true,
          });
          setTimeout(function() {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})