//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    news_list: []
  },

  //事件处理函数
  newsItemTap: function(e) {
    var $data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + $data.id,
    })
  },

  onLoad: function () {
    this.getNewsList()
  },

  onPullDownRefresh: function () {
    this.getNewsList(() => {
      wx.stopPullDownRefresh()
    })

  },

  getNewsList(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: "gn"
      },
      success: res => {
        let result = res.data.result
        this.setNewsList(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  setNewsList(result){
    console.log(result.length)
    let news_list = []
    for (let i =0 ;i<result.length; i++){
      news_list.push({
        id : result[i].id,
        title : result[i].title,
        date: `${result[i].source} ${result[i].date.slice(5,10)} ${result[i].date.slice(11,16)}` ,
        pic: result[i].firstImage
      })
    }
    this.setData({
      news_list : news_list
    })
  }
  
})
