'use strict'; 
/**
 * @ngdoc function
 * @name angularfireCvApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('angularfireCvApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.oauthLogin = function(provider) {
      $scope.err = null;
      Auth.$authWithOAuthPopup(provider, {rememberMe: true}).then(redirect, showError);
    };

    $scope.anonymousLogin = function() {
      $scope.err = null;
      Auth.$authAnonymously({rememberMe: true}).then(redirect, showError);
    };

    function redirect() {
      $location.path('/account');
    };

    function showError(err) {
      $scope.err = err;
    };
  });
