const GetUserInfo = window['YZG_GetUserInfo'];  // 获取是否是店主
const GetAllAssistance = window['YZG_GetAllAssistance']; // 获取营业员列表 
const PrintTodySaleOrders = window['YZG_PrintTodySaleOrders']; // 打印今日流水接口
const isSetPrint = window['YZG_IsSetPrint']; // 是否开启了打印权限
const getSaleList = window['YZG_GetSaleList']; // 进销存查询表格详情 
const printTheSaleOrder = window['YZG_PrintTheSaleOrder']; // 打印小票
const GetOrgCode = window['YZG_GetOrgCode']; // 获取机构号
const GetSaleOrderStatistic = window['YZG_GetSaleOrderStatistic']; // 今天  昨天  本月 上月 数据
const GetSaleOrderSummary = window['YZG_GetSaleOrderSummary']; // 查看更多的右侧数据
const exportSaleOrder = window['YZG_ExportSaleOrder']; // 导出明细
const GetSaleItemDetail = window['YZG_GetSaleItemDetail']; // 地区热销
const GetPostConfig = window['YZG_GetPostConfig']; // 获取邮政积分权限 postIntergralStatus  //0:无邮政积分权限 1：邮政积分抵扣 2：邮政积分兑换（积分付） 1,2 显示邮政积分
const CheckNetstat = window['YZG_CheckNetstat'];   // 查询是否在线的状态
export default {
    GetUserInfo,
    GetAllAssistance,
    PrintTodySaleOrders,
    isSetPrint,
    getSaleList,
    printTheSaleOrder,
    GetOrgCode,
    GetSaleOrderStatistic,
    GetSaleOrderSummary,
    exportSaleOrder,
    GetSaleItemDetail,
    GetPostConfig,
    CheckNetstat
}