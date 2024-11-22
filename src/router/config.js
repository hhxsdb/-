const routes = [
    {
        path: '/center',
        component: () => import('@/views/center/Center.vue')
    }, {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/Home.vue')
    }, {
        path: '/user-manage/add',
        component: () => import('@/views/user-manage/UserAdd.vue'),
        requireAdmin: true
    },
    {
        path: '/user-manage/list',
        component: () => import('@/views/user-manage/UserList.vue'),
        requireAdmin: true
    },
    {
        path: '/product-manage/add',
        component: () => import('@/views/product-manage/ProductAdd.vue')
    },
    {
        path: '/product-manage/list',
        component: () => import('@/views/product-manage/ProductList.vue')
    },
    {
        path: '/news-manage/add',
        component: () => import('@/views/news-manage/NewsAdd.vue')
    },
    {
        path: '/news-manage/list',
        component: () => import('@/views/news-manage/NewsList.vue')
    },
    // 捕获未知路由
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/NotFound.vue')
    }
]

export default routes