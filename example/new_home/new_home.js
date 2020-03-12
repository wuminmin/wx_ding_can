var app = getApp()
Page({
  data: {
    app_tittle: '食堂订餐',
    app_des: '若点击登陆无反应请稍后再试。',
    app_code_des: '本小程序是专为员工提供食堂订餐服务的小程序，请先与您的管理员联系，在后台添加权限后再点击登陆按钮。通过手机号验证后才可以使用订餐服务。非本公司员工无权限使用本小程序。',
    app_code: '若您不是本小程序的客户，请不要点击登陆按钮。',
    list: [],

    name: '',
    page_name: '',
    page_desc: '',
    er_wei_ma: '',

    shi_tang_di_zhi: '',
    ding_can_jie_guo: '',


    phone_input: "",
    sms_code_input: "",
    modal_tittle: "绑定手机号",
    send_sms_code_hidden: false,
    hiddenmodalput: true,

    showTopTips: false,
    showTopTips_normal: false,
    showTopTips_normal_txt: '',
    showTopTips_fail: false,
    showTopTips_fail_txt: '',

  },
  bindScanCode: function(e) {
    var that = this
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res);
        console.log(res.result);
        that.setData({
          er_wei_ma: res.result,
        });
        that.ding_can_sao_he_xiao_ma();
      },
      fail(e) {
        console.log(e);
        that.setData({
          shi_tang_di_zhi: '无效的二维码',
        });
      },
    });
  },
  ding_can_sao_he_xiao_ma: function() {
    var that = this
    //发起网络请求
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'ding_can_sao_he_xiao_ma2/',
            data: {
              app_id:app.globalData.app_id,
              code: res.code,
              er_wei_ma: that.data.er_wei_ma,
              name: that.data.name,
              page_name: that.data.page_name,
              page_desc: that.data.page_desc,
            },
            success: function(result) {
              console.log(result);
              if (result.data.描述 == '成功') {
                that.setData({
                  shi_tang_di_zhi: result.data.描述,
                  ding_can_jie_guo: result.data.订餐结果,
                });
              } else {
                that.setData({
                  shi_tang_di_zhi: result.data.描述,
                  ding_can_jie_guo: '',
                });
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  },
  phone_input_bindinput: function(e) {
    this.setData({
      phone_input: e.detail.value
    });
  },
  sms_code_input_bindinput: function(e) {
    this.setData({
      sms_code_input: e.detail.value
    });
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮
  cancel: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    });
  },
  //确认
  confirm: function(e) {
    var that = this
    //发起网络请求
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'ding_can_check_sms_code/',
            data: {
              app_id: app.globalData.app_id,
              code: res.code,
              phone: that.data.phone_input,
              sms_code: that.data.sms_code_input
            },
            success: function(result) {
              if (result.data == "绑定成功") {
                that.setData({
                  hiddenmodalput: !that.data.hiddenmodalput
                })
                that.login_check()
              } else {
                that.setData({
                  modal_tittle: result.data
                });
              }
              console.log('request success', result)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  zhu_ce:function(e){
    this.login_check()
  },
  login_check: function(e) {
    var that = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'ding_can_login_check/',
            data: {
              app_id: app.globalData.app_id,
              code: res.code
            },
            success: function(result) {
             if (result.data.描述 == "新界面") {
                wx.login({
                  success(res) {
                    if (res.code) {
                      //发起网络请求
                      wx.request({
                        url: app.globalData.global_url + 'ding_can_get_home_data/',
                        data: {
                          app_id: app.globalData.app_id,
                          code: res.code,
                          name:'长江路食堂123'
                        },
                        success: function (result) {
                          if (result.data.描述 == "下载成功") {
                            that.setData({
                              app_tittle: result.data.主页标题,
                              app_des: result.data.主页描述,
                              app_code_des: result.data.验证码标题,
                              app_code: result.data.验证码描述,
                              list: result.data.主界内容,
                            });
                          } 
                          else if (result.data.描述 == "未注册手机号") {
                            that.modalinput();
                          } 
                          else {
                            that.setData({
                              app_des: result.data.描述
                            })
                          }
                          console.log('request success', result)
                        },
                        fail: function (e) {
                          that.setData({
                            app_des: "系统故障，请联系管理员"
                          })
                        }
                      })
                    } else {
                      that.setData({
                        app_des: "系统故障，请联系管理员"
                      })
                    }
                  }
                })
              } else {
               that.setData({
                 showTopTips_fail_txt: result.data.描述,
                 showTopTips_fail: true,
                 app_des: result.data.描述,
               });
               setTimeout(function () {
                 that.setData({
                   showTopTips_fail: false
                 });
               }, 3000);
               that.modalinput();
              }
              console.log('request success', result);
              
            },
            fail:function(e){
              that.setData({
                app_des:'系统故障，请联系管理员',
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  send_sms_code: function(e) {
    var that = this
    //发起网络请求
    wx.request({
      url: app.globalData.global_url + 'ding_can_send_sms_code/',
      data: {
        app_id: app.globalData.app_id,
        phone: that.data.phone_input
      },
      success: function(result) {

        if (result.data == "OK") {
          that.setData({
            send_sms_code_hidden: true
          });
        } else if (result.data == "isv.MOBILE_NUMBER_ILLEGAL") {
          that.setData({
            modal_tittle: "不合法的手机号"
          });
        } else if (result.data == "isv.SMS_SIGNATURE_ILLEGAL") {
          that.setData({
            modal_tittle: "短信签名不合法"
          });
        } else {
          that.setData({
            modal_tittle: result.data
          });
        }
        console.log('request success', result)
      }
    })
  },
  onLoad: function(options) {
    // Do something when page ready.
    // var that = this;
    // var a = wx.getAccountInfoSync();
    // console.log(a);
    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: app.globalData.global_url + 'ding_can_get_home_data/',
    //         data: {
    //           code: res.code,
    //         },
    //         success: function(result) {
    //           if (result.data.描述 == "下载成功") {
    //             that.setData({
    //               app_tittle: result.data.主页标题,
    //               app_des: result.data.主页描述,
    //               app_code_des: result.data.验证码标题,
    //               app_code: result.data.验证码描述,
    //               list: result.data.主界内容,
    //             });
    //           }
    //           else {
    //             that.setData({
    //               app_des: result.data.描述
    //             })
    //           }
    //           console.log('request success', result)
    //         }
    //       })
    //     } else {
    //       that.setData({
    //         showTopTips_fail_txt: res.errMsg,
    //         showTopTips_fail: true,
    //       });
    //       setTimeout(function() {
    //         that.setData({
    //           showTopTips_fail: false
    //         });
    //       }, 3000);
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  },
  kindToggle: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

});