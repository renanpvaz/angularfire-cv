(function() {
  'use strict';

    angular
      .module('angularfireCvApp')
      .directive('cvSidebar', sideBar);

      sideBar.$inject = ['cvService', '$rootScope', '$location'];

      function sideBar(cvService, $rootScope, $location) {
        return {
          templateUrl: 'template/sidebar.directive.html',
          restrict: 'E',
          scope: {},
          controller: function() {
            var vm = this;
            var name = $location.path().split('/')[2];

            vm.open = false;
            vm.sections = cvService.sections(name)
              .sort(function(left, right){
                return left.position > right.position;
              });

            vm.togglePosition = function(section) {
              vm.active = section.$id;
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
