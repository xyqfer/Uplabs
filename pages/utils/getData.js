module.exports = ({url = '', params = '', success = function() {}}) => {
  const apiHost = 'https://sy2bnjwp1a.leanapp.cn';

  wx.request({
    url: `${apiHost}${url}?${params}`,
    success: (res) => {
      success(res.data);
    }
  });
};