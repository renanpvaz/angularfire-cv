(function() {
  'use strict';

    angular
      .module('angularfireCvApp')
      .directive('cvSidebar', sideBar);

      sideBar.$inject = ['sections'];

      function sideBar(sections) {
        return {
          templateUrl: 'scripts/directives/sidebar.directive.html',
          restrict: 'E',
          scope: {},
          controller: function() {
            this.sections = sections;
          },
          controllerAs: 'vm'
        }
      };
})();
