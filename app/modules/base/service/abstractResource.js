


/**
 * abstractResource
 * @constructor
 */
angular.module('base').provider('abstractResource', [function () {
    "use strict";

    var _urlApi = '';

    function setUrlApi(url) {
        _urlApi = url;
    }

    return {
        setUrlApi: setUrlApi,
        $get : ['APP_PARAMS', function(APP_PARAMS) {
            "use strict";

            function getUrlApi() {
                return (_urlApi != '')? _urlApi: APP_PARAMS.urlApi;
            }

            function generateUrl(url) {
                return getUrlApi() + url;
            }

            /**
             * ======== Get =======
             *
             * @returns {{interceptor: {response: interceptorResponse}, transformResponse: transformResponse}}
             */
            function getGetConstruction() {
                /**
                 * @param data
                 * @returns {*|value|p}
                 */
                function interceptorResponse(data) {
                    data.resource.$info = data.data.$info;
                    return data.resource;
                }

                /**
                 * @param data
                 * @param headersGetter
                 * @returns {{}}
                 */
                function transformResponse(data, headersGetter) {
                    var data = angular.fromJson(data);
                    var resourceData = {};

                    if (data.status != 200) {
                        resourceData.$error;
                    }
                    else {
                        resourceData = data.resource.data;
                        resourceData.$info = {
                            type: data.resource.type
                        };
                    }
                    return resourceData;
                }

                return {
                    interceptor: {
                        response: interceptorResponse
                    },
                    transformResponse: transformResponse,
                };
            }


            /**
             * ======= Query ======
             *
             * @returns {{interceptor: {response: interceptorResponse}, transformResponse: transformResponse}}
             */
            function getQueryConstruction() {
                /**
                 * @param data
                 * @returns {*|value|p}
                 */
                function interceptorResponse(data) {
                    data.resource.$info = data.data.$info;
                    return data.resource;
                }

                /**
                 * @param data
                 * @param headersGetter
                 */
                function transformResponse(data, headersGetter) {
                    var data = angular.fromJson(data);
                    var resourceData = [];

                    if (data.status != 200) {
                        resourceData.$error;
                    }
                    else {
                        resourceData = data.resource.data;
                        resourceData.$info = {
                            limit: data.resource.limit,
                            count: data.resource.count,
                            skip: data.resource.skip,
                            type: data.resource.type
                        };
                    }
                }

                return {
                    interceptor: {
                        response: interceptorResponse
                    },
                    transformResponse: transformResponse,
                };
            }


            return {
                getUrlApi: getUrlApi,
                get: getGetConstruction(),
                query: getQueryConstruction(),
                generateUrl: generateUrl,
            };
        }]
    };
}]);