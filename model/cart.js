import { mockIp, mockReqId } from '../utils/mock';

export function genCartGroupData() {
  const resp = {
    data: {
      isNotEmpty: false,
      storeGoods: [],
      invalidGoodItems: [],
      isAllSelected: false,
      selectedGoodsCount: 0,
      totalAmount: '0',
      totalDiscountAmount: '0',
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 269,
    success: true,
  };
  return resp;
}
