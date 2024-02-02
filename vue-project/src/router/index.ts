import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MyView from '../views/MyView.vue';
import PizzaView from '../views/PizzaView.vue';
import UserView from '../views/UserView.vue';
import ConnectionView from '../views/ConnectionView.vue';
import ProfilView from '../views/ProfilView.vue';
import SettingsView from '../views/SettingsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/amount',
      name: 'myView',
      component: MyView
    },
    {
      path: '/pizza',
      name: 'pizzaView',
      component: PizzaView
    },
    {
      path: '/members',
      name: 'UserView',
      component: UserView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/connexion',
      name: 'ConnectionView',
      component: ConnectionView
    },
    {
      path: '/profil',
      name: 'ProfilView',
      component: ProfilView
    },
    {
      path: '/settings',
      name: 'SettingsView',
      component: SettingsView
    }
  ]
})

export default router
