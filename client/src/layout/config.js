const routeConfig = [
  {
    title: '首页',
    path: '/home_page',
    key: 'homepage',
    icon: 'bank'
  },
  {
    title: '示例',
    icon: 'calendar',
    key: 'base_component',
    children: [
      {
        title: '图表',
        path: '/dashboard/analysis',
        key: 'analysis',
        icon: 'account-book'
      },
      {
        title: '基础组件',
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
    title: '预算',
    key: 'budget',
    icon: 'scan',
    children: [
      {
        title: '图表',
        path: '/decorate_budget',
        key: 'decorate_budget',
        icon: 'safety'
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
