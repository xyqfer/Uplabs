const formatTime = require('./formatTime.js');

module.exports = ({ url = '', cache = true, params = {}, success = function() {}}) => {
  const apiHost = 'https://sy2bnjwp1a.leanapp.cn';
  const offset = params.offset || 0;
  const page = params.page || 0;

  const timeObj = formatTime({ offset });
  const storageKey = `__uplabs_data_${timeObj.year}-${timeObj.month}-${timeObj.date}_${page}__`;
  const cacheData = wx.getStorageSync(storageKey);

  if (cacheData && cache) {
    success(cacheData);
  } else {
    let paramsList = [];

    Object.keys(params).forEach((key) => {
      paramsList.push(`${key}=${params[key]}`);
    });

    if (offset == 0) {
      paramsList.push(`t=${(new Date()).getTime()}`)
    }

    wx.request({
      url: `${apiHost}${url}?${paramsList.join('&')}`,
      success: (res) => {
        success(res.data);
        wx.setStorageSync(storageKey, res.data);
      }
    });
  }
};