export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: './Users/Login.js',
      },
      {
        path: '/user/register',
        name: 'register',
        component: './Users/register.js',
      },
      {
        path: '/user/forget',
        name: 'forget',
        component: './Users/forget.js',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      {
        path: '/',
        redirect: '/dashboard/analysis',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/analysis/index',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/monitor/index',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/workplace/index',
          },
        ],
      },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: 'Welcome',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: 'Welcome',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: 'Welcome',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: 'Welcome',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: 'Welcome',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: 'Welcome',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './ListPage/basicListPage/index',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './ListPage/searchListPage/index',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: 'Welcome',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: 'Welcome',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: 'Welcome',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
