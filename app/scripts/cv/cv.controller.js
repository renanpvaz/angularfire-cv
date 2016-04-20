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

    vm.sections.sort(function(first, next) {
      return first.position > next.position;
    });

    Ref.on('value', function () {
      vm.loading = false;
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });

    vm.slider = {
      options: {
          translate: function() { return ''; },
          showSelectionBar: true,
          floor: 0,
          ceil: 100,
          step: 1,
          readOnly: !vm.allowedForEditing
      }
  };

    vm.toggleEdit = function(section) {
      if (vm.allowedForEditing) {
        section.editing = !section.editing;
        vm.sections.$save(section);
      }
    };

    vm.toTheTop = function() {
      $document.scrollTopAnimated(0, 5000).then(function() {
        console.log('You just scrolled to the top!');
      });
    };
  }
})();
