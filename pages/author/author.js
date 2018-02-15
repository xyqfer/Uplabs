// pages/author/author.js
const getAuthor = require('../utils/getAuthor.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    page: 1,
    linkPath: '',
    list: [],
    name: '',
    author: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const name = options.name;
    const author = options.author;

    this.setData({
      author: author,
      name: name
    });

    wx.setNavigationBarTitle({
      title: name
    });

    this.loadData();
  },

  loadData: function (id) {
    if (!this.data.isLoading) {
      this.setData({
        isLoading: true
      });

      getAuthor({
        page: this.data.page,
        author: this.data.author,
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
    const name = this.data.name;
    const author = this.data.author;

    return {
      title: `Uplabs - ${name}`,
      path: `pages/author/author?name=${name}&author=${author}`
    };
  }
})