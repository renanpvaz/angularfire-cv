(function() {
  'use strict';

    angular
      .module('angularfireCvApp')
      .directive('cvSidebar', sideBar);

      sideBar.$inject = ['cvService', '$rootScope'];

      function sideBar(cvService, $rootScope) {
        return {
          templateUrl: 'template/sidebar.directive.html',
          restrict: 'E',
          scope: {},
          controller: function() {
            var vm = this;

            vm.open = false;
            vm.sections = cvService.sections('renan')
              .sort(function(left, right){
                return left.position > right.position;
              });

            vm.togglePosition = function(section) {
              $rootScope.$broadcast('activeSectionToggle', { id: section.$id });
            };

            vm.titleBreaksLine = function(title) {
              return title.length > 13;
            };
          },
          controllerAs: 'vm'
        };
      }
})();
