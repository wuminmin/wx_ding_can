// example/cai_ji/cai_ji.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bindMenPaiHao_id: '',
    modal_tittle: "修改基本信息",
    hiddenmodalput: true,
    phone_input: '',
    phone_placeholder_val: '请输入场所名称',
    sms_code_input: '',
    sms_code_placeholder_val: '请输入建筑物名称',

    name: '',
    page_name: '',
    page_desc: '',
    src: '',
    tu_pian_list: [],
    showTopTips: false,
    showTopTips_fail: false,
    showTopTips_fail_txt: '',
    date: "2016-09-01",
    time: "12:01",
    countries: [],
    countryIndex: 0,
    countries2: [],
    countryIndex2: 0,
    countries3: [],
    countryIndex3: 0,

    can_kao_jing_du: '',
    can_kao_wei_du: '',
    chang_suo_lou_yu_zong_dong_shu: '',
    xian_chang_jing_du: '',
    xian_chang_wei_du: '',
    lou_yu_ceng_shu: '',
    di_xia_shi_ceng_shu: '',
    dian_ti_shu_liang: '',
    dx_xia_zai: '',
    dx_shang_chuang: '',
    yd_xia_zai: '',
    yd_shang_chuang: '',
    shi_fou_you_di_xia_ting_cha_chang: false,
    shi_fou_you_yi_wang_shi_feng: false,
    shi_fou_you_yi_kan_cha: false,
    isAgree: false
  },
  phone_input_bindinput: function (e) {
    this.setData({
      phone_input: e.detail.value
    });
    console.log(this.data.phone_input)
  },
  sms_code_input_bindinput: function (e) {
    this.setData({
      sms_code_input: e.detail.value
    });
    console.log(this.data.sms_code_input)
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput: function (e) {
    console.log(e.detail.value)
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      phone_input: this.data.countries[this.data.countryIndex],
      sms_code_input: this.data.countries3[this.data.countryIndex3],
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function (e) {
    var that = this
    //发起网络请求
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'chou_jiang_xiu_gai_ji_ban_xin_xi/',
            data: {
              code: res.code,
              chang_suo_ming_cheng: that.data.phone_input,
              jian_zhu_wu_id: that.data.countries2[that.data.countryIndex3],
              jian_zhu_wu_ming_cheng: that.data.sms_code_input
            },
            success: function (result) {
              if (result.data.描述 == "成功") {
                that.setData({
                  hiddenmodalput: true
                })
              } else {
                that.setData({
                  modal_tittle: result.data.描述
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
  huo_qu_jing_wei_du() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        that.setData({
          xian_chang_jing_du: longitude,
          xian_chang_wei_du: latitude
        });
      }
    })
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        });
        console.log(this.data.src);
      }
    })
  },
  takePhoto2() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          src: res.tempFilePaths[0],
          tu_pian_list: res.tempFilePaths
        });
        console.log(that.data.src);
        console.log(that.data.tu_pian_list);
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryIndex: e.detail.value
    });

  },
  bindCountryChange2: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryIndex3: e.detail.value
    });
  },
  bindCountryChange3: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryIndex3: e.detail.value
    });
  },
  bindCountryChange4: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      chang_suo_lou_yu_zong_dong_shu: e.detail.value
    })
  },
  bindCountryChange5: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      xian_chang_jing_du: e.detail.value
    })
  },
  bindCountryChange6: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      xian_chang_wei_du: e.detail.value
    })
  },
  bindCountryChange7: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      lou_yu_ceng_shu: e.detail.value
    })
  },
  bindCountryChange8: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      di_xia_shi_ceng_shu: e.detail.value
    })
  },
  bindCountryChange9: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      dian_ti_shu_liang: e.detail.value
    })
  },
  bindCountryChange10: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      dx_xia_zai: e.detail.value
    })
  },
  bindCountryChange11: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      dx_shang_chuang: e.detail.value
    })
  },
  bindCountryChange12: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      yd_xia_zai: e.detail.value
    })
  },
  bindCountryChange13: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      yd_shang_chuang: e.detail.value
    })
  },
  bindCountryChange14: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      shi_fou_you_di_xia_ting_cha_chang: e.detail.value
    })
  },
  bindCountryChange15: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      shi_fou_you_yi_wang_shi_feng: e.detail.value
    })
  },
  bindCountryChange16: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      shi_fou_you_yi_kan_cha: e.detail.value
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
      // var jian_zhu_wu_id_list = that.data.countries2;
      // var jian_zhu_wu_id_index = that.data.countryIndex3;
      var chang_suo_ming_cheng_val = that.data.countries[that.data.countryIndex];
      var jian_zhu_wu_id_val = that.data.countries2[that.data.countryIndex3];
      var jian_zhu_wu_ming_cheng_val = that.data.countries3[that.data.countryIndex3];
      //发起网络请求
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: app.globalData.global_url + 'chou_jiang_shang_chuang_jie_guo/',
              data: {
                code: res.code,
                jian_zhu_wi_id: jian_zhu_wu_id_val,
                chang_suo_lou_yu_zong_dong_shu: that.data.chang_suo_lou_yu_zong_dong_shu,
                xian_chang_jing_du: that.data.xian_chang_jing_du,
                xian_chang_wei_du: that.data.xian_chang_wei_du,
                lou_yu_ceng_shu: that.data.lou_yu_ceng_shu,
                di_xia_shi_ceng_shu: that.data.di_xia_shi_ceng_shu,
                dian_ti_shu_liang: that.data.dian_ti_shu_liang,
                dx_xia_zai: that.data.dx_xia_zai,
                dx_shang_chuang: that.data.dx_shang_chuang,
                yd_xia_zai: that.data.yd_xia_zai,
                yd_shang_chuang: that.data.yd_shang_chuang,
                shi_fou_you_di_xia_ting_cha_chang: that.data.shi_fou_you_di_xia_ting_cha_chang,
                shi_fou_you_yi_wang_shi_feng: that.data.shi_fou_you_yi_wang_shi_feng,
                shi_fou_you_yi_kan_cha: that.data.shi_fou_you_yi_kan_cha,
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
            });

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
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.uploadFile({
              url: app.globalData.global_url + 'chou_jiang_shang_chuang_tu_pian/',
              filePath: that.data.tu_pian_list[0],
              name: 'file',
              formData: {
                code: res.code,
                chang_suo_ming_cheng: chang_suo_ming_cheng_val,
                jian_zhu_wu_id: jian_zhu_wu_id_val,
                jian_zhu_wu_ming_cheng: jian_zhu_wu_ming_cheng_val
              },
              success(res) {
                const data = res.data
                // do something
              }
            });
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.bindMenPaiHao_id)
    console.log(options.name)
    console.log(options.page_name)
    console.log(options.page_desc)
    var bindMenPaiHao_id = options.bindMenPaiHao_id;
    that.setData({
      bindMenPaiHao_id: bindMenPaiHao_id
    });
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'ding_can_cai_ji_init/',
            data: {
              code: res.code,
              bindMenPaiHao_id: bindMenPaiHao_id,
            },
            success: function (result) {
              if (result.data.描述 == "成功") {
                that.setData({
                  countries: result.data.countries,
                  countries2: result.data.countries2,
                  countries3: result.data.countries3,
                  src: app.globalData.global_url + 'chou_jiang_xia_zai_tu_pian?bindMenPaiHao_id=' + bindMenPaiHao_id,
                  chang_suo_lou_yu_zong_dong_shu: result.data.chang_suo_lou_yu_zong_dong_shu,
                  xian_chang_jing_du: result.data.xian_chang_jing_du,
                  xian_chang_wei_du: result.data.xian_chang_wei_du,
                  lou_yu_ceng_shu: result.data.lou_yu_ceng_shu,
                  di_xia_shi_ceng_shu: result.data.di_xia_shi_ceng_shu,
                  dian_ti_shu_liang: result.data.dian_ti_shu_liang,
                  dx_xia_zai: result.data.dx_xia_zai,
                  dx_shang_chuang: result.data.dx_shang_chuang,
                  yd_xia_zai: result.data.yd_xia_zai,
                  yd_shang_chuang: result.data.yd_shang_chuang,
                  shi_fou_you_di_xia_ting_cha_chang: result.data.shi_fou_you_di_xia_ting_cha_chang,
                  shi_fou_you_yi_wang_shi_feng: result.data.shi_fou_you_yi_wang_shi_feng,
                  shi_fou_you_yi_kan_cha: result.data.shi_fou_you_yi_kan_cha,
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

    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: app.globalData.global_url + 'chou_jiang_jian_zhu_wu_ming_cheng/',
    //         data: {
    //           code: res.code,
    //           countries_val: that.data.countries[that.data.countryIndex],
    //           jian_zhu_wu_id_val: that.data.countries2[that.data.countryIndex3]
    //         },
    //         success: function (result) {
    //           console.log(result);
    //           if (result.data.描述 == "成功") {
    //             that.setData({
    //               countries2: result.data.countries2,
    //               countries3: result.data.countries3,
    //             });
    //           } else {
    //           }
    //           console.log('request success', result)
    //         }
    //       })
    //     } else {
    //       that.setData({
    //         showTopTips_fail_txt: res.errMsg,
    //         showTopTips_fail: true,
    //       });
    //       setTimeout(function () {
    //         that.setData({
    //           showTopTips_fail: false
    //         });
    //       }, 3000);
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
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