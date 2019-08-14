
Page({
  onLoad () {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      this.direct()
    }, 1000)
  },
  direct () {

    let url = '/pages/book/book'
  
    wx.switchTab({
      url,
    })
  },
})