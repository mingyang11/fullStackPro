export default {
    singular: true,

    plugins: [
        // 这里配置的作用是使用antd的样式的按需加载功能xe
        ['umi-plugin-react', {
            antd: true,
            dva: true,
        }],
    ],

    routes: [
        {
            path: '/user',
            component: '../layout/userLayout',
            routes: [
                { path: '/user', redirect: '/user/login' },
                { path: '/user/login',name: 'login', component: 'Users/login' },
            ],
        },
        {
            path: '/',
            component: '../layout',
            routes: [
                {
                    path: '/',
                    component: 'helloworld',
                },
                {
                    path: '/helloWorld',
                    component: 'helloworld',
                },
                {
                    path: '/dashboard',
                    routes: [
                        {
                            path: '/dashboard/analysis',
                            component: 'Dashboard/Analysis',
                        },
                        {
                            path: '/dashboard/monitor',
                            component: 'Dashboard/Monitor',
                        },
                        {
                            path: '/dashboard/workplace',
                            component: 'Dashboard/Workplace',
                        },
                    ]
                },
                {
                    path: '/cardPage',
                    component: 'CardPage',
                }
            ],
        }
    ],
    proxy: {
        '/dev': {
            target: 'http://127.0.0.1:7001',
            changeOrigin: true,
        },
    },
};