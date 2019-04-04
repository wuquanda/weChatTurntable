Page({
  data: {
    btns1: [
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
  },

  
  delete(e) {
    wx.showModal({
      title: '提示',
      content: 'delete',
      showCancel: false,
    });
  },
  edit() {
    wx.showModal({
      title: '提示',
      content: 'edit',
      showCancel: false,
    });
  },
  handleBtnClick(e) {
    const { onPress } = e.detail;
    onPress.call(this);
  },
});
