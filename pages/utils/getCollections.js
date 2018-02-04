module.exports = ({page = 1, success = function() {}}) => {
  const apiHost = 'https://sy2bnjwp1a.leanapp.cn';
  const apiPath = `/api/v1/uplabs/collection`;

  wx.request({
    url: `${apiHost}${apiPath}?page=${page}`,
    success: (res) => {
      success(res.data);
    }
  });
};