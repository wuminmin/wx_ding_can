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
    flag:false,

    xing_ming: '',
    shou_ji_hao: '',
    er_ji_bu_men: '',
    san_ji_bu_men: '',
    si_ji_bu_men: '',
  },
  countDown() { //倒计时函数
    var that = this;
    wx.request({
      url: app.globalData.global_url + 'ding_can_xia_zai_he_xiao_ma/',
      data: {
        name: that.data.name,
        page_name: that.data.page_name,
        page_desc: that.data.page_desc,
      },
      success: function(result) {
        if (that.data.text === result.data.核销码) {
          that.setData({
            flag: false,
          });
        } else {
          that.setData({
            flag: true,
          });
        }
        that.setData({
          text: result.data.核销码,
          xing_ming: result.data.姓名,
          shou_ji_hao: result.data.手机号,
          er_ji_bu_men: result.data.二级部门,
          san_ji_bu_men: result.data.三级部门,
          si_ji_bu_men: result.data.四级部门,
        });
        console.log('request success', result.data)
      }
    });
    const innerAudioContext = wx.createInnerAudioContext()
    if(that.data.flag){
      innerAudioContext.autoplay = true
      var param = '?page_name=' + that.data.page_name + '&page_desc=' + that.data.page_desc
      innerAudioContext.src = app.globalData.global_url + 'ding_can_xia_zai_mp3/' + param
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      });
    }

    qrcode.makeCode(that.data.text)
    var clearTimeout_id_value = setTimeout(this.countDown, 1000);
    this.setData({
      clearTimeout_id: clearTimeout_id_value,
    });
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
    console.log(options.name)
    console.log(options.page_name)
    console.log(options.page_desc)
    this.setData({
      name: options.name,
      page_name: options.page_name,
      page_desc: options.page_desc
    });
    qrcode = new QRCode('canvas', {
      text: "https://github.com/tomfriwel/weapp-qrcode",
      image: '/example/images/icon_nav_dingcan.png',
      width: 150,
      height: 150,
      colorDark: "#1CA4FC",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
    this.countDown();
  },
  tapHandler: function() {
    // 传入字符串生成qrcode
    console.log(this.data.text)
    qrcode.makeCode(this.data.text)
  },
})