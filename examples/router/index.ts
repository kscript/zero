import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: '/docs',
    children: [
      {
        path: '/docs',
        name: 'docs',
        redirect: '/docs/Installation',
        component: () => import('../views/Docs.vue'),
        children: [
          {
            path: '/docs/:id',
            name: 'docsView',
            props: true,
            component: () => import('../views/View.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
