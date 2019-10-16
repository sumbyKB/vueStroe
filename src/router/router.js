import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/menu/menu'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/login', name: 'login', component: () => import('@/views/login/index'),meta: {menuShow: false}},

    {   path: '/',
        component: Menu,
        meta: {
          menuShow: true,          // 是否在导航栏中显示
          menuName: '首页',     // 导航栏中显示的名称 
        },
        children: [
            {
              path: '/home',
              name: 'home',
              component: () => import('@/views/home/index'),
              meta: { menuShow: true, menuName:'首页'}
            }
        ]
    },

    {   path: '/shop',
        component: Menu,
        meta: {
          menuShow: true,          // 是否在导航栏中显示
          menuName: '商品管理',     // 导航栏中显示的名称 
        },
        children: [
          {
            path: '/shop/index',
            name: 'shop',
            component: () => import('@/views/shop/index'),
            meta: { menuShow: true, menuName:'普通商品管理'}
          },
          { 
            path: '/shop/welfare', 
            name: 'welfare',
            component: () => import('@/views/shop/welfare'),
            meta: { menuShow: true, menuName: '兑换商品管理'}
          }
      ]
    },

    {   path: '/product',
        component: Menu,
        meta: {
          menuShow: true,          // 是否在导航栏中显示
          menuName: '订单管理',     // 导航栏中显示的名称 
        },
        children: [
          {
            path: '/product/index',
            name: 'product',
            component: () => import('@/views/product/index'),
            meta: { menuShow: true, menuName:'普通订单管理'}
          },
          { 
            path: '/product/refund', 
            name: 'refund',
            component: () => import('@/views/product/refund'),
            meta: { menuShow: true, menuName: '退货 退款管理'}
          }
      ]
    },

    {   path: '/user',
        component: Menu,
        meta: {
          menuShow: true,          // 是否在导航栏中显示
          menuName: '用户管理',     // 导航栏中显示的名称 
        },
        children: [
          {
            path: '/user/index',
            name: 'user',
            component: () => import('@/views/user/index'),
            meta: { menuShow: true, menuName:'会员用户管理'}
          },
          { 
            path: '/user/admin_user', 
            name: 'admin_user',
            component: () => import('@/views/user/admin_user'),
            meta: { menuShow: true, menuName: '管理员管理'}
          }
      ]
    },

    {   path: '/sign',
        component: Menu,
        meta: {
          menuShow: true,          // 是否在导航栏中显示
          menuName: '签到币管理',     // 导航栏中显示的名称 
        },
        children: [
            {
              path: '/sign/index',
              name: 'sign',
              component: () => import('@/views/sign/index'),
              meta: { menuShow: true, menuName:'签到币管理'}
            }
        ]
    }

  ]
})
