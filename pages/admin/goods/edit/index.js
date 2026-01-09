import { cloudService } from '../../../../services/cloud/index';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    id: null,
    title: '',
    price: '',
    linePrice: '',
    stock: 999,
    fileList: [], // { url: '' }
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id });
      this.fetchDetail(options.id);
    }
  },

  async fetchDetail(id) {
    try {
      const res = await cloudService.getGood(id);
      const data = res.data;
      this.setData({
        title: data.title,
        price: data.minSalePrice,
        linePrice: data.minLinePrice,
        stock: data.spuStockQuantity,
        fileList: [{ url: data.primaryImage }]
      });
    } catch (e) {
      console.error(e);
    }
  },

  onTitleChange(e) { this.setData({ title: e.detail.value }); },
  onPriceChange(e) { this.setData({ price: e.detail.value }); },
  onLinePriceChange(e) { this.setData({ linePrice: e.detail.value }); },
  onStockChange(e) { this.setData({ stock: e.detail.value }); },

  async onAddImage(e) {
    const { files } = e.detail;
    try {
        const file = files[0];
        Toast({ context: this, selector: '#t-toast', message: '上传中...', theme: 'loading', duration: 0 });
        
        const res = await cloudService.uploadImage(file.url);
        
        this.setData({
            fileList: [{ url: res.fileID }]
        });
        Toast({ context: this, selector: '#t-toast', message: '上传成功', theme: 'success' });
    } catch (e) {
        console.error(e);
        Toast({ context: this, selector: '#t-toast', message: '上传失败', theme: 'fail' });
    }
  },

  onRemoveImage() {
    this.setData({ fileList: [] });
  },

  async onSubmit() {
    const { id, title, price, linePrice, stock, fileList } = this.data;
    
    if (!title || !price || fileList.length === 0) {
      Toast({ context: this, selector: '#t-toast', message: '请填写完整信息', theme: 'fail' });
      return;
    }

    const goodData = {
      title,
      minSalePrice: parseInt(price),
      minLinePrice: parseInt(linePrice) || parseInt(price),
      maxSalePrice: parseInt(price),
      maxLinePrice: parseInt(linePrice) || parseInt(price),
      spuStockQuantity: parseInt(stock),
      primaryImage: fileList[0].url,
      images: [fileList[0].url],
      isPutOnSale: 1,
      spuTagList: [] 
    };
    
    // For new items, ensure spuId
    if (!id) {
        goodData.spuId = String(Date.now());
        goodData.storeId = '1000';
    }

    try {
      if (id) {
        await cloudService.updateGood(id, goodData);
      } else {
        await cloudService.addGood(goodData);
      }
      
      Toast({ context: this, selector: '#t-toast', message: '保存成功', theme: 'success' });
      setTimeout(() => wx.navigateBack(), 1000);
    } catch (e) {
      console.error(e);
      Toast({ context: this, selector: '#t-toast', message: '保存失败', theme: 'fail' });
    }
  }
});