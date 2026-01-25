import updateManager from './common/updateManager';
import { cloudService } from './services/cloud/index';

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // 注释掉过长的环境ID，使用默认环境
        // env: '636c-cloud1-9gam6dljf45914e3-1394158969', // 原环境ID太长（39字符），云存储最多支持32字符
        traceUser: true,
        success: () => {
          console.log('云环境初始化成功');
          // 初始化数据库集合（在云初始化成功后调用）
          cloudService.initCollections();
        },
        fail: (err) => {
          console.error('云环境初始化失败:', err);
        }
      });
    }
  },
  onShow: function () {
    updateManager();
  },
});
