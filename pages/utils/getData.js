const formatTime = require('./formatTime.js');
const formatData = require('./formatData.js');

module.exports = ({ cache = true, params = {}, success = function() {}}) => {
  const apiHost = 'https://uplabs-oss-1252013833.file.myqcloud.com';
  const offset = params.offset || 0;
  const page = params.page || 0;
  const pageType = params.type || 'all';

  const timeObj = formatTime({ offset });
  const storageKey = `__uplabs_data_${pageType == 'all' ? '' : (pageType + '_')}${timeObj.year}-${timeObj.month}-${timeObj.date}_${page}__`;
  const url = `/api/v1/uplabs/uplabs_${pageType == 'all' ? '' : (pageType + '_')}${timeObj.year}-${timeObj.month}-${timeObj.date}_${page}.json`;
  const cacheData = wx.getStorageSync(storageKey);

  if (cacheData && cache) {
    success(cacheData);
  } else {
    let paramsList = [];

    if (offset == 0) {
      paramsList.push(`t=${(new Date()).getTime()}`)
    }

    wx.request({
      url: `${apiHost}${url}?${paramsList.join('&')}`,
      success: (res) => {
        const uplabsData = formatData(res.data);

        success(uplabsData);

        if (uplabsData && uplabsData.length > 0) {
          wx.setStorageSync(storageKey, uplabsData);
        }
      }
    });
  }
};