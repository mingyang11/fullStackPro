const routeConfig = [
    {
        title: 'helloWorld',
        path: '/helloWorld',
        key: 'helloWorld',
    },
    {
        title: 'dashboard',
        key: 'dashboard',
        children: [
            {
                title: 'analysis',
                path: '/dashboard/analysis',
                key: 'analysis',
            },
            {
                title: 'monitor',
                path: '/dashboard/monitor',
                key: 'monitor',
            },
            {
                title: 'workplace',
                path: '/dashboard/workplace',
                key: 'workplace',
            },
        ]
    },
    {
        title: 'cardPage',
        path: '/cardPage',
        key: 'cardPage',
    }
]

export default routeConfig;