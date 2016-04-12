/*
    * Auther Name: Lokendra Prajapati   
    * Date: Friday, April 8, 2016
    * File info.: This javascript file create the controllers for squaring a number and revrsing a   string.
*/

var myApp = angular.module('myApp', ['customService']); //here we call the customService as a dependancy.

myApp.controller('squareController', function ($scope, square) {

    $scope.findSquare = function () {
        $scope.answer = square.square($scope.number);
    }
});

myApp.controller('revrseStringController', function ($scope, revrseString) {

    $scope.findReverse = function () {
        $scope.reversename = revrseString.reverseString($scope.name);
    }
});