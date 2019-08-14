let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 15 //每页显示多少数据 
var root = getApp()

Page({

  data: {
    json:'',
    list: [],
    content: '',
   
   
  },
  // 生命周期函数--监听页面加载
  onLoad: function (option) {

    let that = this

    let itemJSON = JSON.parse(option.itemJSON)
   
    console.log('上个页面跳转的data-item++', itemJSON)
    
    that.setData({
      json: itemJSON,
      nickName: wx.getStorageSync('nickName'),
      avatarUrl: wx.getStorageSync('avatarUrl'),
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
    wx.cloud.database("test-6nt9d").collection("Comments").skip(Page).limit(pageSize).orderBy('createTime', 'desc').where({
      postID: that.data.json._id,
     
    })
      .get({
        success: function (res) {
          wx.hideLoading();

          console.log(res.data)
          wx.stopPullDownRefresh(); //停止刷新

          if (res.data) {
            let dataList = res.data;

            if (dataList === undefined || dataList.length == 0) {
              // wx.showToast({
              //   title: '没有评论',
              // })
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
            // wx.showToast({
            //   title: '没有评论',
            // })
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
  //授权
  onGotUserInfo: function (e) {
    let that = this
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      root.getUserInfo();
      that.setData({
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
      })
    } else {
      //用户按了拒绝按钮
    }
  },
  //内容
  contentBindinput: function (e) {

    this.setData({
      content: e.detail.value
    })
  },
  //发送评论
  onSend: function (e) {
    console.log('确认发布====');

    if (this.data.content.length < 1) {
      wx.showToast({
        title: '请输入评论内容',
      })
    } else {
      console.log('开始储存====');
      let that = this
      var openid = wx.getStorageSync('openid');
      var nickName = wx.getStorageSync('nickName');
      var avatarUrl = wx.getStorageSync('avatarUrl');
      const db = wx.cloud.database("test-6nt9d");
      db.collection('Comments').add({
        data: {
          openID: openid,
          nickName: nickName,
          userLogo: avatarUrl,
          content: that.data.content,
          postID: that.data.json._id,
          authorID: that.data.json.authorID,
          createTime: db.serverDate()
        },
        success: res => {
          wx.showToast({
            title: '评论成功',
          })
          that.addData();


        },
        fail: err => {
          wx.showToast({
            title: '发布失败'
          })
        }
      })

  }
  },
  //添加数据
  addData: function () {
    let that = this
    var nickName = wx.getStorageSync('nickName');
    var avatarUrl = wx.getStorageSync('avatarUrl');
    console.log('添加数据====' + nickName);
    var newarray = [{
      nickName: nickName,
      userLogo: avatarUrl,
      content: that.data.content
    }];
    that.data.list = newarray.concat(that.data.list);
    this.setData({
      'list': that.data.list
    });
   
  },

  //右上角分享功能
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '快来学习编程吧',
      path: '/pages/article/article',
    }
  },

})