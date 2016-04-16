(function() {

  angular
    .module('angularfireCvApp')
    .directive('cvSignInButton', signInButton);

    signInButton.$inject = ['Auth', '$location', '$route'];

    function signInButton(Auth, $location, $route) {
      return {
        restrict: 'E',
        templateUrl: 'scripts/angularfire/sign-in-button.html',
        controllerAs: 'vm',
        controller: function() {
          var vm = this;
          vm.btnText = Auth.$getAuth() === null ? 'Sign in with Google' : 'Logout';

          vm.logInOrOut = function() {
            console.log('!!!');
            if(Auth.$getAuth()) {
              Auth.$unauth();
              vm.btnText = 'Sign in with Google';
              $route.reload();
            }
            else {
              Auth.$authWithOAuthPopup('google', {rememberMe: true}).then(redirect, showError);
            };
          };

          function redirect() {
            vm.btnText = 'Logout';
            $route.reload();
          };

          function showError(err) {
            vm.err = err;
          };
        }
      };
    };
})();
