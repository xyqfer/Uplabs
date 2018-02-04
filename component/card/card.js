// pages/template/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardData: {
      type: Object,
      value: {}
    },
    collectionData: {
      type: Object,
      value: {}
    },
    loading: {
      type: Boolean,
      value: false
    },
    postId: {
      type: Number,
      value: 0
    },
    imageUrl: {
      type: String,
      value: ''
    },
    cardType: {
      type: String,
      value: 'card'
    }
  },

  attached: function() {
    if (this.data.cardType === 'card') {
      const app = getApp();
      const cardData = this.data.cardData;

      let imageUrl = cardData.cover;
      const postId = cardData.id;

      if (app.globalData.supportWebp) {
        imageUrl += '/format/webp';
      }

      if (cardData.avatar && cardData.avatar.indexOf('uplabscompress-1252013833.image.myqcloud.com') == -1) {
        cardData.avatar = '';
      }

      this.setData({
        cardData: cardData
      });

      if (postId != null && imageUrl != null) {
        this.setData({
          postId: postId,
          imageUrl: imageUrl
        });
      }
    }
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
    openPost: function(event) {
      const app = getApp();
      const id = event.currentTarget.dataset.postId;

      app.globalData.postData = this.data.cardData;
      wx.navigateTo({
        url: `../post/post?id=${id}`
      });
    },

    openCollection: function(event) {
      const name = event.currentTarget.dataset.collectionName;
      const linkPath = event.currentTarget.dataset.collectionUrl;

      wx.navigateTo({
        url: `../postCollection/postCollection?name=${name}&linkPath=${linkPath}`
      });
    }
  }
})
