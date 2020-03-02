import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'components/Login'
import Home from 'components/home'
import Role from 'views/system/role'
import User from 'views/system/user'
import Menu from 'views/system/menu'
import localStore from 'storejs'
import ObjUtil from "../util/ObjUtil";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '/user',
                component: User,
            },
            {
                path: '/role',
                component: Role,
            },
            {
              path: '/menu',
              component: Menu,
            }
        ]
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let info = localStore.get('loginInfo')
    if (ObjUtil.isEmpty(info) && to.path !== '/login') {
        next('/login')
    }
    next()
})

export default router
