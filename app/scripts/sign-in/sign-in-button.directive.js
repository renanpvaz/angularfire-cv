(function() {
  'use strict';

  angular
    .module('angularfireCvApp')
    .directive('cvSignInButton', signInButton);

    signInButton.$inject = ['Auth', '$location', '$route'];

    function signInButton(Auth, $location, $route) {
      return {
        restrict: 'E',
        templateUrl: 'template/sign-in-button.html',
        controllerAs: 'vm',
        controller: function() {
          var vm = this;

          vm.user = Auth.$getAuth();
          vm.btnText = !vm.user ? 'Sign in with Google' : 'Logout';

          vm.logInOrOut = function() {
            if(vm.user) {
              Auth.$unauth();
              vm.btnText = 'Sign in with Google';
              $route.reload();
              vm.user = {};
            }
            else {
              Auth.$authWithOAuthPopup('google', {rememberMe: true})
                .then(redirect, showError);
            }
          };

          function redirect() {
            vm.btnText = 'Logout';
            $route.reload();
          }

          function showError(err) {
            vm.err = err;
          }
        }
      };
    }
})();
