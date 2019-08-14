var root = getApp()

Page({

data: {
  shareImg: '/images/topic/share.png',
  segmentationImg: '/images/topic/segmentation.png',
  introduce: '初始化',
  title:'',
  backgroundImg:'',
  list:[],
  topicID:'',
  height: wx.getSystemInfoSync().windowHeight,
  width: wx.getSystemInfoSync().windowWidth
},
  // 生命周期函数--监听页面加载
  onLoad: function (option) {
    this.setData({
      topicID: option.id,
     })
    
    var itemJSON = wx.getStorageSync(option.id)
    if (itemJSON) {
      this.setData({
        introduce: itemJSON.introduce,
        backgroundImg: itemJSON.backgroundImg,
        list: itemJSON.data,
        title: itemJSON.title,
      });
    }else{
      this.getList();
    }

    
  },

  //从云开发数据库里列表
  getList() {
    wx.showLoading();
    let that = this;
    console.log('请求ID===' + that.data.topicID)
    
    wx.cloud.database("test-6nt9d").collection("Topic").skip(0).limit(1).orderBy('createTime', 'desc').where({
      'topicID': that.data.topicID
    })
      .get({
        success: function (res) {
          wx.hideLoading();

          let dataList = res.data;
          if (dataList.length){
            let itemJSON = dataList[0];
            console.log(itemJSON)
            if (itemJSON) {
              that.setData({
                introduce: itemJSON.introduce,
                backgroundImg: itemJSON.backgroundImg,
                list: itemJSON.data,
                title: itemJSON.title,
              });
              wx.setStorage({
                key: that.data.topicID,
                data: itemJSON
              })

          }
       }
         
          
       },


        fail: err => {
         
          wx.hideLoading();
          wx.showToast({
            title: '网络请求失败，请重试',
          })
        }
      })




  
  },

bindchange(e) {
  this.setData({
    swiperIndex: e.detail.current
  })
},
  //右上角分享功能
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '快来学习编程吧',
      path: '/pages/topic/topic',
    }
  },

})