angular.module('angularfireCvApp')
  .controller('SidebarCtrl', function($scope, $document, sectionService){
    $scope.sections = sectionService.get();

    var section3 = angular.element(document.getElementById('section-3'));
    $scope.toSection3 = function() {
      $document.scrollToElementAnimated(section3);
    }
  }
  ).value('duScrollOffset', 30);
