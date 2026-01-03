import { getGoodsList } from './goods';

export function getPromotion(baseID = 0, length = 10) {
  return {
    list: getGoodsList(baseID, length).map((item) => {
      return {
        spuId: item.spuId,
        thumb: item.primaryImage,
        title: item.title,
        price: item.minSalePrice,
        originPrice: item.maxLinePrice,
        tags: item.spuTagList.map((tag) => ({ title: tag.title })),
      };
    }),
    banner: 'cloud://cloud1-9gam6dljf45914e3.636c-cloud1-9gam6dljf45914e3-1394158969/微信图片_20260101215942_356_124.jpg',
    time: 1000 * 60 * 60 * 20,
    showBannerDesc: true,
    statusTag: 'running',
  };
}
