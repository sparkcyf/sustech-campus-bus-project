import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import App from '../App.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
    meta: {
      title: 'SUSTech Next Bus',
      metaTags: [
        {
          name: 'description',
          content: 'A bus ETA prediction and timetable application.'
        },
        {
          property: 'og:description',
          content: 'A bus ETA prediction and timetable application.'
        },
        {
          property: 'og:image',
          content: 'https://i.loli.net/2020/12/06/6x3rAC2zdMefTO5.jpg'
        }
      ]
    }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
