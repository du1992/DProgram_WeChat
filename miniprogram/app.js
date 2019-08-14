//app.js
App({
  onLaunch: function () {
    console.log('onLaunch监听小程序初始化');
    
    wx.cloud.init({
      env: 'test-6nt9d',
    });
   
   
    var openid = wx.getStorageSync('openid')
    if (openid) {
      console.log('======获取本地ID' + openid)
      this.getUserInfo();
    }else{
      this.getOpenid();
    }

   
    

},
  // 获取用户openid
  getOpenid() {
    console.log('=======请求Openid===');
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        var openid = res.result.openId;
        wx.setStorageSync('openid', openid);
        that.getUserInfo();
        console.log('=======储存Openid===');
     }
    })
  },
  //获取用户信息
  getUserInfo(){
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              wx.setStorageSync('nickName', res.userInfo.nickName);
              wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
              console.log(res.userInfo.avatarUrl)
            }
          })
        }
      }
    })

  }

  
   
})
