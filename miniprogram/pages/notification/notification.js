let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 15 //每页显示多少数据 
var root = getApp()

Page({

  data: {
    list: [],
    openid: '',
 },
  // 生命周期函数--监听页面加载
  onLoad: function (option) {

    let that = this
    that.setData({
      openid: wx.getStorageSync('openid')
    })
    currentPage = 0;
    this.getList();


  },

  //下拉事件
  onPullDownRefresh: function () {
    console.log('刷新');
    this.setData({
      list: [],
    });
    currentPage = 0;

    this.getList();

  },
  //上拉事件
  onReachBottom: function () {
    console.log(' 下一页');
    this.getList();
  },
  //从云开发数据库里列表
  getList() {
    wx.showLoading();
    var Page = currentPage * pageSize;
    let that = this;
    wx.cloud.database("test-6nt9d").collection("message").skip(Page).limit(pageSize).orderBy('createTime', 'desc')
      .get({
        success: function (res) {
          wx.hideLoading();

          console.log(res.data)
          wx.stopPullDownRefresh(); //停止刷新

          let dataList = res.data;
          let mergeList = that.data.list.concat(dataList)
          if (dataList === undefined || dataList.length == 0) {
            
            if (mergeList === undefined || mergeList.length == 0) {
              wx.showToast({
                title: '还未有消息',
              })}
           


          } else {
            
            currentPage = currentPage + 1;
            console.log('赋值成功')
            that.setData({ //获取数据成功后的数据绑定
              isShowArticle: true,
              list: mergeList,
            });
          }

        },


        fail: err => {
          wx.stopPullDownRefresh(); //停止刷新
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
      path: '/pages/notification/notification',
    }
  },

 


})