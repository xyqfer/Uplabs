App({
  onLaunch: function () {
    const systemInfo = wx.getSystemInfoSync();

    if (systemInfo.platform == 'android') {
      this.globalData.supportWebp = true;
    }
  },
  globalData: {
    supportWebp: false
  }
})