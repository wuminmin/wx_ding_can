const app = getApp()
// example/sao_ma/sao_ma.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    page_name:'',
    page_desc:'',
    er_wei_ma:'',

    shi_tang_di_zhi:'',
    ding_can_jie_guo:'',

  },
  bindScanCode: function (e) {
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
      fail(e){
        console.log(e);
        that.setData({
          shi_tang_di_zhi: '无效的二维码',
        });
      },
    });
  },
  ding_can_sao_he_xiao_ma:function(){
    var that = this
    //发起网络请求
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'ding_can_sao_he_xiao_ma/',
            data: {
              code: res.code,
              er_wei_ma: that.data.er_wei_ma,
              name: that.data.name,
              page_name: that.data.page_name,
              page_desc: that.data.page_desc,
            },
            success: function (result) {
              console.log(result);
              if (result.data.描述 == '成功'){
                that.setData({
                  shi_tang_di_zhi: result.data.描述,
                  ding_can_jie_guo: result.data.姓名 + result.data.当前日期 + result.data.类型,
                });
              }else{
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.name)
    console.log(options.page_name)
    console.log(options.page_desc)
    that.setData({
      name: options.name,
      page_name: options.page_name,
      page_desc: options.page_desc,
    });
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