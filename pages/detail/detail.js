// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    news_title:"",
    news_date:"",
    readCount:"",
    news_pic:"",
    news_firstcontent:"",
    news_content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $data = options.id;
    console.log('news id=' + $data);
    this.setData({
      id : $data
    })
    this.getNewsDetail()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getNewsDetail(() => {
      wx.stopPullDownRefresh()
    })
  },

  getNewsDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        let result = res.data.result
        this.setNewsDetail(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  setNewsDetail(result) {
    this.setData({
      news_title: result.title,
      news_date: `${result.source} ${result.date.slice(5, 10)} ${result.date.slice(11, 16)}`,
      news_pic: result.firstImage,
      readCount: result.readCount, 
      news_firstcontent: result.content[0],
      news_content: result.content.slice(1)
    })
  }

})