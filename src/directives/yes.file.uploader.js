(function () {
    'use strict';
    angular.module('yes.ui')
        .directive('yesFileUploader', ['$location', 'utils', 'settings', 'FileUploader',
            function ($location, utils, settings, FileUploader) {
                return {
                    restrict: 'EA',
                    templateUrl: settings.templates.import,
                    replace: true,
                    scope: {
                        options: "="
                    },
                    controller: ['$scope', '$attrs', '$element',
                        function ($scope, $attrs, $element) {
                            var options = $scope.options || {};

                            $scope.title = options.title;

                            var url = options.url || "/upload";
                            url = utils.getAbsUrl(url);

                            var uploader = $scope.uploader = new FileUploader({
                                url: url
                            });


                            uploader.filters.push({
                                name: 'customFilter',
                                fn: function (item, options) {
                                    return this.queue.length < 10;
                                }
                            });

                            uploader.onSuccessItem = function (item, res, status, headers) {
                                if (angular.isArray(res.message))
                                    $scope.message = res.message.split("<br>");
                                else
                                    $scope.message = res.message;
                                if (angular.isFunction(options.resolve)) {
                                    var context = {'scope': $scope};
                                    context.res = res;
                                    options.resolve.apply(context);
                                }
                            };
                        }]
                };
            }]);
})();