//angular.module("schemaForm").run(["$templateCache", function ($templateCache) {
//    $templateCache.put("base/components/group.html",
//        "<div></div>");
//}]);

angular.module('schemaForm').config(
    ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
        function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

            //var component = function (name, schema, options) {
            //    if (schema.type === 'group') {
            //        var f = schemaFormProvider.stdFormObj(name, schema, options);
            //        f.key = options.path;
            //        f.type = 'group';
            //        options.lookup[sfPathProvider.stringify(options.path)] = f;
            //        return f;
            //    }
            //};
            //
            //console.log(schemaFormProvider.defaults.string);
            //
            //schemaFormProvider.defaults.string.unshift(component);

            //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'group',
                "plugins/base/templates/forms/group.html"
            );
            schemaFormDecoratorsProvider.createDirective(
                'group',
                "plugins/base/templates/forms/group.html"
            );
        }
    ]);
