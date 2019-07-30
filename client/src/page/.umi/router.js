import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import history from '@tmp/history';


const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    "path": "/",
    "component": require('../layout').default,
    "routes": [
      {
        "path": "/",
        "component": require('../helloworld').default,
        "exact": true
      },
      {
        "path": "/helloWorld",
        "component": require('../helloworld').default,
        "exact": true
      },
      {
        "path": "/dashboard",
        "routes": [
          {
            "path": "/dashboard/analysis",
            "component": require('../Dashboard/Analysis').default,
            "exact": true
          },
          {
            "path": "/dashboard/monitor",
            "component": require('../Dashboard/Monitor').default,
            "exact": true
          },
          {
            "path": "/dashboard/workplace",
            "component": require('../Dashboard/Workplace').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/mingyang/Desktop/project_file/fullStack/client/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/page', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/cardPage",
        "component": require('../CardPage').default,
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/mingyang/Desktop/project_file/fullStack/client/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/page', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/mingyang/Desktop/project_file/fullStack/client/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/page', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper() {
  return (
<Router history={history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
