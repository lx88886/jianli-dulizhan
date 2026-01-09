import { cloudService } from '../../../../services/cloud/index';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    goodsList: [],
    page: 1,
    hasMore: true,
  },

  onShow() {
    this.setData({ page: 1, goodsList: [] }, () => {
      this.fetchGoods();
    });
  },

  async fetchGoods() {
    try {
      const res = await cloudService.getGoodsList(this.data.page);
      if (res.data) {
        this.setData({
          goodsList: [...this.data.goodsList, ...res.data],
          hasMore: res.data.length >= 20
        });
      }
    } catch (e) {
      console.error(e);
      Toast({ context: this, selector: '#t-toast', message: '加载失败', theme: 'fail' });
    }
  },

  onReachBottom() {
    if (this.data.hasMore) {
      this.setData({ page: this.data.page + 1 }, () => {
        this.fetchGoods();
      });
    }
  },

  onAdd() {
    wx.navigateTo({ url: '/pages/admin/goods/edit/index' });
  },

  onEdit(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/admin/goods/edit/index?id=${id}` });
  },

  async onToggleStatus(e) {
    const { id, status } = e.currentTarget.dataset;
    const newStatus = status === 1 ? 0 : 1;
    
    try {
      await cloudService.updateGood(id, { isPutOnSale: newStatus });
      Toast({ context: this, selector: '#t-toast', message: newStatus ? '已上架' : '已下架', theme: 'success' });
      
      // Update local list
      const goodsList = this.data.goodsList.map(item => {
        if (item._id === id) {
          return { ...item, isPutOnSale: newStatus };
        }
        return item;
      });
      this.setData({ goodsList });
    } catch (e) {
      Toast({ context: this, selector: '#t-toast', message: '操作失败', theme: 'fail' });
    }
  }
});