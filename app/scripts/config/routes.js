'use strict';

angular
  .module('angularfireCvApp')
  .config(['$routeProvider', 'SECURED_ROUTES', function($routeProvider, SECURED_ROUTES) {

    $routeProvider.whenAuthenticated = function(path, route) {
      route.resolve = route.resolve || {};
      route.resolve.user = ['Auth', function(Auth) {
        return Auth.$requireAuth();
      }];
      $routeProvider.when(path, route);
      SECURED_ROUTES[path] = true;
      return $routeProvider;
    };

  }])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/cv/renan', {
        templateUrl: 'template/cv.html',
        controller: 'ScrollTestCtrl',
        controllerAs: 'vm',
        resolve: {
          user: ['Auth', function(Auth) {
            return Auth.$getAuth();
          }]
        }
      })
      .when('/cv/bruno', {
        templateUrl: 'template/cv.html',
        controller: 'ScrollTestCtrl',
        controllerAs: 'vm',
        resolve: {
          user: ['Auth', function(Auth) {
            return Auth.$getAuth();
          }]
        }
      });
  }])

  .run(['$rootScope', '$location', 'Auth', 'SECURED_ROUTES', 'loginRedirectPath',
    function($rootScope, $location, Auth, SECURED_ROUTES, loginRedirectPath) {

      Auth.$onAuth(check);

      function check(user) {
        if( !user && authRequired($location.path()) ) {
          $location.path(loginRedirectPath);
        }
      }

      function authRequired(path) {
        return SECURED_ROUTES.hasOwnProperty(path);
      }
    }
  ])

  .constant('SECURED_ROUTES', {});
