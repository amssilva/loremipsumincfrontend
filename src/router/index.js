import Vue from 'vue'
import VueRouter from 'vue-router'
import Listagem from '../components/Listagem.vue'
import Cadastrar from '../components/Cadastrar.vue'
import Editar from '../components/Editar.vue'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Listagem',
    component: Listagem
  },
  {
    path: '/cadastrar',
    name: 'Cadastrar',
    component: Cadastrar
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: Editar
  },
  {
    path: '*',
    component: Listagem
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
