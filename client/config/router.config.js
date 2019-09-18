export default [
  {
    path: '/user',
    component: '../layout/userLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: 'Users/login' },
      { path: '/user/register', name: 'register', component: 'Users/register' }
    ]
  },
  {
    path: '/',
    component: '../layout',
    routes: [
      {
        path: '/',
        redirect: '/helloworld'
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
          },
          {
            component: '404'
          }
        ]
      },
      {
        path: '/cardPage',
        component: 'CardPage'
      },
      {
        component: '404'
      }
    ]
  }
]
