'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('angularfireCvApp')
  .controller('AccountCtrl', function ($scope, user, Auth, Ref, $firebaseObject, $timeout) {
    var profile = $firebaseObject(Ref.child('users/'+user.uid));

    $scope.user = user;

    profile.photo = user.google.profileImageURL;
    profile.name = user.google.displayName;
    profile.$bindTo($scope, 'profile');
    profile.$save();
  });
