const app = getApp()
Page({
  data: {
    showTopTips: false,
    showTopTips_normal: false,
    showTopTips_normal_txt: '',
    showTopTips_fail: false,
    showTopTips_fail_txt: '',

    name: '',
    page_name: '正在登录',
    page_desc: '请稍后。。。。',
    shi_tang_di_zhi: '',
    ding_can_jie_guo: '',

    date: "",
    start_date: "",
    end_date: "",
    time: "12:01",

    ding_can_list: [
    ],
    isAgree: false
  },
  bindInput_list: function (e) {
    var that = this;
    var main_list_tittle_tmp = e.currentTarget.dataset.tittle;
    console.log(main_list_tittle_tmp);
    var main_list_tmp = that.data.ding_can_list;
    for (var i in main_list_tmp) {
      if (main_list_tmp[i].tittle == main_list_tittle_tmp) {
        console.log('匹配成功');
        main_list_tmp[i].input_index = e.detail.value;
        console.log(main_list_tmp[i].main_body_txt);
        break; //Stop this loop, we found it!
      }
    }
    that.setData({
      ding_can_list: main_list_tmp
    });
    console.log(that.data.ding_can_list);
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
            url: app.globalData.global_url + 'get_ding_can_data2/',
            data: {
              app_id: app.globalData.app_id,
              code: res.code,
              date: that.data.date,
              name: options.name,
              page_name: options.page_name,
              page_desc: options.page_desc,
            },
            success: function (result) {
              if (result.data.描述 == "下载成功") {
                that.setData({
                  ding_can_list: result.data.ding_can_list,
                  name: result.data.主菜单name,
                  page_name: result.data.子菜单page_name,
                  page_desc: result.data.子菜单page_desc,
                  shi_tang_di_zhi: result.data.食堂地址,
                  date: result.data.用餐日期,
                  start_date: result.data.预订开始日期,
                  end_date: result.data.预订结束日期,
                  showTopTips_normal_txt: result.data.描述,
                  showTopTips_normal: true,
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
              url: app.globalData.global_url + 'send_ding_can_data2/',
              data: {
                app_id: app.globalData.app_id,
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
                ding_can_list: that.data.ding_can_list,
              },
              success: function (result) {
                if (result.data.描述 == "银联下单") {
                    wx.requestPayment({
                      timeStamp: result.data.miniPayRequest.timeStamp,
                      nonceStr: result.data.miniPayRequest.nonceStr,
                      package: result.data.miniPayRequest.package,
                      signType: result.data.miniPayRequest.signType,
                      paySign: result.data.miniPayRequest.paySign,
                      success(res) {
                        wx.request({
                          url: app.globalData.global_url + 'wx_pay_success',
                          data: {
                            app_id: app.globalData.app_id,
                            state: result.data.state
                          },
                          success: function (pay_res) {
                            console.log(pay_res);
                            that.setData({
                              showTopTips_normal_txt: pay_res.data.描述,
                              showTopTips_normal: true,
                              ding_can_jie_guo: pay_res.data.订餐结果描述,
                            });
                            setTimeout(function () {
                              that.setData({
                                showTopTips_normal: false
                              });
                            }, 3000);
                          },

                        })

                      },
                      fail(res) {
                        console.log(res);
                        that.setData({
                          showTopTips_fail_txt: '支付失败',
                          showTopTips_fail: true,
                          // ding_can_jie_guo: result.data.订餐结果描述,
                        });
                        setTimeout(function () {
                          that.setData({
                            showTopTips_fail: false
                          });
                        }, 3000);
                      }
                    });
                } else if (result.data.描述 == "上传成功"){
                  console.log(result);
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
    var that = this;
    that.setData({
      date: e.detail.value
    });

    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'get_ding_can_data2/',
            data: {
              app_id: app.globalData.app_id,
              code: res.code,
              date: that.data.date,
              name: that.data.name,
              page_name: that.data.page_name,
              page_desc: that.data.page_desc,
            },
            success: function (result) {
              if (result.data.描述 == "下载成功") {
                that.setData({
                  ding_can_list: result.data.ding_can_list,
                  showTopTips_normal_txt: result.data.描述,
                  showTopTips_normal: true,
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
    });


  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
});