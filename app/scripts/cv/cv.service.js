(function() {
  'use strict';

  angular
    .module('angularfireCvApp')
    .factory('cvService', cvService);

    cvService.$inject = ['$firebaseObject', '$firebaseArray', 'Ref'];

    function cvService($firebaseObject, $firebaseArray, Ref) {
      var base = 'cv/';

      return {
        sections: function(name) {
          return $firebaseArray(Ref.child(base + name + '/sections').orderByChild('position'));
        },
        profile: function(name) {
          return $firebaseObject(Ref.child(base + name + '/profile'));
        }
      };
    }
})();
