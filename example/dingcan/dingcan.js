const app = getApp()
Page({
  data: {
    showTopTips: false,
    showTopTips_normal: false,
    showTopTips_normal_txt: '',
    showTopTips_fail: false,
    showTopTips_fail_txt: '',

    name: '',
    page_name: '',
    page_desc: '',
    shi_tang_di_zhi:'',
    ding_can_jie_guo:'',

    date: "",
    start_date:"",
    end_date:"",
    time: "12:01",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: ["无", "预定1份"],
    countryIndex: 0,

    accounts: ["无", "预定1份"],
    zhong_can_shi_tang: 0,

    accounts2: ["无", "预定1份"],
    wan_can_shi_tang: 0,

    zhong_can_wai_dai:0,
    wan_can_wai_dai:0,


    isAgree: false

  },
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
            url: app.globalData.global_url +'get_ding_can_data/',
            data: {
              code: res.code,
              name: options.name,
              page_name: options.page_name,
              page_desc: options.page_desc,
            },
            success: function (result) {
              if (result.data.描述 == "下载成功") {
                that.setData({
                  name: result.data.主菜单name,
                  page_name: result.data.子菜单page_name,
                  page_desc: result.data.子菜单page_desc,
                  shi_tang_di_zhi: result.data.食堂地址,
                  date: result.data.用餐日期,
                  start_date: result.data.预订开始日期,
                  end_date: result.data.预订结束日期,
                  countries: result.data.countries,
                  accounts: result.data.accounts,
                  accounts2: result.data.accounts2,
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
  showTopTips: function () {
    var that = this;
    if (this.data.isAgree == false) {
      that.setData({
        showTopTips: true
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000);
    } else {
      //发起网络请求
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: app.globalData.global_url +'send_ding_can_data/',
              data: {
                code: res.code,
                countryIndex: that.data.countryIndex,
                zhong_can_shi_tang: that.data.zhong_can_shi_tang,
                wan_can_shi_tang: that.data.wan_can_shi_tang,
                zhong_can_wai_dai: that.data.zhong_can_wai_dai,
                wan_can_wai_dai: that.data.wan_can_wai_dai,
                name: that.data.name,
                page_name: that.data.page_name,
                page_desc: that.data.page_desc,
                date: that.data.date,
              },
              success: function (result) {
                if (result.data.描述 == "上传成功") {
                  that.setData({
                    showTopTips_normal_txt: result.data.描述,
                    showTopTips_normal: true,
                    ding_can_jie_guo: result.data.订餐结果描述,
                  });
                  setTimeout(function () {
                    that.setData({
                      showTopTips_normal: false
                    });
                  }, 3000);
                } else {
                  that.setData({
                    showTopTips_fail_txt: result.data.描述,
                    showTopTips_fail: true,
                  });
                  setTimeout(function () {
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
            setTimeout(function () {
              that.setData({
                showTopTips_fail: false
              });
            }, 3000);
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  watch_zhong_can: function (e) {
    console.log('发生选择改变，携带值为', e.detail.value);
    this.setData({
      zhong_can_wai_dai: e.detail.value
    })
  },
  watch_wan_can: function (e) {
    console.log('发生选择改变，携带值为', e.detail.value);
    this.setData({
      wan_can_wai_dai: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindAccountChange0: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange1: function (e) {
    console.log('zhong_can_shi_tang 发生选择改变，携带值为', e.detail.value);

    this.setData({
      zhong_can_shi_tang: e.detail.value
    })
  },
  bindAccountChange2: function (e) {
    console.log('wan_can_shi_tang 发生选择改变，携带值为', e.detail.value);

    this.setData({
      wan_can_shi_tang: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }
});