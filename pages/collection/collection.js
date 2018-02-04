// pages/Collection/collection.js

const formatTime = require('../utils/formatTime.js');
const getCollection = require('../utils/getCollections.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    page: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const timeObj = formatTime({
      offset: 0
    });

    this.setData({
      dayIndex: timeObj.dayIndex
    });

    this.loadData();
  },

  loadData: function() {
    if (!this.data.isLoading) {
      this.setData({
        isLoading: true
      });

      getCollection({
        page: this.data.page,
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
    return {
      title: 'Uplabs - Collection',
      path: 'pages/collection/collection'
    };
  }
})