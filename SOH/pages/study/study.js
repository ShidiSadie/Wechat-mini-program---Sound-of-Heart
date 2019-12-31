// pages/quest/quest.js
// pages/quest/ques.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    //定义单选的选项
    items: [
      { name: 'q_tp01_1_A', value: '检查到最后一分钟交卷' },
      { name: 'q_tp01_1_B', value: '做完就交上去' },
      { name: 'q_tp01_1_C', value: '做完随便看一遍，就交上去' },
    ],
    items2: [
      { name: 'q_tp01_2_A', value: '是' },
      { name: 'q_tp01_2_B', value: '不是' },
    ],
    items3: [
      { name: 'q_tp01_3_A', value: '会' },
      { name: 'q_tp01_3_B', value: '不会' },
    ],
    items4: [
      { name: 'q_tp01_4_A', value: '喜欢' },
      { name: 'q_tp01_4_B', value: '不喜欢' },
    ],
    items5: [
      { name: 'q_tp01_5_A', value: '开发多种解法' },
      { name: 'q_tp01_5_B', value: '忠于自己最喜欢的解法' },
    ],
    items6: [
      { name: 'q_tp01_6_A', value: '喜欢' },
      { name: 'q_tp01_6_B', value: '不喜欢' },
    ],
    items7: [
      { name: 'q_tp01_7_A', value: '会' },
      { name: 'q_tp01_7_B', value: '不会' },
    ],
    items8: [
      { name: 'q_tp01_8_A', value: '大家互相讨论' },
      { name: 'q_tp01_8_B', value: '周围的人不一定优秀，但会听从自己指挥' },
      { name: 'q_tp01_8_C', value: '安静的地方心情舒畅地学习' },
    ],
    items9: [
      { name: 'q_tp01_9_A', value: '会' },
      { name: 'q_tp01_9_B', value: '不会' },
    ],
    items10: [
      { name: 'q_tp01_10_A', value: '努力学习' },
      { name: 'q_tp01_10_B', value: '天分' },
    ],
  },


  //单选框选择改变
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //弹出框
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  //弹出确认框
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
  },
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    });
  },
  //弹出提示框
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },
  //更新表单
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    wx.request({
      url: 'http://test.com:8080/gj/quesServlet',
      data: formData,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',
      success: function (res) {
        console.log(e.detail.value);
        console.log(res.data);
        that.modalTap();
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件');
    this.modalTap2();
  }
})
