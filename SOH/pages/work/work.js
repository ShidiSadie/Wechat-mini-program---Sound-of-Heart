// pages/quests/quests.js
// pages/quest/quest.js
// pages/quest/ques.js
//获取应用实例
const app = getApp()

Page({
  data: {

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    items: [
      { name: 'q_tp02_1_A', value: '有' },
      { name: 'q_tp02_1_B', value: '没有' },
    ],
    items2: [
      { name: 'q_tp02_2_A', value: '每天完成既定的工作就满意了' },
      { name: 'q_tp02_2_B', value: '有自己的喜好，只要是自己喜欢的就会有努力的动力' },
      { name: 'q_tp02_2_C', value: '大致修改下，大概过关就好' },
    ],
    items3: [
      { name: 'q_tp02_3_A', value: '经常会' },
      { name: 'q_tp02_3_B', value: '有时会' },
      { name: 'q_tp02_3_C', value: '基本不会' },
    ],
    items4: [
      { name: 'q_tp02_4_A', value: '喜欢' },
      { name: 'q_tp02_4_B', value: '不喜欢' },
    ],
    items5: [
      { name: 'q_tp02_5_A', value: '完成工作闲着没事时' },
      { name: 'q_tp02_5_B', value: '随便搭把手就能完成时' },
      { name: 'q_tp02_5_C', value: '别人极需要帮助时' },
    ],
    items6: [
      { name: 'q_tp02_6_A', value: '大多数时候都在倾听，整合别人的意见，一般只作一两句发言' },
      { name: 'q_tp02_6_B', value: '怯于与别人争论或者觉得自己的发言没太有必要，基本不发言' },
      { name: 'q_tp02_6_C', value: '用于说出自己的想法，经常发言' },
    ],
    items7: [
      { name: 'q_tp02_7_A', value: '总管者、计划性的工作' },
      { name: 'q_tp02_7_B', value: '核心技术性的工作' },
      { name: 'q_tp02_7_C', value: '实干型的工作' },
    ],
    items8: [
      { name: 'q_tp02_8_A', value: '大家互相讨论' },
      { name: 'q_tp02_8_B', value: '周围的人不一定优秀，但会听从自己指挥' },
      { name: 'q_tp02_8_C', value: '安静的地方心情舒畅地学习' },
    ],
    items9: [
      { name: 'q_tp02_9_A', value: '我的工作是我喜爱的，所以我一定会尽全力认真完成' },
      { name: 'q_tp02_9_B', value: '不管我是不是喜欢这份工作，我都有做好它的责任' },
      { name: 'q_tp02_9_C', value: '作好本职工作自有黄金屋到，所以一定要好好完成' },
    ],
    items10: [
      { name: 'q_tp02_10_A', value: '我的性格做不来领导工作' },
      { name: 'q_tp02_10_B', value: '我很适合做领带人，而且享受做领导人的过程' },
      { name: 'q_tp02_10_C', value: '领导人做事不费力又好处多多，是我的奋斗目标' },
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

