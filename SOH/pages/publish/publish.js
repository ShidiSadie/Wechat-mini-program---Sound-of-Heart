// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectArray: null,  
    state: [0, 0, 0, 0, 0, 0],
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    tid:"",
    tagid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var tid_now = options.tid;
    that.setData (
      {
        tid:tid_now
      }
    )
    wx.request({
      url: 'http://localhost:8080/test/tagServlet',
      data: {
        tid: tid_now,
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          objectArray: res.data
        })
        /*objectArray: JSON.parse(res.data)*/
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
    var obj = that.data.objectArray;
    var i;
    var temp = [];
    for (i = 0; i < obj.length; i++)
      temp[i] = 0;
    that.setData(
      {
        state: temp
      }
    )
  },

  onTag: function (e) {
    var that = this;
    var data = [];
    var idx = e.currentTarget.dataset.idx;
    var obj = that.data.objectArray;
    var i;
    for (i = 0; i < obj.length; i++) {
      if (idx == i) {
        data[i] = 1;
        that.setData(
          {
            tagid:i
          }
        )
        console.log(that.data.tagid);
      } else {
        data[i] = 0;
      }
    }
    console.log(data);
    that.setData(
      {
        state: data
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
    var tid=this.data.tid;
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
    if (tid == "tp01") {
      wx.navigateTo({
        url: '../study/study',
      })
    }
    if (tid == "tp02") {
      wx.navigateTo({
        url: '../work/work',
      })
    }
    if (tid == "tp03") {
      wx.navigateTo({
        url: '../art/art',
      })
    }
    if (tid == "tp04") {
      wx.navigateTo({
        url: '../space/space',
      })
    }
    if (tid == "tp05") {
      wx.navigateTo({
        url: '../life/life',
      })
    }
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
      url: 'http://localhost:8080/test/publishServlet',
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