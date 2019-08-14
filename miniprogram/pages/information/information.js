
const WxParse = require('../../wxParse/wxParse.js')

Page({

  data: {
  
    json: '',
  },


  // 生命周期函数--监听页面加载
  onLoad: function (option) {

    let that = this
    
    let data = decodeURIComponent(option.itemJSON);

    let itemJSON = JSON.parse(data);
    
    //  JSON.decodeURIComponent(option.itemJSON)

    console.log('上个页面跳转的data-item++', data)
   
    that.setData({
      json: itemJSON,
     })

    wx.showLoading();

    WxParse.wxParse('article', 'html', itemJSON.article, this, 5);
    
    wx.hideLoading();
    // setTimeout(function () {
      
    // }, 1000)

  },



  onReady() {
    console.log('onReady监听页面初次渲染完成');
  },

  onShow() {
    console.log('onShow监听页面显示');
  },

  onHide() {
    console.log('onHide监听页面隐藏');
  },

  onUnload() {
    console.log('onUnload监听页面卸载');
  },

  //右上角分享功能
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '快来学习编程吧',
      path: '/pages/information/information',
    }
  },

})