'use strict';

/* Directives */

angular.module('troue.directives', [])

.directive('enterKeyup', function() {
    return function(scope, elm, attrs) {
        elm.bind('keyup', function(evt) {
            if (evt.which == 13) {
                scope.$apply(attrs.enterKeyup);
            }
        });
    };
})

.directive('escKeyup', function() {
    return function(scope, elm, attrs) {
        elm.bind('keyup', function(evt) {
            if (evt.which == 27) {
                scope.$apply(attrs.escKeyup);
            }
        });
    };
});
