(function (angular) {
    angular.module('yes.ui')
        .directive('changeTab', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    $(element).click(function (event) {
                        $(this).parents(".tabbable").find(".active").removeClass("active");
                        $($(this).attr("change-tab")).addClass("active");
                        $(this).addClass("active");
                        event.stopPropagation();
                    });
                }
            }
        }])
        .directive('boxChangeShowHide', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    angular.element(element).click(function (event) {
                        var ion = angular.element(this).children();
                        if (ion.hasClass("fa-chevron-up")) {
                            ion.removeClass("fa-chevron-up").addClass("fa-chevron-down")
                                .parents(".util-box:eq(0)").children(".box-body").hide();
                        } else {
                            ion.removeClass("fa-chevron-down").addClass("fa-chevron-up")
                                .parents(".util-box:eq(0)").children(".box-body").show();
                        }
                        event.stopPropagation();
                    });
                }
            }
        })
        .directive('onDomReady', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    $timeout(function () {
                        var $sideBar = angular.element("#sidebar");
                        element.on(
                            'click', '.navbar-toggle.menu-toggler',
                            function (event) {
                                var $self = angular.element(this);
                                $self.toggleClass('display');
                                $sideBar.toggleClass('display');
                                event.stopPropagation();
                            }
                        );

                        element.on('click', '.toggle-open', function (event) {
                            angular.element(this).toggleClass('open');
                            event.stopPropagation();
                        });

                        element.on('click', function () {
                            angular.element('.toggle-open').removeClass('open');
                        });

                        element.on(
                            'click', '.tabbable.tabs-left li',
                            function (event) {
                                var $self = angular.element(this);
                                angular.element('.tabbable.tabs-left li').not($self).removeClass('active');
                                $self.addClass('active');

                                var $id = $self.attr('id');
                                var $tabContent = angular.element('#tab_' + $id);
                                element.parent().find('.tab-pane').removeClass('active');

                                $tabContent.addClass('active');
                                event.stopPropagation();
                            }
                        );

                    });
                }
            }
        }])
        .directive('onFinishRender', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function () {
                            scope.$emit('ngRepeatFinished');
                        });
                    }
                }
            }
        }])
        .directive('onMenuRender', ['$timeout', '$stateParams', function ($timeout, $stateParams) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function () {
                            var page = $stateParams.page,
                                pages = $("a[href$=" + page + "]");
                            pages.parent().addClass('active');
                            if (pages.parent().hasClass('last-menu')) {
                                pages.parents('li.ng-scope').addClass('open');
                            }

                            element.parent().on(
                                'click', 'li',
                                function (event) {
                                    var $self = angular.element(this);
                                    if ($self.hasClass("last-menu")) {
                                        $self.parents('li').siblings().removeClass("active");
                                        element.find('.last-menu').not(this).removeClass('active');
                                    }

                                    if ($self.children().children().hasClass('last-menu')) {
                                        $self.toggleClass("open");
                                    } else {
                                        if ($self.hasClass("last-menu")) {
                                            $self.addClass("active").siblings().removeClass('active');

                                            var $active = element.find('.active');
                                            if ($active.parent().parent().prevAll().hasClass("open")) {
                                                $active.parent().parent().prevAll().removeClass("open");
                                            }
                                            if ($active.parent().parent().nextAll().hasClass("open")) {
                                                $active.parent().parent().nextAll().removeClass("open");
                                            }

                                        } else {
                                            var $lastMenu = element.find('.last-menu');
                                            $self.addClass("active").siblings().removeClass('active');
                                            $lastMenu.removeClass('active');
                                            $lastMenu.parent().parent().removeClass('open');
                                        }
                                    }

                                    if ($self.hasClass('open')) {
                                        $self.children('.submenu').show();
                                    } else {
                                        $self.children('.submenu').hide();
                                    }
                                    event.stopPropagation();
                                }
                            );
                        });
                    }
                }
            }
        }])
        .directive('onSideBarRender', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    $timeout(function () {
                        element.on(
                            'click', '#sidebar-collapse',
                            function () {
                                element.toggleClass('menu-min');
                                element.find('.tabbable.tabs-left').toggleClass("hidden-ele");
                                angular.element('#sidebar-collapse').find('i').toggleClass('fa-angle-double-right');
                            }
                        );
                    });
                }
            }
        }])
        .directive('includeReplace', function () {
            return {
                require: 'ngInclude',
                restrict: 'A',
                /* optional */
                link: function (scope, el, attrs) {
                    el.replaceWith(el.children());
                }
            };
        })
        .directive('searchCommon', ['settings', function (settings) {
            return {
                restrict: 'EA',
                templateUrl: settings.templates.searchCommon,
                replace: true,
                scope: {
                    filtersConf: "=",
                    filter: "=",
                    onSearch: "&",
                    operations: "="
                },
                link: function (scope, element, attrs) {
                },
                controller: ['$scope', '$attrs', '$element', '$rootScope', '$timeout', '$modal',
                    function ($scope, $attrs, $element, $rootScope, $timeout, $modal) {
                        $scope.selectChange = function (search) {
                            $scope.filtersConf.forEach(function (sch) {
                                if (sch.hide) {
                                    sch.hide = false;
                                    if (sch.lastValue) {
                                        $scope.filter[sch.name] = sch.lastValue;
                                    } else {
                                        delete $scope.filter[sch.name];
                                    }
                                }
                            });

                            angular.forEach(search.options, function (option) {
                                if (option.hideKeys && option.value == $scope.filter[search.name]) {
                                    option.hideKeys.split(",").forEach(function (key) {
                                        $scope.filtersConf.forEach(function (sch) {
                                            if (sch.name == key && sch.hide != true) {
                                                sch.lastValue = $scope.filter[sch.name];
                                                delete $scope.filter[sch.name];
                                                sch.hide = true;
                                            }
                                        });
                                    });
                                }
                            });
                        };


                        $scope.selectors = {};

                        function initConf() {
                            if ($scope.filtersConf) {
                                $scope.filtersConf.forEach(function (search) {
                                    if (search.type == "select") {
                                        if ($scope.filter[search.name] == null) {
                                            $scope.filter[search.name] = "";
                                        }
                                        $scope.selectChange(search);
                                    } else if (search.type == "department" || search.type == "people") {
                                        var turl = null;
                                        if ("department" == search.type) {
                                            turl = "base/templates/s.department.html";
                                        } else if ("people" == search.type) {
                                            turl = "base/templates/s.people.html";
                                        }
                                        $scope.selectors[search.name] = {
                                            "turl": turl,
                                            "search": search
                                        };
                                    }
                                });
                            }
                        }

                        $scope.$watch("filtersConf", function () {
                            initConf();
                        });

                        $scope.dateChange = function (dateName) {
                            if ($scope.filter[dateName]) {
                                $scope.filter[dateName] = moment($scope.filter[dateName]).format('YYYY-MM-DD');
                            }
                        };
                        $scope.openDate = function ($event, search) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            search.opened = true;
                        };

                        $scope.reset = function () {
                            $scope.filtersConf.forEach(function (search) {
                                search.lastValue = null;
                            });
                            $scope.filtersConf.forEach(function (search) {
                                if (search.type == "select") {
                                    $scope.filter[search.name] = "";
                                    $scope.selectChange(search);
                                } else {
                                    delete $scope.filter[search.name];
                                }
                            });
                        };

                        $scope.keyDown = function (event) {
                            var e = event || window.event;
                            if (e && e.keyCode == 13) {
                                $scope.onSearch();
                            }
                        };
                    }
                ]
            };
        }]);
})(angular);
