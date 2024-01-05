import {createRouter, createWebHistory} from 'vue-router'

const routerHistory = createWebHistory()

import Vindex from './views/index/Vindex.vue'
import Vgroup from "@/views/groupchat/Vgroup.vue";
import Vteam from "@/views/team/Vteam.vue";
import Vpend from "@/views/pending/Vpend.vue";

// 定义路由
const routes = [
    {
        path: '/',
        name: 'Vindex',
        component: Vindex
    },
    {
        path:'/groupchat',
        name: 'Vgroup',
        component: Vgroup
    },
    {
        path:'/team',
        name: 'Vteam',
        component: Vteam
    },
    {
        path:'/pend',
        name: 'Vpend',
        component: Vpend
    }

]


// 创建路由器
const router = createRouter({
    history: routerHistory,
    routes: routes
})


export default router;