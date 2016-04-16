(function() {

  angular
    .module('angularfireCvApp')
    .factory('sections', sections);

    function sections($firebaseArray, Ref) {
      return $firebaseArray(Ref.child('sections'));
    };
})();
