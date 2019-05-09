const app = getApp()
let goodsList = [
  { actEndTime: '2018-11-30 10:00:43' },
]
Page({
  data: {
    hiddenmodalput: false,
    modal_tittle:'是否准备考试',

    countDownList: [],
    actEndTimeList: [],
    kao_shi_da_lei: '',
    kao_shi_xiao_lei: '',
    kao_shi_miao_shu: '',
    kao_shi_shi_chang:'',
    kao_shi_dao_ji_shi:'0',
    kao_shi_jie_su_shi_jian: '0',
    ti_mu_zong_shu:0,
    zheng_que_ti_mu:0,
    showTopTips: false,
    showTopTips_normal: false,
    showTopTips_normal_txt: '',
    showTopTips_fail: false,
    showTopTips_fail_txt: '',
    radioItems_list:[],
    isAgree: false
  },

  onLoad: function (options) {
    console.log(options.page_name)
    console.log(options.page_desc)
    this.setData({
      kao_shi_da_lei: options.page_name,
      kao_shi_xiao_lei: options.page_desc
      })
  },
  dao_ji_shi: function (seconds) {
    second = seconds -1;
    this.setData({
      kao_shi_dao_ji_shi: second
    });
  },
  cancel: function () {
    wx.navigateTo({
      url: '../home'
    })
  },
  confirm: function (options) {

    let endTimeList = [];
    // 将活动的结束时间参数提成一个单独的数组，方便操作
    goodsList.forEach(o => { endTimeList.push(o.actEndTime) })
    // Do something when page ready.
    var that = this;
    console.log(that.data.kao_shi_da_lei)
    console.log(that.data.kao_shi_xiao_lei)

    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url +'get_page_data/',
            data: {
              code: res.code,
              kao_shi_da_lei: that.data.kao_shi_da_lei,
              kao_shi_xiao_lei: that.data.kao_shi_xiao_lei,
            },
            success: function (result) {
              if (result.data.描述 == "下载成功") {
                that.setData({
                  kao_shi_da_lei: result.data.考试大类,
                  kao_shi_xiao_lei: result.data.考试小类,
                  kao_shi_miao_shu: '考试进行中',
                  kao_shi_jie_su_shi_jian: result.data.考试结束时间,
                  kao_shi_shi_chang: result.data.考试时长,
                  radioItems_list: result.data.试卷内容,
                  ti_mu_zong_shu: result.data.题目总数,
                  zheng_que_ti_mu: result.data.正确题数,
                  hiddenmodalput:true
                });
                that.countDown();
              } else if (result.data.描述 == "考试未开始") {
                that.setData({
                  modal_tittle: result.data.描述,
                  kao_shi_da_lei: result.data.考试大类,
                  kao_shi_xiao_lei: result.data.考试小类,
                  kao_shi_miao_shu: result.data.描述,
                  kao_shi_jie_su_shi_jian: result.data.考试结束时间,
                  ti_mu_zong_shu: result.data.题目总数,
                  zheng_que_ti_mu: result.data.正确题数,
                });
              } else if (result.data.描述 == "考试已结束") {
                that.setData({
                  modal_tittle: result.data.描述,
                  kao_shi_da_lei: result.data.考试大类,
                  kao_shi_xiao_lei: result.data.考试小类,
                  kao_shi_miao_shu: result.data.描述,
                  kao_shi_jie_su_shi_jian: result.data.考试结束时间,
                  ti_mu_zong_shu: result.data.题目总数,
                  zheng_que_ti_mu: result.data.正确题数,
                });
              } else {
                that.setData({
                  modal_tittle: result.data.描述,
                });
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
  showTopTips: function() {
    var that = this;
    if (this.data.isAgree == false) {
      that.setData({
        showTopTips: true
      });
      setTimeout(function() {
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
              url: app.globalData.global_url +'send_page_data/',
              data: {
                code: res.code,
                kao_shi_da_lei: that.data.kao_shi_da_lei,
                kao_shi_xiao_lei: that.data.kao_shi_xiao_lei,
                radioItems_list: that.data.radioItems_list
              },
              success: function(result) {
                if (result.data.描述 == "交卷成功") {
                  that.setData({
                    showTopTips_normal_txt: result.data.描述,
                    showTopTips_normal: true,
                    kao_shi_miao_shu: '交卷成功',
                    ti_mu_zong_shu: result.data.题目总数,
                    zheng_que_ti_mu: result.data.正确题数,
                    kao_shi_jie_su_shi_jian:'0',
                    radioItems_list:[],
                    countDownList:[],
               
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
    }
  },
  radioItems_radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var e_detail_value = e.detail.value;
    var radioItems_list = this.data.radioItems_list;
    var j = 0;
    if (e_detail_value <= 4) {
      j = '0';
    } else {
      if (e_detail_value % 4 == 0) {
        j = parseInt(e_detail_value / 4) - 1
      } else {
        j = parseInt(e_detail_value / 4)
      }
      console.log('j = e_detail_value % 4值为：', j);
    }
    for (var i = 0, leni = radioItems_list[j].radioItems.length; i < leni; ++i) {
      console.log(i)
      radioItems_list[j].radioItems[i].checked = radioItems_list[j].radioItems[i].value == e.detail.value;
      console.log(radioItems_list[j].radioItems[i].checked)
    }
    this.setData({
      radioItems_list: radioItems_list
    });
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems
    });
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
    console.log(this.data.isAgree)
  },
  timeFormat(param){//小于10的格式化函数
    return param < 10 ? '0' + param : param; 
  },
  countDown(){//倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    // let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];
    let o = this.data.kao_shi_jie_su_shi_jian;
    console.log(o);
    // 对结束时间进行处理渲染到页面
    // endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0){
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      }else{//活动已结束，全部设置为'00'
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      countDownArr.push(obj);
    // })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({ countDownList: countDownArr})
    setTimeout(this.countDown,1000);
  }

});