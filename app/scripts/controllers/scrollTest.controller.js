angular.module('angularfireCvApp')
  .controller('ScrollTestCtrl', function($scope, $document, $firebaseArray, Ref){
    $scope.edit = false;

    $scope.sections = $firebaseArray(Ref.child('sections'));

    $scope.sections.$add({
      title: "About me",
      body: "Hello world"
    });

    $scope.toTheTop = function() {
      console.log($scope.sections);
      $document.scrollTopAnimated(0, 5000).then(function() {
        console && console.log('You just scrolled to the top!');
      });
    }
    var section3 = angular.element(document.getElementById('section-3'));
    $scope.toSection3 = function() {
      $document.scrollToElementAnimated(section3);
    }
  }
  ).value('duScrollOffset', 30);
