angular.module('yes.ui')
    .directive('yesTreeView', function ($compile, $templateCache, $http) {
        return {
            link: function (scope, element, attrs) {
                $http.get("plugins/base/templates/tree-view.html", {cache: $templateCache})
                    .success(function (html) {
                        element.html('').append($compile(html)(scope));
                    });
            }
        };
    });