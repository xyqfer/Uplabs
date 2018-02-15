module.exports = ({ author = '', page = 1, success = function () {} }) => {
  const apiHost = 'https://sy2bnjwp1a.leanapp.cn';
  const apiPath = `/api/v1/uplabs/author/`;

  wx.request({
    url: `${apiHost}${apiPath}${author}.json?page=${page}`,
    success: (res) => {
      success(res.data);
    }
  });
};