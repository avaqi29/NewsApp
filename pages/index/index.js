//index.js
//获取应用实例
const app = getApp()
const category = ["gn","gj","cj","yl","js","ty","other"]
Page({
  data: {
    news_cate:[],
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
    for (let i = 0; i < category.length; i++) {
      this.setData({
        cate: category[i]
      })
      this.getNewsList();
    }
    
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
        this.setNewsList(result,cate)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  setNewsList(result,cate){
    console.log(result.length)
    let news_list = []
    let news_cate = this.data.news_cate;
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
    //let ca = this.data.cate;
    //"gn","gj","cj","yl","js","ty","other"
    let catetitle = "";
    console.log(cate);
    switch (cate) {
      case "gn":
        catetitle = "国内";
        break;
      case "gj":
        catetitle = "国际";
        break;
      case "cj":
        catetitle = "财经";
        break;
      case "yl":
        catetitle = "娱乐";
        break;
      case "js":
        catetitle = "军事";
        break;
      case "ty":
        catetitle = "体育";
        break;
      case "other":
        catetitle = "其他";
        break;
      }
    news_cate.push({
      news_title: catetitle,
      news_list : news_list
    });
    this.setData({
      news_cate: news_cate,
      item_count : result.length
    })
  }
  
})
