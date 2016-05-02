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
            this.open = false;
            this.sections = cvService.sections;

            this.togglePosition = function(section) {
              this.sections.forEach(function(sec) {
                if(sec !== section)
                  sec.active = false;
              });

              section.active = true;
            };

            this.titleBreaksLine = function(title) {
              return title.length > 13;
            };
          },
          controllerAs: 'vm'
        };
      }
})();
