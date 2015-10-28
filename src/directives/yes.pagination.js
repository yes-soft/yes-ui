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
                                if (page == "...") {

                                } else if (!angular.isNumber(page) || page < 1) {

                                } else {
                                    self.currentPage = Math.min(page, self.getTotalPages());
                                }
                            }
                        });

                        self.pagesLength = self.pagesLength * 2 || 10;


                        scope.pagination = self;

                        function renderNumbers() {
                            self.numbers = [];
                            var i = 0;
                            var totalPages = self.getTotalPages();

                            if (self.currentPage > totalPages)
                                self.currentPage = totalPages;
                            if (totalPages <= self.pagesLength) {
                                for (i = 1; i <= totalPages; i++) {
                                    self.numbers.push(i);
                                }
                            } else {
                                var offset = Math.floor((self.pagesLength - 1) / 2);

                                if (self.currentPage <= offset) {
                                    for (i = 1; i <= offset + 1; i++) {
                                        self.numbers.push(i);
                                    }
                                    self.numbers.push('...');
                                    self.numbers.push(totalPages);
                                } else if (self.currentPage > totalPages - offset) {
                                    self.numbers.push(1);
                                    self.numbers.push('...');
                                    for (i = offset + 1; i >= 1; i--) {
                                        self.numbers.push(totalPages - i);
                                    }
                                    self.numbers.push(totalPages);
                                } else {
                                    self.numbers.push(1);
                                    self.numbers.push('...');
                                    for (i = Math.floor(offset / 2); i >= 1; i--) {
                                        self.numbers.push(self.currentPage - i);
                                    }
                                    self.numbers.push(self.currentPage);
                                    for (i = 1; i <= offset / 2; i++) {
                                        self.numbers.push(self.currentPage + i);
                                    }
                                    self.numbers.push('...');
                                    self.numbers.push(totalPages);
                                }
                            }
                        }

                        function currentPageChanged() {
                            renderNumbers();
                            if (angular.isNumber(self.currentPage)
                                && angular.isFunction(self.onPageChange))
                                self.onPageChange(self.currentPage);
                        }

                        scope.$watch('pagination.currentPage', currentPageChanged);
                        scope.$watch('pagination.totalItems', renderNumbers);
                        scope.$watch('pagination.pageSize', renderNumbers);

                        self.cantPageForward = function () {
                            if (self.totalItems > 0) {
                                return self.currentPage >= self.getTotalPages();
                            } else {
                                return false;
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