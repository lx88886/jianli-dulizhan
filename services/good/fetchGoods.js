import { config } from '../../config/index';
import { cloudService } from '../cloud/index';

/** 获取商品列表 */
function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
  const { delay } = require('../_utils/delay');
  const { getGoodsList } = require('../../model/goods');
  return delay().then(() =>
    getGoodsList(pageIndex, pageSize).map((item) => {
      return {
        spuId: item.spuId,
        thumb: item.primaryImage,
        title: item.title,
        price: item.minSalePrice,
        originPrice: item.maxLinePrice,
        tags: item.spuTagList.map((tag) => tag.title),
        stock: item.spuStockQuantity
      };
    }),
  );
}

/** 获取商品列表 */
export function fetchGoodsList(pageIndex = 1, pageSize = 20) {
  if (config.useCloud) {
    return cloudService.getGoodsListForCustomer(pageIndex, pageSize).then((res) => {
      // If cloud returns empty (e.g. not initialized), fallback to mock
      if (!res.data || res.data.length === 0) {
         console.warn('Cloud data empty, falling back to mock');
         return mockFetchGoodsList(pageIndex, pageSize);
      }
      return res.data.map((item) => ({
        spuId: item.spuId,
        thumb: item.primaryImage,
        title: item.title,
        price: item.minSalePrice,
        originPrice: item.maxLinePrice,
        tags: (item.spuTagList || []).map((tag) => tag.title),
        stock: item.spuStockQuantity
      }));
    }).catch(err => {
        console.error('Cloud fetch failed, fallback to mock', err);
        return mockFetchGoodsList(pageIndex, pageSize);
    });
  }
  if (config.useMock) {
    return mockFetchGoodsList(pageIndex, pageSize);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
