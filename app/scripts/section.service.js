(function() {

  angular
    .module('angularfireCvApp')
    .factory('sectionService', sectionService)

    function sectionService($firebaseArray, Ref) {
      return {
        get: function() {
          return $firebaseArray(Ref.child('sections'));
        }
      };
    };

})();
