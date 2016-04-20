(function() {
  'use strict';

    angular
      .module('angularfireCvApp')
      .directive('cvSidebar', sideBar);

      sideBar.$inject = ['cvService'];

      function sideBar(cvService) {
        return {
          templateUrl: 'template/sidebar.directive.html',
          restrict: 'E',
          scope: {},
          controller: function() {
            this.sections = cvService.sections;

            this.titleBreaksLine = function(title) {
              return title.length > 13;
            };
          },
          controllerAs: 'vm'
        };
      }
})();
