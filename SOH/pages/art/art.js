// pages/question/question.js
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
      { name: 'q_tp03_1_A', value: '我享受艺术创作的过程' },
      { name: 'q_tp03_1_B', value: '我享受完成艺术作品后的成就感' },
    ],
    items2: [
      { name: 'q_tp03_2_A', value: '非常好，但是还具有一定的修改空间' },
      { name: 'q_tp03_2_B', value: '非常完美，不需要任何的修改' },
    ],
    items3: [
      { name: 'q_tp03_3_A', value: '环境安静舒适整洁' },
      { name: 'q_tp03_3_B', value: '任何环境都无法阻挡我的创作热情' },
    ],
    items4: [
      { name: 'q_tp03_4_A', value: '自己的脑洞只能自己完成' },
      { name: 'q_tp03_4_B', value: '和其他人碰撞出更多的艺术火花' },
    ],
    items5: [
      { name: 'q_tp03_5_A', value: '轻音乐' },
      { name: 'q_tp03_5_B', value: '摇滚' },
      { name: 'q_tp03_5_C', value: '交响乐' },
      { name: 'q_tp03_5_D', value: '蒸汽朋克' },
    ],
    items6: [
      { name: 'q_tp03_6_A', value: '有脑洞就会创作，不然灵感会消失' },
      { name: 'q_tp03_6_B', value: '会进行安排与设计' },
    ],
    items7: [
      { name: 'q_tp03_7_A', value: '成为leader，安排团队成员的工作' },
      { name: 'q_tp03_7_B', value: '听从leader的安排，一起完成任务' },
    ],
    items8: [
      { name: 'q_tp03_8_A', value: '新的技术不稳定，不会立即尝试' },
      { name: 'q_tp03_8_B', value: '会去尝试' },
    ],
    items9: [
      { name: 'q_tp03_9_A', value: '不是特别过分的说法，都会佛系对待的' },
      { name: 'q_tp03_9_B', value: '视自己心情而定' },
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
