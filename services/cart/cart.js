import { config } from '../../config/index';

/** 获取购物车数据 */
export function fetchCartGroupData(params) {
  return new Promise((resolve) => {
    const cartList = wx.getStorageSync('cartList') || [];
    
    // 计算统计数据
    const selectedGoodsCount = cartList.reduce((acc, item) => acc + (item.isSelected ? item.quantity : 0), 0);
    const totalAmount = 0; // 不再计算价格
    
    const resp = {
      data: {
        isNotEmpty: cartList.length > 0,
        storeGoods: [],
        invalidGoodItems: [],
        isAllSelected: cartList.length > 0 && cartList.every(item => item.isSelected),
        selectedGoodsCount: selectedGoodsCount,
        totalAmount: totalAmount,
        totalDiscountAmount: 0,
      },
      code: 'Success',
      msg: null,
      requestId: 'mock-request-id',
      clientIp: '127.0.0.1',
      rt: 100,
      success: true,
    };

    if (cartList.length > 0) {
        resp.data.storeGoods = [{
            storeId: '1000',
            storeName: '云Mall深圳旗舰店',
            storeStatus: 1,
            totalDiscountSalePrice: '0',
            promotionGoodsList: [{
                title: '默认活动',
                promotionCode: 'MERCHANT',
                promotionSubCode: 'MYJ',
                promotionId: '1',
                tagText: [''],
                promotionStatus: 3,
                tag: '',
                description: '',
                goodsPromotionList: cartList
            }]
        }];
    }

    resolve(resp);
  });
}
