(function() {
  'use strict';

    angular
      .module('angularfireCvApp')
      .directive('cvSidebar', sideBar);

      sideBar.$inject = ['cvService'];

      function sideBar(cvService) {
        return {
          templateUrl: 'scripts/sidebar/sidebar.directive.html',
          restrict: 'E',
          scope: {},
          controller: function() {
            this.sections = cvService.sections;
          },
          controllerAs: 'vm'
        };
      }
})();
