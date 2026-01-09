import { config, cdnBase } from '../../config/index';

/** 获取首页数据 */
function mockFetchHome() {
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: [
        {
          text: '小鹏',
          key: 0,
        },
        {
          text: 'B5',
          key: 1,
        },
        {
          text: '福美来',
          key: 2,
        },
        {
          text: '3000',
          key: 3,
        },
        {
          text: '娇子',
          key: 4,
        },
        {
          text: '2000',
          key: 5,
        },
        {
          text: 'STN',
          key: 6,
        },
      ],
      activityImg: `cloud://cloud1-9gam6dljf45914e3.636c-cloud1-9gam6dljf45914e3-1394158969/微信图片_20260101220012_362_124.jpg`,
    };
  });
}

/** 获取首页数据 */
export function fetchHome() {
  if (config.useMock) {
    return mockFetchHome();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
