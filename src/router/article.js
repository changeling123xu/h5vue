export default [
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "article" */ 'views/Order/index.vue'),
    meta: {
      auth: true,
      title: '订单',
      keepAlive: true
    }
  },
  {
    path: '/article',
    name: 'aticle',
    component: () => import(/* webpackChunkName: "article" */ 'views/Article.vue'),
    meta: {
      auth: true,
      title: '订单',
      keepAlive: true
    }
  }

]
