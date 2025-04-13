import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/pages/Home.vue'
import Puzzle from '../components/pages/Puzzle.vue'
import { ROUTER_NAMES } from './routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: ROUTER_NAMES.HOME,
    component: Home
  },
  {
    path: '/puzzle',
    name: ROUTER_NAMES.PUZZLE,
    component: Puzzle
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
