export default [
  {
    path: '/user',
    component: '../layout/userLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: 'Users/login' }
    ]
  },
  {
    path: '/',
    component: '../layout',
    routes: [
      {
        path: '/',
        component: 'helloworld'
      },
      {
        path: '/helloWorld',
        component: 'helloworld'
      },
      {
        path: '/dashboard',
        routes: [
          {
            path: '/dashboard',
            redirect: '/dashboard/analysis'
          },
          {
            path: '/dashboard/analysis',
            component: 'Dashboard/Analysis'
          },
          {
            path: '/dashboard/monitor',
            component: 'Dashboard/Monitor'
          },
          {
            path: '/dashboard/workplace',
            component: 'Dashboard/Workplace'
          }
        ]
      },
      {
        path: '/cardPage',
        component: 'CardPage'
      }
    ]
  }
]
