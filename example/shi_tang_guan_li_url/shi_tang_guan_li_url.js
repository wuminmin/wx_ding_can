var app = getApp()
Page({
  data: {
    name:'',
    page_name:'',
    page_desc: '',
    app_tittle: '',
    app_des: '',
    app_code_des: '',
    app_code: '',
    date: "",
    start_date: "",
    end_date: "",
    list: [],
    // list: [{
    //     id: '1',
    //     name: '客户支撑中心',
    //   num: '3',
    //     open: false,
    //     pages: [{
    //         'page_name': '张卫国',
    //         'page_desc':'没吃',
    //       },
    //       {
    //         'page_name': '桂冠玉',
    //         'page_desc': '吃过',
    //       },
    //       {
    //         'page_name': '陈涛',
    //         'page_desc': '吃过',
    //       },
    //     ]
    //   },
    //   {
    //     id: '2',
    //     name: '无线中心',
    //     num: '1',
    //     open: false,
    //     pages: [
    //       {
    //       'page_name': '吴敏民',
    //       'page_desc': '吃过',
    //     },
    //     ],
    //   },
    //   {
    //     id: '3',
    //     name: '政策宣传',
    //     num: '0',
    //     open: false,
    //     pages: [{
    //       'page_name': '功能开发中',
    //       'page_desc': '敬请期待',
    //     },],
    //   },
    //   {
    //     id: '4',
    //     name: '用户预约',
    //     num: '0',
    //     open: false,
    //     pages: [       {
    //       'page_name': '功能开发中',
    //       'page_desc': '敬请期待',
    //     },],
    //   },
    // ]
  },
  onLoad: function (options) {
    // Do something when page ready.
    var that = this;
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
            url: app.globalData.global_url + 'ding_can_tong_ji_zhong_can/',
            data: {
              code: res.code,
              date:that.data.date,
              name: options.name,
              page_name: options.page_name,
              page_desc: options.page_desc,
            },
            success: function (result) {
              if (result.data.描述 == "下载成功") {
                that.setData({
                  app_tittle: result.data.app_tittle,
                  app_des: result.data.app_des,
                  app_code_des: result.data.app_code_des,
                  app_code: result.data.app_code,
                  date: result.data.date,
                  start_date: result.data.start_date,
                  end_date: result.data.end_date,
                  list: result.data.list,
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    });
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.global_url + 'ding_can_tong_ji_zhong_can/',
            data: {
              code: res.code,
              date: that.data.date,
              name: that.data.name,
              page_name: that.data.page_name,
              page_desc: that.data.page_desc,
            },
            success: function (result) {
              if (result.data.描述 == "下载成功") {
                that.setData({
                  app_tittle: result.data.app_tittle,
                  app_des: result.data.app_des,
                  app_code_des: result.data.app_code_des,
                  app_code: result.data.app_code,
                  start_date: result.data.start_date,
                  end_date: result.data.end_date,
                  list: result.data.list,
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
    });

  },
  kindToggle: function (e) {
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