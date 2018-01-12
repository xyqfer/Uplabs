// pages/index.js
const getData = require('../utils/getData.js');
const formatTime = require('../utils/formatTime.js');

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

    this.loadData({
      refresh: false,
      success: () => {
        setTimeout(() => {
          wx.startPullDownRefresh();
        }, 300);
      }
    });
  },

  loadData: function ({ refresh = false , success = function() {}}) {
    if (!this.data.isLoading) {
      this.setData({
        isLoading: true
      });

      getData({
        cache: !refresh,
        params: {
          type: 'all',
          offset: refresh ? 0 : this.data.offset,
          platform: this.data.platform
        },
        success: (data) => {
          const timeObj = formatTime({
            offset: this.data.offset
          });

          if (refresh) {
            this.setData({
              'list[0].list': data
            });
          } else {
            const uplabsData = {
              list: data,
              date: `${timeObj.month}-${timeObj.date}`,
              dateText: timeObj.day,
              dayIndex: timeObj.dayIndex,
              offset: this.data.offset
            };

            this.setData({
              list: this.data.list.concat(uplabsData),
              offset: this.data.offset + 1
            });
          }

          if (refresh) {
            wx.stopPullDownRefresh();
          }

          this.setData({
            isLoading: false
          });

          success(data);
        }
      });
    }
  },

  showMore: function(event) {
    const offset = event.currentTarget.dataset.offset;
    const title = event.currentTarget.dataset.title;

    wx.navigateTo({
      url: `../more/more?offset=${offset}&title=${title}&type=all`
    });
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
    this.loadData({
      refresh: true
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData({
      refresh: false
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'Uplabs',
      imageUrl: '../images/screenshot.png'
    };
  }
})