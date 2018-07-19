//index.js
//获取应用实例
const app = getApp()
const category = ["gn","gj","cj","yl","js","ty","other"]
Page({
  data: {
    news_list: [],
    currentTab:0,
    item_count: 0,
    cate : "gn"
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
    var that = this;
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },

  onPullDownRefresh: function () {
    this.getNewsList(() => {
      wx.stopPullDownRefresh()
    })

  },

  getNewsList(callback){
    let cate = this.data.cate
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: cate
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
      let picPath = "/pics/news.jpg"
      if (result[i].firstImage != null){
        picPath = result[i].firstImage 
      }
      news_list.push({
        id : result[i].id,
        title : result[i].title,
        date: `${result[i].source} ${result[i].date.slice(5,10)} ${result[i].date.slice(11,16)}` ,
        pic: picPath
      })
    }
    this.setData({
      news_list : news_list,
      item_count : result.length
    })
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },

  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        cate: category[e.target.dataset.current]
      })
      this.getNewsList()
    }
  }
  
})
