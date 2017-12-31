// pages/more/more.js
const getData = require('../utils/getData.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let offset = options.offset;
    let title = options.title;

    wx.setNavigationBarTitle({
      title: title
    });

    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      platform: systemInfo.platform.toLowerCase(),
      offset: offset,
      page: 1
    });

    this.loadData();
  },

  loadData: function () {
    if (!this.data.isLoading) {
      this.setData({
        isLoading: true
      });

      getData({
        url: '/api/v1/uplabs/more',
        params: `offset=${this.data.offset}&platform=${this.data.platform}&page=${this.data.page}`,
        success: (data) => {
          this.setData({
            list: this.data.list.concat(data),
            page: this.data.page + 1,
            isLoading: false
          });
        }
      });
    }
  },

  showMore: function() {
    this.loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})