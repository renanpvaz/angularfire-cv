(function() {
  'use strict';

  angular
    .module('angularfireCvApp')
    .controller('ScrollTestCtrl', ScrollTestCtrl);

  ScrollTestCtrl.$inject = ['user', 'Ref', 'cvService', '$location', '$scope', '$rootScope'];

  function ScrollTestCtrl(user, Ref, cvService, $location, $scope, $rootScope) {
    var vm = this;
    var name = $location.path().split('/')[2]

    vm.user = user || {};
    vm.cvProfile = cvService.profile(name);
    vm.loading = true;
    vm.sections = cvService.sections(name);
    vm.allowedForEditing = false;

    vm.save = function(section, keepActive) {
      if(vm.allowedForEditing) {
        vm.sections.$save(section);
      }
    }

    vm.capitalize = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    $rootScope.$on('activeSectionToggle', function(event, data) {
      vm.active = data.id;
    });

    Ref.child('cv/' + name + 'sections').on('value', function() {
      vm.loading = false;
    });

    //FIXME

    $scope.$watchCollection(['vm.cvProfile', 'vm.user'], function(newVal) {
      if(newVal) {
        console.log(newVal);
        vm.allowedForEditing = newVal[0].id === newVal[1].uid;
      }
    });

    vm.toggleEdit = function(section) {
      if (vm.allowedForEditing) {
        section.editing = !section.editing;
        vm.save(section);
      }
    };
  }
})();
