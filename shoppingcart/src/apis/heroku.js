import req from "./https.js";

const baseURL = "https://vueshopcart.herokuapp.com";

//  取得訂單數量
export const apiGetOrderList = () => req("get", `${baseURL}/orderlist`);

// 刪除訂單
export const apiDeleteOrderItem = (id) =>
  req("delete", `${baseURL}/orderlist/${id}`);

// 取得該訂單
export const apiGetOrderItem = (id) => req("get", `${baseURL}/orderlist/${id}`);

// 更新訂單
export const apiUpdateOrderItem = (id, data) =>
  req("patch", `${baseURL}/orderlist/${id}`, data);

// 購物車新增訂單
export const apiPostCartListOrder = (data) =>
  req("post", `${baseURL}/orderlist`, data);

// 比對登入後台帳密
export const apiGetAdminUser = () => req("get", `${baseURL}/admin`);
