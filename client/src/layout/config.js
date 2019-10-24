const routeConfig = [
  {
    title: '首页',
    path: '/home_page',
    key: 'homepage',
    icon: 'user'
  },
  {
    title: '测试主页',
    icon: 'user',
    key: 'test',
    children: [
      {
        title: '分析页',
        path: '/dashboard/analysis',
        key: 'analysis',
        icon: 'user'
      },
      {
        title: '监控',
        path: '/dashboard/monitor',
        key: 'monitor',
        icon: 'user'
      },
      {
        title: '工作区',
        path: '/dashboard/workplace',
        key: 'workplace',
        icon: 'user'
      }
    ]
  },
  {
    title: '卡片页',
    path: '/user_list',
    key: 'user_list',
    icon: 'user'
  }
]

export default routeConfig
