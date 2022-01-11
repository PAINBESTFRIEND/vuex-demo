import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component:function(){
      return import('@/views/Home')
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/counter', // 计数器案例页面
    name: 'Counter',
    component: () => import(/* webpackChunkName: "about" */ '../views/Counter.vue')
  },
  {
    path: '/todos', // 购物车案例页面
    name: 'Todos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Todos.vue')
  },
  {
    path: '/todos-demo',//购物车案例再敲一次
    name: 'Todos-demo',
    component: () =>import('../views/Todos-demo')
  }
]

const router = new VueRouter({
  routes
})

export default router
