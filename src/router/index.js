import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from '../views/Base.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'base',
    component: Base
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
