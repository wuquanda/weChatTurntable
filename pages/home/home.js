// pages/home/home.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //右下角的浮动按钮
    fabButtonArr:[
    {
      "icon":"/icon/plus-circle.png",
      label:"添加",
      disable:false
    },
    {
      "icon":"/icon/edit-square.png",
      label:"编辑",
      diable:false
    }
    ],

    //轮盘标签方案的左滑按钮
    swiperButtonSelect: [
    {
      text: '编辑',
      color: '#ffffff',
      background: '#28a745',
      disabled: false,
      size: '14px',
      type: 'edit',
    },
    {
      text: '删除',
      color: '#ffffff',
      background: '#e42112',
      disabled: false,
      size: '14px',
      type: 'delete',
    },
    ],

    wheelArray:{}, //用户的轮盘标签方案数组
    wheelConfig:{},//当前轮盘显示的标签方案
    optionName:'', //当前轮盘显示的标签方案名称

    //默认的轮盘标签方案，仅在用户删除了所有的标签方案后显示
    defaultWheelConfig:{
      optionName:"遇事不决转一下？",
      awards:[
        {
          name:"好",
          color:"black"
        },
        {
          name:"不好",
          color:"white"
        }
      ]
    }
  },

  /*
   *标签方案左滑功能删除：全局变量app.globalData.wheelArray保存用户数据，点击指定标签传入该标签在数组中的下标
   *删除后，更新本地缓存
   */
  delete:function (e){
    var that=this
    app.globalData.wheelArray.splice(e.currentTarget.dataset.index,1);
    this.setData({
      wheelArray:app.globalData.wheelArray
    })
    wx.setStorage({
      key: 'wheelArray',
      data: app.globalData.wheelArray,
    })
    that.setWheelData()
  },
  
  edit:function (e){
    wx.navigateTo({
      url: '/pages/edit/edit?index=' + e.currentTarget.dataset.index,
    })
  },

  //点击标签，在轮盘显示上显示
  add:function(e){
    this.setWheelData(e.currentTarget.dataset.index)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.wheelComponent = this.selectComponent("#wheelComponent"),
    this.setData({
      wheelArray:app.globalData.wheelArray
    })
    this.setWheelData();
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
    var that = this;
      this.setData({
        wheelArray: app.globalData.wheelArray
      })
    this.setData({
      wheelArray: app.globalData.wheelArray
    })
    this.setWheelData();
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
  mytest: function(){
   wx.navigateTo({
     url: '/pages/setting/setting',
   })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleBtnClick(e) {
    const { onPress } = e.detail;
    onPress.call(this);
  },

  //设置生成显示标签方案并且设置轮盘内容,当wheelArray为null时，显示默认方案
  setWheelData(index){
    var index=index||0
    if (this.data.wheelArray.length == 0) {
      this.wheelComponent.switchZhuanpan(this.data.defaultWheelConfig)
      this.setData({
        optionName: this.data.defaultWheelConfig.optionName
      })
    } else {
      this.wheelComponent.switchZhuanpan(this.data.wheelArray[index])
      this.setData({
        optionName: this.data.wheelArray[index].optionName
      })
    }
  }
})