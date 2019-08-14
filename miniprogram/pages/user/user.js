var root = getApp()

Page({

  data: {
    openid: '',
    scrollTop: 100,
    list: [
      {
        id: 'notification',
        title: '消息中心',
        icon: '/images/user/ic_notification.png',
      },
      {
        id: 'post',
        title: '我的帖子',
        icon: '/images/user/my_post.png',
      }, 
      {
        id: 'found',
        title: '论坛讨论',
        icon: '/images/user/found.png',
      },
       {
         id: 'appreciates',
         title: '赞赏开发者',
         icon: '/images/user/appreciates.png',
      },{
         id: 'advice',
         title: '建议反馈',
         icon: '/images/user/advice.png',
      },{
         id: 'about',
        title: '关于',
         icon: '/images/user/About.png',
      },
     
    ],
    indicatorDots: true,//是否显示面板指示点
    autoplay: true,     // 是否自动切换
    interval: 3000,     //自动切换时间间隔
    duration: 500,      //滑动动画时长


  },


  onLoad(options) {
    console.log('onLoad监听页面加载');
    // root.getOpenid();
    
    this.setData({
      nickName: wx.getStorageSync('nickName'),
      avatarUrl: wx.getStorageSync('avatarUrl'),
    })
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
      path: '/pages/user/user',
    }
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
        avatarUrl: e.detail.userInfo.avatarUrl,     })
    } else {
      //用户按了拒绝按钮
    }
  },
  //用户点击
  navigateTo: function (e) {
    var id = e.currentTarget.dataset.id;
    if (id == "appreciates") {
      wx.previewImage({
        urls: ['https://upload-images.jianshu.io/upload_images/3323633-e04ec2008d02352d.png'],
      });
    } else if (id == "notification"){
      wx.navigateTo({
        url: '/pages/notification/notification'
      })
    } else if (id == "post") {
      wx.navigateTo({
        url: '/pages/myPost/myPost?personal=' + 1
      })

    } else if (id == "found") {
      wx.navigateTo({
        url: '/pages/myPost/myPost?personal=' + 0
      })

    } else if (id == "advice") {
      wx.navigateTo({
        url: '/pages/advice/advice'
      })
      
    } else if (id == "about") {
      wx.navigateTo({
        url: '/pages/about/about'
      })

    }

    
    
  },

})