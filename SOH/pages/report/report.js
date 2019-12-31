// pages/report/report.js
Page({
  data: {
    //声明图像的实际大小和显示大小变量
    //screenWidth: 0,
    screenHeight: 0,
    imgwidth: 0,
    imgheight: 0,
    imageName:""
  },

  onLoad: function (options) {
    var self = this;
    wx.request({
      url: 'http://localhost:8080/test/reportServlet',
      data: {
      Id:'001'
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data);
        self.setData({
          imageName: res.data
        })
        /*objectArray: JSON.parse(res.data)*/
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },

  imageLoad: function (e) {
    var _this = this;
    var $width = e.detail.width,  //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;  //图片的真实宽高比例
    var viewWidth = 750,      //设置图片显示宽度，
      viewHeight = 700 / ratio;  //计算的高度值
    this.setData({
      imgwidth: viewWidth,
      imgheight: viewHeight
    })
  }
})