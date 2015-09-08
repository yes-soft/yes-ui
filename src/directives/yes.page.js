(function (angular) {
    angular.module('yes.ui')
        .directive('yesPage', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                }
            }
        });
})(angular);