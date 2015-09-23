(function (angular) {
    angular.module('yes.ui')
        .directive('yesPagination', ['$location', '$timeout', 'i18nService', 'settings',
            function ($location, $timeout, i18nService, settings) {
                return {
                    restrict: 'EA',
                    templateUrl: 'plugins/base/templates/pagination.html',
                    replace: true,
                    scope: {
                        options: '=yesPagination'
                    },
                    link: function (scope, element, attrs) {

                        var self = angular.extend(scope.options, {
                            currentPage: 1,
                            totalItems: 0,
                            getPage: function () {
                                return self.currentPage || 1;
                            },
                            getTotalPages: function () {
                                return (self.totalItems === 0) ? 1 : Math.ceil(self.totalItems / self.pageSize);
                            },
                            nextPage: function () {
                                if (self.totalItems > 0) {
                                    self.currentPage = Math.min(
                                        self.currentPage + 1,
                                        self.getTotalPages()
                                    );
                                } else {
                                    self.currentPage++;
                                }
                            },
                            previousPage: function () {
                                self.currentPage = Math.max(self.currentPage - 1, 1);
                            },
                            seek: function (page) {
                                if (!angular.isNumber(page) || page < 1) {
                                    throw 'Invalid page number: ' + page;
                                }
                                self.currentPage = Math.min(self.getTotalPages());
                            }
                        });

                        scope.pagination = self;

                        self.cantPageForward = function () {
                            if (self.totalItems > 0) {
                                return self.currentPage >= self.getTotalPages();
                            } else {
                                return self.data.length < 1;
                            }
                        };

                        self.cantPageToLast = function () {
                            if (self.totalItems > 0) {
                                return $scope.cantPageForward();
                            } else {
                                return true;
                            }
                        };

                        self.cantPageBackward = function () {
                            return self.currentPage <= 1;
                        };

                    }
                };
            }]);
})(angular);