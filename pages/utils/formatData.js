module.exports = (data) => {
  if (data.animated_teaser_url != null) {
    const assetReg = /^https:\/\/assets\.materialup\.com/g;
    const cdnHost = 'https://uplabscompress-1252013833.image.myqcloud.com';
    
    return data.map((item) => {
      let card = {
        backgroundColor: item.background_color,
        id: item.id,
        animated: item.animated,
        name: item.name,
      };

      card.desc = `by ${item.maker_name} in ${item.subcategory_friendly_name_plural}`;

      item.animated_teaser_url = item.animated_teaser_url.replace(assetReg, cdnHost) + '?imageView2/q/75';
      card.cover = item.animated_teaser_url;

      item.preview_url = item.preview_url.replace(assetReg, cdnHost);
      card.urls = [item.preview_url];

      if (item.images.length > 0) {
        item.images.forEach((img) => {
          let url = img.urls.full.replace(assetReg, cdnHost);

          card.urls.push(url);
        });
      }

      return card;
    });
  } else {
    return data;
  }
};