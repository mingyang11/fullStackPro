const routeConfig = [
  {
    title: '首页',
    path: '/home_page',
    key: 'homepage',
    icon: 'bank'
  },
  {
    title: '基础组件',
    icon: 'calendar',
    key: 'base_component',
    children: [
      {
        title: '分析页',
        path: '/dashboard/analysis',
        key: 'analysis',
        icon: 'account-book'
      },
      {
        title: '监控',
        path: '/dashboard/monitor',
        key: 'monitor',
        icon: 'api'
      },
      {
        title: '工作区',
        path: '/dashboard/workplace',
        key: 'workplace',
        icon: 'appstore'
      }
    ]
  },
  {
    title: '列表页',
    path: '/user_list',
    key: 'user_list',
    icon: 'user'
  }
]

export default routeConfig
