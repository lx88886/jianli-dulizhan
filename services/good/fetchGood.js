import { config } from '../../config/index';
import { cloudService } from '../cloud/index';

/** 获取商品列表 */
function mockFetchGood(ID = 0) {
  const { delay } = require('../_utils/delay');
  const { genGood } = require('../../model/good');
  return delay().then(() => genGood(ID));
}

/** 获取商品列表 */
export function fetchGood(ID = 0) {
  if (config.useCloud) {
    return cloudService.getGoodBySpuId(ID).then(item => {
        if (!item) {
             console.warn('Cloud good not found, fallback to mock');
             return mockFetchGood(ID);
        }
        const defaultDesc = ['cloud://cloud1-9gam6dljf45914e3.636c-cloud1-9gam6dljf45914e3-1394158969/微信图片_20260101220112_382_124.jpg'];
        return {
            ...item,
            desc: item.desc || defaultDesc,
            images: item.images || [item.primaryImage],
            thumb: item.primaryImage,
        };
    }).catch(err => {
        console.error('Cloud fetch good failed, fallback to mock', err);
        return mockFetchGood(ID);
    });
  }
  if (config.useMock) {
    return mockFetchGood(ID);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
