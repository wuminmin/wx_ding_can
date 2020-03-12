// pages/index/index.js
const app = getApp()
var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;
Page({
  data: {
    text: '123456',
    image: '',
    name: '',
    page_name: '',
    page_desc: '',
    clearTimeout_id: '',
    flag: true,

    ding_can_res_list: [],

    showTopTips_normal: false,
    showTopTips_normal_txt: '',
    showTopTips_fail: false,
    showTopTips_fail_txt: '',

    hiddenmodalput: true,
    modal_tittle: '',

    date: "",
    start_date: "",
    end_date: "",
    time: "12:01",


    xing_ming: '',
    shou_ji_hao: '',
    er_ji_bu_men: '',
    san_ji_bu_men: '',
    si_ji_bu_men: '',
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
            url: app.globalData.global_url + 'get_ding_dan',
            data: {
              app_id: app.globalData.app_id,
              code: res.code,
              date: e.detail.value,
              name: that.data.name,
              page_name: that.data.page_name,
              page_desc: that.data.page_desc,
            },
            success: function(result) {
              if (result.data.描述 == "成功") {
                that.setData({
                  ding_can_res_list: result.data.数据,
                  showTopTips_normal_txt: result.data.描述,
                  showTopTips_normal: true,
                });
                setTimeout(function() {
                  that.setData({
                    showTopTips_normal: false
                  });
                }, 3000);
              } else {
                that.setData({
                  showTopTips_fail_txt: result.data.描述,
                  showTopTips_fail: true,
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearTimeout(this.data.clearTimeout_id);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearTimeout(this.data.clearTimeout_id);
  },

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
            url: app.globalData.global_url + 'get_ding_dan',
            data: {
              app_id: app.globalData.app_id,
              code: res.code,
              date: that.data.date,
              name: options.name,
              page_name: options.page_name,
              page_desc: options.page_desc,
            },
            success: function(result) {
              if (result.data.描述 == "成功") {
                that.setData({
                  ding_can_res_list: result.data.数据,
                  showTopTips_normal_txt: result.data.描述,
                  showTopTips_normal: true,
                });
                setTimeout(function() {
                  that.setData({
                    showTopTips_normal: false
                  });
                }, 3000);
              } else {
                that.setData({
                  showTopTips_fail_txt: result.data.描述,
                  showTopTips_fail: true,
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

  cancel: function(e) {
    this.setData({
      hiddenmodalput: true
    });
  },

  confirm: function(e) {
    this.setData({
      hiddenmodalput: true
    });
  },

  show_code: function(e) {
    var that = this;
    console.log(e.target.dataset.number);
    if (e.target.dataset.number==0){
      that.setData({
        showTopTips_normal_txt: '数量为0，不可核销',
        showTopTips_normal: true,
      });
      setTimeout(function () {
        that.setData({
          showTopTips_normal: false
        });
      }, 3000);
    }else{
      that.setData({
        hiddenmodalput: false,
        modal_tittle: e.target.dataset.name
      });
      console.log(e.target.dataset.name);
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            var text = JSON.stringify({
              name: e.target.dataset.name,
              oid: e.target.dataset.oid,
              code: res.code,
              date: that.data.date
            })
            qrcode = new QRCode('canvas', {
              text: text,
              image: '/example/images/icon_nav_dingcan.png',
              width: 150,
              height: 150,
              colorDark: "#1CA4FC",
              colorLight: "white",
              correctLevel: QRCode.CorrectLevel.H,
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
      })
    }
  },

  tapHandler: function() {
    // 传入字符串生成qrcode
    console.log(this.data.text)
    qrcode.makeCode(this.data.text)
  },

})