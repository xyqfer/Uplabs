// pages/template/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    backgroundColor: {
      type: String,
      value: '#fff'
    },
    cover: {
      type: String,
      value: ''
    },
    animated: {
      type: Boolean,
      value: false
    },
    name: {
      type: String,
      value: ''
    },
    desc: {
      type: String,
      value: ''
    },
    urls: {
      type: Array,
      value: []
    },
    loading: {
      type: Boolean,
      value: false
    }
  },

  attached: function() {
    const app = getApp();
    let imageUrl = this.data.cover;

    if (app.globalData.supportWebp) {
      imageUrl += '/format/webp';
    }

    this.setData({
      imageUrl: imageUrl
    });
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPreview: function (event) {
      const urls = event.currentTarget.dataset.urls;
      
      if (urls.length > 0) {
        wx.previewImage({
          current: urls[0],
          urls: urls
        });
      }
    }
  }
})
