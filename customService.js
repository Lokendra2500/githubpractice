/*
    * Auther Name: Lokendra Prajapati   
    * Date: Friday, April 8, 2016
    * File info.: This javascript file create the custom services for squaring the given number   and revrsing the given string.
*/

var customService = angular.module('customService', [])
.service('square', function () {  //create a service useing service function.
    this.square = function (a) { return a*a};

});

customService.factory('revrseString', function () { //create a service using factory function.

   var r=  function reverse(s) {
        var o = '';
        for (var i = s.length - 1; i >= 0; i--)
            o += s[i];
        return o;
    }

   return{
       reverseString: function reverseString(name)
       {
           return r(name);
       }
   }

});