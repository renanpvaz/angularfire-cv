(function() {
  'use strict';

  angular
    .module('angularfireCvApp')
    .factory('cvService', cvService);

    cvService.$inject = ['$firebaseObject', '$firebaseArray', 'Ref', 'profileUid'];

    function cvService($firebaseObject, $firebaseArray, Ref, profileUid ) {
      return {
        sections: $firebaseArray(Ref.child('sections')),
        profile: $firebaseObject(Ref.child('users/' + profileUid))
      };
    }
})();
