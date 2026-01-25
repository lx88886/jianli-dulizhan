export const OrderStatus = {
  PENDING_PAYMENT: 5, // 待支付（预定系统不使用）
  PENDING_DELIVERY: 10, // 待确认（预定系统：预定待管理员确认）
  PENDING_RECEIPT: 40, // 已确认（预定系统：预定已确认）
  COMPLETE: 50, // 已完成（预定系统：预定已完成）
  PAYMENT_TIMEOUT: 80, // 已取消，支付超时
  CANCELED_NOT_PAYMENT: 80, // 已取消，未支付主动取消
  CANCELED_PAYMENT: 80, // 已取消，已支付主动取消
  CANCELED_REJECTION: 80, // 已取消，拒收
};

// 售后状态（预定系统不使用）
// export const AfterServiceStatus = {
//   TO_AUDIT: 10, // 待审核
//   THE_APPROVED: 20, // 已审核
//   HAVE_THE_GOODS: 30, // 已收货
//   ABNORMAL_RECEIVING: 40, // 收货异常
//   COMPLETE: 50, // 已完成
//   CLOSED: 60, // 已关闭
// };

// 售后类型（预定系统不使用）
// export const ServiceType = {
//   RETURN_GOODS: 10, // 退货退款
//   ONLY_REFUND: 20, // 仅退款
//   ORDER_CANCEL: 30, // 支付后取消
// };

// 售后服务按钮类型（预定系统不使用）
// export const ServiceButtonTypes = {
//   REVOKE: 2, // 撤销
//   FILL_TRACKING_NO: 3, // 填写运单号
//   CHANGE_TRACKING_NO: 4, // 修改运单号
//   VIEW_DELIVERY: 5, // 查看物流
// };

export const OrderButtonTypes = {
  PAY: 1, // 付款（预定系统不使用）
  CANCEL: 2, // 取消预定
  CONFIRM: 3, // 确认收货（预定系统不使用）
  APPLY_REFUND: 4, // 申请售后（预定系统不使用）
  VIEW_REFUND: 5, // 查看退款（预定系统不使用）
  COMMENT: 6, // 评价（预定系统不使用）
  DELETE: 7, // 删除预定
  DELIVERY: 8, // 查看物流（预定系统不使用）
  REBUY: 9, // 再次预定
  INVITE_GROUPON: 11, // 邀请好友拼团（预定系统不使用）
};

// 售后服务按钮类型（预定系统不使用）
// export const ServiceButtonTypes = {
//   REVOKE: 2, // 撤销
//   FILL_TRACKING_NO: 3, // 填写运单号
//   CHANGE_TRACKING_NO: 4, // 修改运单号
//   VIEW_DELIVERY: 5, // 查看物流
// };
