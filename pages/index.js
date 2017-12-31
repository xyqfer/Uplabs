// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    offset: 0,
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      platform: systemInfo.platform.toLowerCase()
    });

    this.loadData();
  },

  loadData: function() {
    if (!this.data.isLoading) {
      this.setData({
        isLoading: true
      });

      wx.request({
        url: `https://sy2bnjwp1a.leanapp.cn/api/v1/uplabs/all?offset=${this.data.offset}&platform=${this.data.platform}`,
        success: (res) => {
          this.setData({
            list: this.data.list.concat(res.data),
            offset: this.data.offset + 1,
            isLoading: false
          });
        }
      });
    }
  },

  showPreview: function(event) {
    const id = event.currentTarget.dataset.id;
    const filterList = this.data.list.filter((item) => {
      return item.id == id;
    });

    if (filterList.length > 0) {
      const data = filterList[0];
      let current = data.preview_url;
      let urls = [current];

      if (data.images.length > 0) {
        data.images.forEach((img) => {
          urls.push(img.urls.full);
        });
      }

      wx.previewImage({
        current: current,
        urls: urls
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
      title: 'Uplabs',
      imageUrl: './images/screenshot.png'
    };
  }
})