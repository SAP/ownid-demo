/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Gigya from '@/services/gigya.service'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: 'account'
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('views/Account.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('views/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/Login.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('views/ForgotPassword.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = await Gigya.isLoggedIn();
  // Determine if the route requires Authentication
  const toRequiresAuth = to.matched.some(x => x.meta.requireAuth);
  const toIsGuestRoute = !toRequiresAuth;

  if(isLoggedIn && toIsGuestRoute) return;

  // If it does and they are not logged in, send the user to "/login"
  console.log({to, from})
  if (toRequiresAuth && !isLoggedIn && !toIsGuestRoute) {
    next('/login');
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router
