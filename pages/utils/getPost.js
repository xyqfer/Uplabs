const formatData = require('./formatData.js');

module.exports = ({ id = 0, success = function () { } }) => {
  const apiHost = 'https://uplabs-oss-1252013833.file.myqcloud.com';
  const apiPath = `/api/v1/uplabs/${id}.json`;

  const storagePrefix = `uplabs_post_`;
  const storageKey = `__${storagePrefix}${id}__`;

  const cacheData = wx.getStorageSync(storageKey);

  if (cacheData) {
    success(cacheData);
  } else {
    wx.request({
      url: `${apiHost}${apiPath}`,
      success: (res) => {
        const uplabsData = formatData(res.data);
        success(uplabsData);

        if (uplabsData) {
          wx.setStorageSync(storageKey, uplabsData);
        }
      }
    });
  }
};