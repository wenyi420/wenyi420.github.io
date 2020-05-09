import Vue from "vue";
import VueRouter from "vue-router";
import ParkList from "../views/ParkList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ParkList",
    component: ParkList,
  },
  {
    path: "/parkmap",
    name: "ParkMap",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "parkmap" */ "../views/ParkMap.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
