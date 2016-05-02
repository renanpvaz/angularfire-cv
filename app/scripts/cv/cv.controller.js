(function() {
  'use strict';

  angular
    .module('angularfireCvApp')
    .controller('ScrollTestCtrl', ScrollTestCtrl);

  ScrollTestCtrl.$inject = ['$document', 'user', 'profileUid', 'Ref', 'cvService'];

  function ScrollTestCtrl($document, user, profileUid, Ref, cvService) {
    var vm = this;
    vm.user = user || {};
    vm.allowedForEditing = profileUid === vm.user.uid;
    vm.cvProfile = cvService.profile;
    vm.loading = true;
    vm.sections = cvService.sections;

    vm.save = function(section, keepActive) {
      keepActive = keepActive || section.position === 1;

      if(!keepActive)
        section.active = false;

      vm.sections.$save(section);
    }

    Ref.child('sections').on('value', function(snapshot) {
      vm.sections.forEach(
        function(section) {
          if(section.position !== 1) section.active = false;
          vm.save(section);
      });
      vm.loading = false;
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    })

    vm.slider = {
      options: {
          translate: function() { return ''; },
          showSelectionBar: true,
          floor: 0,
          ceil: 100,
          step: 1,
          readOnly: !vm.allowedForEditing
      }
  }

    vm.toggleEdit = function(section) {
      if (vm.allowedForEditing) {
        section.editing = !section.editing;
        vm.save(section);
      }
    };
  }
})();
