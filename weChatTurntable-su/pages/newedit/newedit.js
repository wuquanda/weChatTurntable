Page({

  /**
   * 页面的初始数据
   */
  data: {
    nametap: [],
    add_list: [],
    name: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this,
      add_list = [],
      temp = {},
      owndesicion = wx.getStorageSync('owndesicion'),
      arr = [],
      nametap = that.data.nametap,
      num = wx.getStorageSync('num');
    nametap.id = num;
    nametap.num = num;
    that.setData({
      nametap: nametap
    })
    temp= JSON.parse(options.item);
  },
  updateName: function(e) {
    var that = this,
      val = e.detail.value,
      nametap = that.data.nametap;
    nametap.val = val
    that.setData({
      name: val,
      nametap: nametap
    })
  },
  updateList: function(e) {
    var that = this,
      val = e.detail.value,
      index = e.currentTarget.dataset.index,
      add_list2 = that.data.add_list,
      nametap2 = that.data.nametap;
    for (let i in add_list2) {
      if (index == i) {
        add_list2[i].name = val
      }
    }
    nametap2.list = add_list2;
    that.setData({
      add_list: add_list2,
      nametap: nametap2
    })
  },
  add: function() {
    var that = this,
      add_list = that.data.add_list, //选项组成list
      perlist = {};
    if (add_list.length == 15) {
      wx.showToast({
        title: '选项数量最多15',
        icon: 'none',
        mask: false
      })
      return;
    }
    perlist = {
      name: ""
    };
    add_list.push(perlist);
    that.setData({
      add_list: add_list
    })
  },
  delete: function(e) {
    var that = this,
      add_list = that.data.add_list,
      nametap = that.data.nametap,
      index = e.currentTarget.dataset.index;
    for (let i in add_list) {
      if (i == index) {
        add_list.splice(i, 1);
        break;
      }
    }
    nametap.list = add_list;
    that.setData({
      add_list: add_list,
      nametap: nametap
    })
  },
  save: function() {
    var that = this,
      owndesicion = wx.getStorageSync('owndesicion'),
      nametap = that.data.nametap,
      add_list = that.data.add_list,
      temp_array = [];

    if (that.data.name == '') {
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        mask: false
      })
    } else {
      for (let x in add_list) {
        if (add_list[x].name == '') {
          wx.showToast({
            title: '选项不能为空',
            icon: 'none',
            mask: false
          })
          return;
        }
      }

      if (add_list.length < 2) {
        wx.showToast({
          title: '选项最少填2个',
          icon: 'none',
          mask: false
        })
        return true;
      }
      var nameIsNull;
      if (nameIsNull = (add_list) => {
          if (add_list == null || add_list == undefined || add_list == '') {
            return true;
          } else {
            return false;
          }
        }) {
        temp_array.push(nametap);
        wx.setStorageSync('owndesicion', temp_array);
        wx.setStorageSync('num', wx.getStorageSync('num') + 1);
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          mask: false,
          success: function() {
            setTimeout(function() {
              wx.navigateTo({
                url: 'pages/home/home'
              })
            }, 1000)
          }
        })
        return;
      }
      for (let i in owndesicion) {
        if (nametap.num == owndesicion[i].num) {
          myJuedin[i] = default_input_answer_list;
          wx.setStorageSync('owndesicion', owndesicion);
        }
      }




    } //else
  }, //save

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})