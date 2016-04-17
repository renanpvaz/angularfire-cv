(function() {

  angular
    .module('angularfireCvApp')
    .controller('ScrollTestCtrl', ScrollTestCtrl)
    .value('duScrollOffset', 30);

  ScrollTestCtrl.$inject = ['$document', 'sections', 'user', 'profileUid', 'Ref', '$firebaseObject', '$firebaseArray'];

  function ScrollTestCtrl($document, sections, user, profileUid, Ref, $firebaseObject, $firebaseArray) {
    var vm = this;
    vm.user = user || {};
    vm.sections = sections;
    vm.allowedForEditing = profileUid === vm.user.uid;
    vm.cvProfile = $firebaseObject(Ref.child('users/' + profileUid));
    vm.loading = true;

    Ref.on('value', function (snapshot) {
      vm.loading = false;
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

    vm.slider = {
      options: {
          translate: function(value) { return ''; },
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
      };
    };

    vm.toTheTop = function() {
      $document.scrollTopAnimated(0, 5000).then(function() {
        console && console.log('You just scrolled to the top!');
      });
    };
  };
})()
