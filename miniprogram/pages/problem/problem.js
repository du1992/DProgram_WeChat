
Page({
  
  data: {
    nextImg: '/images/home/point.png',
    scrollTop: 100,
    list: [
      {
        id: 'iOS',
        title: 'ios开发',
        introduceBrief: '用于iPhone、iPad、苹果电脑开发等',
      }, {
        id: 'java',
        title: 'java开发',
        introduceBrief: '用于Android、网站、服务器开发等',
       
      }, {
        id: 'PHP',
        title: 'PHP开发',
        introduceBrief: '用于网站、后台、数据收集等开发',
        
      }, {
        id: 'HTML',
        title: 'HTML开发',
        introduceBrief: '用于网页开发等',
        
         }, {
        id: 'python',
        title: 'python开发',
        introduceBrief: '用于大数据分析、脚本、人工智能开发等',
      
      }, {
        id: 'SQL',
        title: 'SQL开发',
        introduceBrief: '用于数据库的开发等',
       
      }, {
        id: 'JavaScript',
        title: 'JavaScript开发',
        introduceBrief: '用于网站前端、网站后端、插件开发等',
        
      }, {
        id: 'C',
        title: 'C/C++开发',
        introduceBrief: '用于游戏、操作系统、复杂运算软件开发等',
       
      }, {
        id: 'CJ',
        title: 'C#开发',
        introduceBrief: '用于网站、电脑软件、单片机开发等',
        
      }, {
        id: 'Ruby',
        title: 'Ruby开发',
        introduceBrief: '用于web、脚本、智能硬件开发等',
        
      }
    ]
  },
  
  onLoad(options) {
    console.log('onLoad监听页面加载');

   

  },

  navigateTo: function (e) {
    var id = e.currentTarget.dataset.id;
  
    wx.navigateTo({
      url: '/pages/topic/topic?id=' + id 
    })
   },

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  //右上角分享功能
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '快来学习编程吧',
      path: '/pages/home/home',
    }
  },



})

