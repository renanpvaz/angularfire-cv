(function() {

  angular
    .module('angularfireCvApp')
    .controller('ScrollTestCtrl', ScrollTestCtrl)
    .value('duScrollOffset', 30);

  ScrollTestCtrl.$inject = ['$document', 'sectionService', 'user', 'profileUid', 'Ref', '$firebaseObject'];

  function ScrollTestCtrl($document, sectionService, user, profileUid, Ref, $firebaseObject) {
    var vm = this;
    vm.user = user || {};
    vm.sections = sectionService.get();
    vm.allowedForEditing = profileUid === vm.user.uid;
    vm.cvProfile = $firebaseObject(Ref.child('users/google:110559871277426908377'));

    vm.toggleEdit = function(section) {
      if (vm.allowedForEditing) {
        section.editing = !section.editing;
        vm.sections.$save(section);
      };
    };

    vm.toTheTop = function() {
      $document.scrollTopAnimated(0, 5000).then(function() {
        console && console.log('You just scrolled to the top!');
      });
    };
  };
})()
