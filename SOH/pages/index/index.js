//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //声明click1事件相关数组
    array: [],
    arry_now: [],
    //声明click2事件相关数组
    arrays: [],
    arry_nows: [],
    //声明图像的实际大小和显示大小变量
    //screenWidth: 0,
    screenHeight: 0,
    imgwidth: 0,
    imgheight: 0,
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.getData();
    //定义临时变量-this,保存上级对象
    var _this = this;
    //利用getSystemInfo获取系统信息，用于图像显示
    wx.getSystemInfo({
      //success表示成功调用
      success: function (res) {
        //setData函数用于将js中作出的修改刷新到页面上
        _this.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      }
    });
  },

  getData: function () {
    var that = this;
    //定义两个数组data和data1，用于存储话题
    var data = [
      {
        id: "tp01",
        mag: "学习"
      },
      {
        id: "tp02",
        mag: "工作"
      },
      {
        id: "tp03",
        mag: "艺术"
      }
    ]
    var data1 = [
      {
        id: "tp04",
        mag: "休闲"
      },
      {
        id: "tp05",
        mag: "生活"
      },
    ]
    //定义两个数组变量，用来表示选中状态
    var arry_now1 = [];
    var arry_now1s = [];

    //为数组array和数组arrays赋值
    this.setData({
      array: data,
      arrays: data1,
    })

    //为数组arry_now1和arry_now1s赋初值为0，表示该话题未被选中
    for (var i = 0; i < this.data.array.length; i++) {
      arry_now1.push(0);
    }
    for (var i = 0; i < this.data.arrays.length; i++) {
      arry_now1s.push(0);
    }

    //为数组arry_now和arry_nows赋值，用于在控制台输出相关信息
    this.setData({
      arry_now: arry_now1,
      arry_nows: arry_now1s
    })
  },

  //click1函数
  click1: function (e) {
    var that = this;
    var chooseId="";
    //定义变量idx和idx_s，用于获取所点击话题所绑定的数据
    var idx = e.currentTarget.dataset.idx,
      idx_s = e.currentTarget.dataset.idx_s;
    var id="";
    for (var i = 0; i < this.data.arry_now.length; i++) {
      //为了保证用户一次只能选择一个话题，将arry_nows的状态置为0
      this.data.arry_nows[i] = 0;
      //判断用户选定的话题，将选定的状态改为1
      if (idx_s == i) {
        this.data.arry_now[i] = "tp0" + (i + 1);
        chooseId = "tp0" + (i + 1);
      } else {
        this.data.arry_now[i] = 0;
      }
    }
    wx.navigateTo({
      url: '../publish/publish?tid='+chooseId,
    })
   
    //在控制台打印数据
    console.log("click1");
    console.log(this.data.arry_now);
    this.setData(this.data)

  },

  click2: function (e) {
    var that = this;
    var chooseId = "";
    //定义变量idx和idx_s，用于获取所点击话题所绑定的数据
    var idx = e.currentTarget.dataset.idx,
      idx_s = e.currentTarget.dataset.idx_s;

    for (var i = 0; i < this.data.arry_nows.length; i++) {
      //为了保证用户一次只能选择一个话题，将arry_nows的状态置为0
      this.data.arry_now[i] = 0;
      //判断用户选定的话题，将选定的状态改为1
      if (idx_s == i) {
        this.data.arry_nows[i] = "tp0" + (i + 4);
        chooseId = "tp0" + (i + 1);
      } else {
        this.data.arry_nows[i] = 0;
      }
    }
    wx.navigateTo({
      url: '../publish/publish?tid=' + chooseId,
    })
    //在控制台打印数据
    console.log("click2")
    console.log(this.data.arry_nows)
    this.setData(this.data)

  },
  imageLoad: function (e) {
    var _this = this;
    var $width = e.detail.width,  //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;  //图片的真实宽高比例
    var viewWidth = 750,      //设置图片显示宽度，
      viewHeight = 600 / ratio;  //计算的高度值
    this.setData({
      imgwidth: viewWidth,
      imgheight: viewHeight
    })
  }
})
