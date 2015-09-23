angular.module('yes.ui').config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en-US', {
        SIZES_PER_PAGE: 'page size',
        UNIT: 'item'
    });
}]);