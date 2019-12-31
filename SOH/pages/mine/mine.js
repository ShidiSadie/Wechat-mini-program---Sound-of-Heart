// pages/mine/mine.js
const app = getApp()
Page({
  data: {
    text: 'init data',
    num: 0,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    objectArray:null,
    //name:'popcandy',
    info:{},
    signature:'Im fine now'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var self=this;
    wx.request({
      url: 'http://localhost:8080/test/WXServlet',
      data: {
        Id: '001',
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data);
        self.setData({
          objectArray: res.data
        })
        /*objectArray: JSON.parse(res.data)*/
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
   
    wx.request({
      url: 'http://localhost:8080/test/uinfoServlet',
      data: {
        Id: '001',
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data);
        self.setData({
          info: res.data
        })
        /*objectArray: JSON.parse(res.data)*/
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },

  gotoFans:function() {
    wx.navigateTo({
      url: '../fans/fans',
    })
  },
  gotoFollow: function () {
    wx.navigateTo({
      url: '../follow/follow',
    })
  },
  gotoReport: function () {
    wx.navigateTo({
      url: '../report/report',
    })
  },
  gotoSetting: function () {
    wx.navigateTo({
      url: '../setting/setting',
    })
  },

  gotoExpert: function () {
    wx.navigateTo({
      url: '../expert/expert',
    })
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