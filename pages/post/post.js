// pages/post/post.js
const getPost = require('../utils/getPost.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    showExit: false,
    postData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id;
    const from = options.from;

    if (from == 'share') {
      this.loadData(id);
      this.setData({
        showExit: true
      });
    } else {
      const app = getApp();

      this.setData({
        postData: app.globalData.postData
      });
    }
  },

  loadData: function (id) {
    if (!this.data.isLoading) {
      this.setData({
        isLoading: true
      });

      getPost({
        id: id,
        success: (data) => {
          this.setData({
            postData: data
          });
        }
      });
    }
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const postData = this.data.postData;

    return {
      title: `Uplabs - ${postData.name}`,
      path: `pages/post/post?id=${postData.id}&from=share`,
      imageUrl: postData.urls[0]
    };
  },

  showPreview: function (event) {
    const urls = this.data.postData.urls;
    const index = +event.currentTarget.dataset.index;

    if (urls.length > 0) {
      wx.previewImage({
        current: urls[index],
        urls: urls
      });
    }
  },

  redirectHome: function() {
    wx.switchTab({
      url: '../index/index'
    });
  }
})