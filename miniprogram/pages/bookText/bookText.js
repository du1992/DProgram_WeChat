var root = getApp()
let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 1 //每页显示多少数据 


Page({

  data: {
    json: '',
    list: [],
    isHeadViewState: true,
 
   },

  // 生命周期函数--监听页面加载
  onLoad: function (option) {

    console.log('onLoad监听页面加载');

    currentPage = 0;

    let that = this
    let itemJSON = JSON.parse(option.itemJSON)
   
    console.log('上个页面跳转的data-item++', itemJSON)
    that.setData({
      json: itemJSON,
    })
    
    var hdItem = wx.getStorageSync('hdItem')
    let page = wx.getStorageSync('currentPage')
    if (hdItem.bookID == itemJSON.bookID ) 
    {
      if (page){
        currentPage = page;
      }
  
      
      that.setData({
        isHeadViewState: false,
      })
      
    }

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
        isHeadViewState: true
     })
    
    currentPage = 0;
    this.getList();
},
  //上拉事件
  onReachBottom: function () {
    console.log(' 下一页');
    currentPage = currentPage + 1;
    this.getList();
  },
  //从云开发数据库里列表
  getList() {
    wx.showLoading();
    var Page = currentPage * pageSize;
    let that = this;
    wx.cloud.database("test-6nt9d").collection("BookText").skip(Page).limit(pageSize).orderBy('sequence', 'desc')
      .where({
        'bookID': that.data.json.bookID
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
              let length = dataList.length;
              for (let i = 0; i < length; ++i){
                let item = dataList[i];
                item.txt = item.txt.replace(/\\n/g, "\n");
                dataList[i] = item;
              }
              
              let mergeList = that.data.list.concat(dataList)
              
              
             
       wx.setStorageSync('currentPage', currentPage);
             
         
              that.setData({ 
                  list: mergeList,
              });
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
          });
          
        }
 })
},
 

  //右上角分享功能
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '快来学习编程吧',
      path: '/pages/bookText/bookText',
    }
  },


})