//angular.module('yes.ui')
//    .directive('yesTreeView', ['$compile', function ($compile) {
//
//        return {
//            restrict: 'A',
//            link: function (scope, element, attrs) {
//
//                var treeId = attrs.treeId;
//                var treeModel = attrs.treeView;
//                var nodeId = attrs.nodeId || 'id';
//                var nodeLabel = attrs.nodeLabel || 'label';
//                var nodeChildren = attrs.nodeChildren || 'children';
//
//                //tree template
//                //var template =
//                //    '<ul>' +
//                //    '<li ng-repeat="node in ' + treeModel + '">' +
//                //    '<i class="collapsed" data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
//                //    '<i class="expanded" data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
//                //    '<i class="normal" data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
//                //    '<span data-ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
//                //    '<div data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" yes-tree-view="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' +
//                //    '</li>' +
//                //    '</ul>';
//
//                var template = [
//                    '<ul>',
//                    '<li ng-repeat="node in ' + treeModel + '">',
//                    '{{node.name}}',
//                    '<div yes-tree-view="node.subMenus">',
//                    '</li>',
//                    '</ul>'
//                ].json['/n'];
//
//                //check tree id, tree model
//                if (treeId && treeModel) {
//
//                    //root node
//                    if (attrs.angularTreeview) {
//
//                        scope[treeId] = scope[treeId] || {};
//
//                        scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function (selectedNode) {
//                                selectedNode.collapsed = !selectedNode.collapsed;
//                            };
//
//                        scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function (selectedNode) {
//
//                                if (scope[treeId].currentNode && scope[treeId].currentNode.selected) {
//                                    scope[treeId].currentNode.selected = undefined;
//                                }
//                                selectedNode.selected = 'selected';
//                                scope[treeId].currentNode = selectedNode;
//                            };
//                    }
//
//                    //Rendering template.
//                    element.html('').append($compile(template)(scope));
//                }
//            }
//        };
//    }]);