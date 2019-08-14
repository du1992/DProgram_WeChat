let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 12 //每页显示多少数据 

Page({

  data: {
   
    list: [],
    hdItem:'',
    
  },

  onLoad(options) {
    console.log('onLoad监听页面加载');
    

    var hdItem = wx.getStorageSync('hdItem')
    console.log('本地数据===' + hdItem.introduction);
    if (hdItem){
      this.setData({ 
        hdItem: hdItem,
     });
    }
    

    currentPage = 0;
    this.getList();

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
    wx.cloud.database("test-6nt9d").collection("Book").skip(Page).limit(pageSize).orderBy('sequence', 'desc')
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

              if (!that.data.hdItem){
                var item =mergeList[0];
                that.setData({ 
                  hdItem: item,
                  
                });
            }


            }
          } else {
            wx.showToast({
              title: '没有数据',
            })
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


  navigateTo: function (e) {

    let item = e.currentTarget.dataset.item;
    if (item){
     
      this.setData({
        hdItem: item,
      });


      let itemJSON = JSON.stringify(item)
      console.log('我传入的data-item=', itemJSON)
      wx.navigateTo({
        url: '/pages/bookText/bookText?itemJSON=' + itemJSON
      })


      let timer = setTimeout(() => {
        wx.setStorage({
          key: "hdItem",
          data: item
        })
    
      }, 2000)
      
    }
    
  },
  //右上角分享功能
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '快来学习编程吧',
      path: '/pages/book/book',
    }
  },
})