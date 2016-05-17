(function() {
  'use strict';

  angular
    .module('angularfireCvApp')
    .controller('ScrollTestCtrl', ScrollTestCtrl);

  ScrollTestCtrl.$inject = ['user', 'Ref', 'cvService', '$location', '$scope', '$rootScope'];

  function ScrollTestCtrl(user, Ref, cvService, $location, $scope, $rootScope) {
    var vm = this;
    var name = $location.path().split('/')[2];

    vm.user = user || {};
    vm.cvProfile = cvService.profile(name);
    vm.loading = true;
    vm.sections = cvService.sections(name);
    vm.allowedForEditing = false;

    vm.save = function(section) {
      if(vm.allowedForEditing) {
        vm.sections.$save(section);
      }
    };

    vm.capitalize = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    $rootScope.$on('activeSectionToggle', function(event, data) {
      vm.active = data.id;
    });

    Ref.child('cv/' + name + '/sections').on('value', function(snapshot) {
      if(!vm.active) {
        snapshot.forEach(function(data) {
          if(data.val().position === 1) {
            vm.active = data.key();
          }
        });
      }
      vm.loading = false;
    });

    Ref.child('cv/renan/profile').on('value', function(snapshot) {
      vm.allowedForEditing = snapshot.val().uid === vm.user.uid;
    });

    vm.toggleEdit = function(section) {
      if (vm.allowedForEditing) {
        section.editing = !section.editing;
        vm.save(section);
      }
    };
  }
})();
