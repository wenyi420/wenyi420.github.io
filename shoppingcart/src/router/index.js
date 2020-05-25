import Vue from "vue";
import VueRouter from "vue-router";
import movieList from "../views/movieList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "movieList",
    component: movieList,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin.vue"),
    children: [
      {
        path: "orderList",
        name: "orderList",
        component: () => import("@/views/orderList.vue"),
      },
      {
        path: "editOrder/:orderID",
        name: "editOrder",
        component: () => import("@/views/editOrder.vue"),
      },
    ],
  },
  {
    path: "/movies/:movieID",
    name: "movieDetail",
    component: () => import("@/views/movieDetail.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/cart.vue"),
    children: [
      {
        path: "cartList",
        name: "cartList",
        component: () => import("@/views/cartList.vue"),
      },
      {
        path: "customerInfo",
        name: "customerInfo",
        component: () => import("@/components/customerInfo.vue"),
      },
      {
        path: "checkInfo",
        name: "checkInfo",
        component: () => import("@/components/checkInfo.vue"),
      },
    ],
  },
  {
    path: "*", // 若都無符合上述條件，則轉址「Home首頁」
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
