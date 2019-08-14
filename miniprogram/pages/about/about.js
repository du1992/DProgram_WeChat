Page({

  //右上角分享功能
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '快来学习编程吧',
      path: '/pages/about/about',
    }
  },
})