(function (angular) {
    angular.module('yes.ui')
        .directive('yesMenu', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                }
            }
        });
})(angular);