import { cloudService } from '../../../services/cloud/index';
import Toast from 'tdesign-miniprogram/toast/index';
import { allGoods } from '../../../model/good';
import { getCategoryList } from '../../../model/category';

Page({
  async initData() {
    try {
       Toast({ context: this, selector: '#t-toast', message: '正在初始化...', theme: 'loading', duration: 0 });
       
       const goods = allGoods;
       const categories = getCategoryList();
       
       const res = await cloudService.initData(goods, categories);
       
       Toast({ context: this, selector: '#t-toast', message: `成功: ${res.successCount}, 失败: ${res.failCount}`, theme: 'success' });
    } catch(e) {
       console.error(e);
       Toast({ context: this, selector: '#t-toast', message: '初始化失败: ' + (e.message || JSON.stringify(e)), theme: 'fail' });
    }
  }
})