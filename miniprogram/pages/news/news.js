let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 15 //每页显示多少数据 
var root = getApp()
Page({

  data: {
    nextImg: '/images/home/point.png',
    scrollTop: 100,
    list: [],

    // informationList: [],
    current: 0,
    animationData: {},
    animationData2: {}



  },


  onLoad(options) {
    console.log('onLoad监听页面加载');
    this.setData({
      nickName: wx.getStorageSync('nickName'),
      avatarUrl: wx.getStorageSync('avatarUrl'),
    })
    console.log('用户头像' + this.data.avatarUrl);
    this.getInformationList();
    this.getList();

  },

  onReady() {
    this.stretch(300);
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
  //下拉事件
  onPullDownRefresh: function () {
    console.log('刷新');
    this.setData({
      list: [],
    });
    currentPage = 0;
    this.getInformationList();
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
    wx.cloud.database("test-6nt9d").collection("information").skip(Page).limit(pageSize).orderBy('createTime', 'desc').where({
      type: 2
    })
      .get({
        success: function (res) {
          wx.hideLoading();

          console.log(res.data)
          wx.stopPullDownRefresh(); //停止刷新

          if (res.data) {
            let dataList = res.data;

            if (dataList === undefined || dataList.length == 0) {
              wx.showToast({
                title: '没有数据',
              })
            } else {
              let mergeList = that.data.list.concat(dataList)
              currentPage = currentPage + 1;
              console.log('赋值成功')
              that.setData({ //获取数据成功后的数据绑定
                isShowArticle: true,
                list: mergeList,
              });
            }
          } else {
            wx.showToast({
              title: '没有数据',
            })
          }

        },


        fail: function (err) {
          console.log('请求失败====' + err.data)
          wx.stopPullDownRefresh(); //停止刷新
          wx.hideLoading();
          wx.showToast({
            title: '网络请求失败，请重试',
          })
        }





      })





  },



  getInformationList() {
    let that = this;
    wx.cloud.database("test-6nt9d").collection("information").where({
      type:1
    })
      .get({
        success: function (res) {
          console.log(res.data)
          console.log('赋值成功')
          that.setData({ //获取数据成功后的数据绑定
            informationList: res.data,
          });
          this.stretch(300)
          this.shrink(280)
        }

      })

  },

  

  informationNavigateTo: function (e) {

    let item = e.currentTarget.dataset.item;
    let itemJSON = JSON.stringify(item)
    wx.navigateTo({
      url: '/pages/information/information?itemJSON=' + encodeURIComponent(itemJSON)
    })
  },

  publishNavigateTo: function (e) {


    wx.navigateTo({
      url: '/pages/publish/publish'
    })
  },

  swiperChange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  change(e) {
    this.setData({
      current: e.detail.current
    })
    this.stretch(300)

    this.shrink(280)
  },
  // 收缩
  stretch(h) {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(h).step()
    this.setData({
      animationData: animation.export(),
    })
  },
  // 展开
  shrink(h) {
    var animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation2 = animation2
    animation2.height(h).step()
    this.setData({
      animationData2: animation2.export()
    })
  },
  
  //右上角分享功能
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '快来学习编程吧',
      path: '/pages/news/news',
    }
  },
})