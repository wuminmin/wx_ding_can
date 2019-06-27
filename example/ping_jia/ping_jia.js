// example/ping_jia/ping_jia.js
const app = getApp()
const fs = wx.getFileSystemManager()
const image404 = '../images/404.png'
// const image404 = 'example/images/404.png'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: image404,
    tu_pian_list: [],
    showTopTips: false,
    showTopTips_fail: false,
    showTopTips_normal_txt: '',
    showTopTips_fail_txt: '',
    ping_jia_list: [],
    ping_jia_txt: '',

  },

  bindChange1: function(e) {
    console.log(e)
    this.setData({
      ping_jia_txt: e.detail.value
    });
    console.log(this.data.ping_jia_txt)
  },

  takePhoto() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
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

  showTopTips: function() {
    var that = this;
    //发起网络请求

    wx.login({
      success(res) {
        if (res.code) {
          wx.uploadFile({
            url: app.globalData.global_url + 'ding_can_upload_ping_jia/',
            filePath: that.data.src,
            name: 'file',
            formData: {
              code: res.code,
              ping_jia_txt: that.data.ping_jia_txt,
            },
            success: function(result) {
              if (result.data == "上传图片成功") {
                that.setData({
                  showTopTips_normal_txt: result.data,
                  showTopTips_normal: true,
                });
                setTimeout(function() {
                  that.setData({
                    showTopTips_normal: false
                  });
                }, 3000);
              } else {
                that.setData({
                  showTopTips_fail_txt: result.data,
                  showTopTips_fail: true,
                });
                setTimeout(function() {
                  that.setData({
                    showTopTips_fail: false
                  });
                }, 3000);
              }
              console.log('request success', result)
            },
            fail:function(res){

              wx.login({
                success(res) {
                  if (res.code) {
                    //发起网络请求
                    wx.request({
                      url: app.globalData.global_url + 'ding_can_upload_ping_jia/',
                      data: {
                        code: res.code,
                        ping_jia_txt: that.data.ping_jia_txt,
                      },
                      success: function (result) {
                        if (result.data == "成功") {
                          that.setData({
                            showTopTips_normal_txt: result.data,
                            showTopTips_normal: true,
                          });
                          setTimeout(function () {
                            that.setData({
                              showTopTips_normal: false
                            });
                          }, 3000);
                        } else {
                          that.setData({
                            showTopTips_fail_txt: result.data,
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

            }

          });
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    // that.setData({
    //   src: image404,
    // });

    // fs.getFileInfo({
    //   filePath: 'example/images/404.png',
    //   success: function(res) {
    //     console.log(res)
    //     that.setData({
    //       src: image404,
    //     });
    //   },
    //   fail: function(res) {
    //     console.log(res.errMsg)
    //   }
    // });

    // console.log(options.bindMenPaiHao_id)
    // console.log(options.name)
    // console.log(options.page_name)
    // console.log(options.page_desc)
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'ding_can_ping_jia_init/',
            data: {
              code: res.code,
            },
            success: function(result) {

              if (result.data.描述 == "成功") {
                that.setData({
                  ping_jia_list: result.data.ping_jia_list,
                });
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
                console.log('登录失败！' + res.errMsg)
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