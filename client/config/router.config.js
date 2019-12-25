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
        redirect: '/home_page'
      },
      {
        path: '/home_page',
        component: 'HomePage/index'
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
            component: '404'
          }
        ]
      },
      {
        path: '/jest_learn',
        component: 'JestLearn/index'
      },
      {
        path: '/user_list',
        component: 'UserList'
      },
      {
        path: '/decorate_budget',
        component: 'Budget'
      },
      {
        path: '/budget_add',
        component: 'Budget/BudgetAdd'
      },
      {
        component: '404'
      }
    ]
  }
]
