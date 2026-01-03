import updateManager from './common/updateManager';

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: '636c-cloud1-9gam6dljf45914e3-1394158969',
        traceUser: true,
      });
    }
  },
  onShow: function () {
    updateManager();
  },
});
