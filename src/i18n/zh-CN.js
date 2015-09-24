angular.module('yes.ui').config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('zh-CN', {
        YES_PAGINATION: {
            'SIZE_PER_PAGE': '每页显示',
            UNIT: '条'
        }
    });
}]);