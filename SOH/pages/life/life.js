// pages/quest/ques.js
//index.js
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
      { name: 'q_tp05_1_A', value: '喜欢' },
      { name: 'q_tp05_1_B', value: '偶尔' },
      { name: 'q_tp05_1_C', value: '不喜欢' },
    ],
    items11: [
      { name: 'q_tp05_10_A', value: '经常幻想，梦想自己彩票中奖' },
      { name: 'q_tp05_10_B', value: '偶尔幻想，但清楚的知道不可能实现' },
      { name: 'q_tp05_10_C', value: '从不幻想，因为这是虚幻没可能实现的' },
    ],
    items3: [
      { name: 'q_tp05_2_A', value: '经常' },
      { name: 'q_tp05_2_B', value: '偶尔' },
      { name: 'q_tp05_2_C', value: '不戴' },
    ],
    items4: [
      { name: 'q_tp05_3_A', value: '能' },
      { name: 'q_tp05_3_B', value: '可以说出一点' },
      { name: 'q_tp05_3_C', value: '不能' },
    ],
    items5: [
      { name: 'q_tp05_4_A', value: '一件都没有' },
      { name: 'q_tp05_4_B', value: '一件或者两件' },
      { name: 'q_tp05_4_C', value: '两件以上' },
    ],
    items6: [
      { name: 'q_tp05_5_A', value: '时尚杂志' },
      { name: 'q_tp05_5_B', value: '媒体或网络' },
      { name: 'q_tp05_5_C', value: '几乎不看' },
    ],
    items7: [
      { name: 'q_tp05_6_A', value: '经常报告' },
      { name: 'q_tp05_6_B', value: '佛系报告' },
      { name: 'q_tp05_6_C', value: '不喜欢报告' },
    ],
    items8: [
      { name: 'q_tp05_7_A', value: '每天' },
      { name: 'q_tp05_7_B', value: '一周三次' },
      { name: 'q_tp05_7_C', value: '一周少于三次' },
    ],
    items9: [
      { name: 'q_tp05_8_A', value: '朋友组织' },
      { name: 'q_tp05_8_B', value: '自己组织' },
      { name: 'q_tp05_8_C', value: '其他形式' },
    ],
    items10: [
      { name: 'q_tp05_9_A', value: '看起来老实又内向' },
      { name: 'q_tp05_9_B', value: '看起来肌肉有力量' },
      { name: 'q_tp05_9_C', value: '看起来时尚又会玩' },
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
      url: 'http://test.com:8080/test/quesServlet',
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
