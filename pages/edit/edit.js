// pages/list/list.js
var app = getApp()
Page({
   data: {
     wheelArray:[],
   },

   

   //删除
   Delete(e) {
      var that = this, index = e.currentTarget.dataset.index
      app.globalData.wheelArray.splice(index, 1);
      wx.showToast({
          title: '删除成功',
          icon: 'success',
          mask: false
      })
      that.setData({
        wheelArray: app.globalData.wheelArray
      })
     wx.setStorageSync('wheelArray', app.globalData.wheelArray);
   },

   onLoad: function (options) {
     var wheelArray=app.globalData.wheelArray
     if (typeof (wheelArray) != "undefined" && wheelArray&&wheelArray!=0){
       this.setData({
         wheelArray:wheelArray
       })
     }

   },

   //编辑
   Revise(e) {
      var that = this, index = e.currentTarget.dataset.index;
      wx.navigateTo({
          url: '/pages/addItem/addItem?index='+index
      })
   },


   //隐藏功能栏开启关闭
   menuControl(e) {
      var that = this, index = e.currentTarget.dataset.index, idx, wheelArray = that.data.wheelArray;
      idx = wheelArray[index].flg == undefined ? index : undefined;
      wheelArray[index].flg = idx;
      that.setData({
         wheelArray: wheelArray
      })
   },


  
   up(e) {
      var that = this,index=e.currentTarget.dataset.index
      var tem=app.globalData.wheelArray[index]
      var  wheelArray=app.globalData.wheelArray
      if(index==0){
        if(wheelArray.length==1){
          //不做任何事
        }else{
          app.globalData.wheelArray.splice(index,1)
          app.globalData.wheelArray.push(tem)
          wx.setStorageSync('wheelArray', app.globalData.wheelArray)
          that.setData({
            wheelArray:app.globalData.wheelArray
          })
        }
        return;
      }
      app.globalData.wheelArray[index] = app.globalData.wheelArray[index-1]  
      app.globalData.wheelArray[index-1] = tem
      wx.setStorageSync('wheelArray', app.globalData.wheelArray);
      that.setData({
        wheelArray: app.globalData.wheelArray
      })
   },

   down(e){
     var that = this, index = e.currentTarget.dataset.index
     var tem = app.globalData.wheelArray[index]
     if(index==app.globalData.wheelArray.length-1){
       if(index==0){

       }else{
         app.globalData.wheelArray.splice(index,1)
         app.globalData.wheelArray.unshift(tem)
         wx.setStorageSync('wheelArray', app.globalData.wheelArray)
         that.setData({
           wheelArray:app.globalData.wheelArray
         })
       }
       return ;
     }
     app.globalData.wheelArray[index] = app.globalData.wheelArray[index+1]
     app.globalData.wheelArray[index+1] = tem
     wx.setStorageSync('wheelArray', app.globalData.wheelArray);
     that.setData({
       wheelArray: app.globalData.wheelArray
     })
   },

   onShow: function () {
     console.log('=========onShow============');
     var wheelArray = app.globalData.wheelArray
     if (typeof (wheelArray) != "undefined" && wheelArray && wheelArray != 0) {
       this.setData({
         wheelArray: wheelArray
       })
     }
   },
})