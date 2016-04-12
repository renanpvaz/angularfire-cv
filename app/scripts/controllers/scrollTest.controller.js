angular.module('angularfireCvApp')
  .controller('ScrollTestCtrl', function($scope, $document, sectionService, user){
    $scope.user = user;

    $scope.sections = sectionService.get();

    $scope.toggleEdit = function(section) {
      section.editing = !section.editing;
      $scope.sections.$save(section);
    };

    $scope.getNumberOfRows = function(text) {
      console.log(((text.match(/\n/g)||[]).length));
      return ((text.match(/\n/g)||[]).length) * 2;
    };

    $scope.toTheTop = function() {
      console.log($scope.sections);
      $document.scrollTopAnimated(0, 5000).then(function() {
        console && console.log('You just scrolled to the top!');
      });
    };
    var section3 = angular.element(document.getElementById('section-3'));
    $scope.toSection3 = function() {
      $document.scrollToElementAnimated(section3);
    };
  }
  ).value('duScrollOffset', 30);
