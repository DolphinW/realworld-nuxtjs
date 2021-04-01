import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5cda3e60 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _3518e4d6 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _6d93251a = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _2e77ad33 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _31be09d9 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _510b64a3 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _1541f080 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _5cda3e60,
    children: [{
      path: "",
      component: _3518e4d6,
      name: "home"
    }, {
      path: "/login",
      component: _6d93251a,
      name: "login"
    }, {
      path: "/register",
      component: _6d93251a,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _2e77ad33,
      name: "profile"
    }, {
      path: "/settings",
      component: _31be09d9,
      name: "settings"
    }, {
      path: "/editor",
      component: _510b64a3,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _1541f080,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
