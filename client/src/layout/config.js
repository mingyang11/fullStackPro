const routeConfig = [
    {
        title: '首页',
        path: '/helloWorld',
        key: 'helloWorld',
    },
    {
        title: '测试主页',
        key: 'dashboard',
        children: [
            {
                title: '分析页',
                path: '/dashboard/analysis',
                key: 'analysis',
            },
            {
                title: '监控',
                path: '/dashboard/monitor',
                key: 'monitor',
            },
            {
                title: '工作区',
                path: '/dashboard/workplace',
                key: 'workplace',
            },
        ]
    },
    {
        title: '卡片页',
        path: '/cardPage',
        key: 'cardPage',
    }
]

export default routeConfig;