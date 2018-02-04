module.exports = ({linkPath = '', page = 1, success = function() {}}) => {
  const apiHost = 'https://sy2bnjwp1a.leanapp.cn';
  const apiPath = `/api/v1/uplabs`;

  wx.request({
    url: `${apiHost}${apiPath}${linkPath}?page=${page}`,
    success: (res) => {
      success(res.data);
    }
  });
};