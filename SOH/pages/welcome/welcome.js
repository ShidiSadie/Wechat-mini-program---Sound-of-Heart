// pages/windows/windows.js
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgs: [
      "images/welcome.png",

    ],
  },

  start() {
    wx.switchTab({ url: '../index/index' })
  },
})