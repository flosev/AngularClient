/**
 * bootstrap with config.json
 */
(function (angular) {
    angular.bootstrapWithConfig = function(nameModule) {
        angular.element(document).ready(function () {
            angular.configBootstrap.loadParams(function(params) {
                angular.module(nameModule).constant('APP_PARAMS', params);
                angular.bootstrap(document, [nameModule]);
            });
        });
    }

}(angular));


/**
 * configBootstrap
 */
(function ($, angular) {
    angular.configBootstrap =  function($, angular) {

        var _resources = [],
            _params = {};

        /**
         * set resource - url /dir/file Or /dir/file.local
         * @param {string} url
         */
        function setResource(url) {
            _resources.push(url);
        }

        /**
         * get all urls of resources
         * @returns {Array}
         */
        function getResources() {
            return _resources;
        }

        /**
         * get params from resources
         * @returns {{}}
         */
        function getParams() {
            return _params;
        }

        /**
         * load all resources and give all params in callback function
         * @param {function} callBack(params)
         */
        function loadParams(callBack) {
            parseResources(getResources(), function() {
                callBack(getParams());
            });
        }

        /**
         * set params and replaces the existing
         * @param params
         */
        function setParams(params) {
            angular.extend(_params, params)
        }

        /**
         * parse all the resources and stores the received data in the parameters
         * @param resources
         * @param finalCallback
         * @param localResource
         */
        function parseResources(resources, finalCallback, localResource) {
            if (!angular.isUndefined(localResource)) {
                var resource = localResource;
            }
            else if (resources.length == 0) {
                finalCallback();
                return;
            }
            else {
                var resource = resources.shift();
            }

            $.getJSON(resource +'.json').
                success(function(data) {
                    setParams(data);
                    if (angular.isUndefined(localResource)) {
                        parseResources(resources, finalCallback, resource + '.local');
                    }
                    else {
                        parseResources(resources, finalCallback);
                    }
                }).
                error(function() {
                    parseResources(resources, finalCallback);
                });
        }

        return {
            setResource: setResource,
            loadParams: loadParams
        };
    }($, angular);
}(jQuery, angular));


angular.configBootstrap.setResource('/config/main');