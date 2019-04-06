// pages/home/home.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fabButtonArr:[
    {
      "icon":"/icon/plus-circle.png",
      label:"添加",
      disable:false
    },
    {
      "icon":"",
      label:"编辑",
      diable:false
    }
    ],

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

    wheelArray:{},
    wheelConfig:{},
    optionName:'',
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

  add:function(e){
    this.setWheelData(e.currentTarget.dataset.index)
    console.log("wuquanda")
    
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
   /* if(that.data.wheelArray.length==0){
      this.wheelComponent.switchZhuanpan(that.data.defaultWheelConfig)
      that.setData({
        optionName: that.data.defaultWheelConfig.optionName
      })
    }else{
      this.wheelComponent.switchZhuanpan(that.data.wheelArray[0])
      that.setData({
        optionName:that.data.wheelArray[0].optionName
      })
    }
    */
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