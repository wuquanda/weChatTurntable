
var app = getApp()

Page({
   data: {
      awards: [],
      wheel: {},
      optionName: '',
      index: -1,
      colorArr: [//增加选项的默认颜色排序
         '#EE534F',
         '#FF7F50',
         '#FFC928',
         '#66BB6A',
         '#42A5F6',
         '#FF7F50',
         '#AA47BC',
         '#EC407A',
         '#DA70D6',
         '#FFA827',
         '#AA47BC',
         '#EE534F',
         '#42A5F6',
         '#66BB6A',
         '#FFC928',
         '#42A5F6',
         '#5C6BC0',
      ]
   },

   onLoad: function (options) {
      var that = this,index=options.index
      var wheel = that.data.wheel
      var wheelArray=app.globalData.wheelArray;
      if (options != undefined) {
         if (options.index>=0) {
           that.setData({
             awards: wheelArray[index].awards,
             wheel: wheelArray[index],
             optionName: wheelArray[index].optionName,
             index:options.index
           })
         }
      }
   },

   //轮盘名称
   checkOptionName(e) {
      var that = this, val = e.detail.value, wheel = that.data.wheel;
      wheel.optionName = val
      that.setData({
         optionName: val,
         wheel: wheel
      })
   },

   //轮盘选项
   checkItem(e) {
      var that = this, val = e.detail.value, index = e.currentTarget.dataset.index, awards = that.data.awards, wheel = that.data.wheel;
      //用当前输入框中的内容替换原数组中的内容
      for (let i in awards) {
         if (index == i) {
            awards[i].name = val
         }
      }
      wheel.awards = awards;
      that.setData({
         awards: awards,
         wheel: wheel
      })
   },

   //增加选项
   addItem() {
      var that = this, awards = that.data.awards, colorArr = that.data.colorArr, obj = {};
      if (awards.length == 17) {
         wx.showToast({
            title: '选项长度最多17项',
            icon:'none',
            mask:false
         })
         return;
      }
      obj = { name: '', color: colorArr[awards.length] };
      awards.push(obj);
      that.setData({
         awards: awards
      })
   },

   //删除选项
   subItem(e) {
      var that = this, 
      index = e.currentTarget.dataset.index, 
      awards = that.data.awards,
      wheel = that.data.wheel, 
      colorArr = that.data.colorArr;
      for (let i in awards) {
         if (i == index) {
            awards.splice(i, 1);
            break;
         }
      }

      for (let x in awards){
         awards[x].color = colorArr[x];
      }

      wheel.awards = awards;
      that.setData({
         awards: awards,
         wheel: wheel
      })
   },

   //保存
   saveWheel() {
      var that = this
      var wheelArray=app.globalData.wheelArray
      var wheel = that.data.wheel
      var awards = that.data.awards
      
     if (that.data.optionName =='') {
         wx.showToast({
            title: '轮盘名称不能为空',
            icon: 'none',
            mask: false
         })
      } else {
         for (let y in awards) {
            if (awards[y].name == '') {
               wx.showToast({
                  title: '轮盘选项不能为空',
                  icon: 'none',
                  mask: false
               })
               return;
            }
         }

         if (awards.length < 2) {
            wx.showToast({
               title: '轮盘选项最少填2个',
               icon: 'none',
               mask: false
            })
            return;
         }

      //wheelArray为null时
      if (!wheelArray && typeof (wheelArray) !="undefined" && wheelArray != 0) {
            var that=this;var arr=[];arr.push(that.data.wheel)
            app.globalData.wheelArray=arr;
            wx.setStorageSync("wheelArray", arr)
            wx.showToast({
               title: '保存成功',
               icon: 'success',
               mask: false,
               success: function () {
                  setTimeout(function () {
                     wx.navigateBack({
                       url: '../home/home'
                     })
                  }, 1500)
               }
            })
            return;
         }

        //index=-1时，是新添加一个wheel到wheelArray
         if(that.data.index==-1){
           app.globalData.wheelArray.push(that.data.wheel)
           wx.setStorageSync("wheelArray",app.globalData.wheelArray)
           wx.showToast({
             title: '保存成功',
             icon: 'success',
             mask: false,
             success: function () {
               setTimeout(function () {
                 wx.navigateBack({
                   url: '../home/home'
                 })
               }, 1500)
             }
           })
           return;
         }else{//此时是修改一个原本就存在于wheelArray中的wheel
            app.globalData.wheelArray[that.data.index]=wheel
            wx.setStorageSync("wheelArray",app.globalData.wheelArray)
            that.data.index=-1
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              mask: false,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    url: '../home/home'
                  })
                }, 1500)
              }
            })

         }
      }
   }
})