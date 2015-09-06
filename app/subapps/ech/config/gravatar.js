
/**
 * route
 *
 * @module      echApp
 * @category    config
 * @author      ****
 * @copyright   (http://envoyrecharge.com). All rights reserved.
 * @license     http://envoyrecharge.com Commercial
 * @link        http://envoyrecharge.com/
 */

/**
 * route
 */
angular.module('echApp').config([
    'gravatarServiceProvider', function(gravatarServiceProvider) {
        gravatarServiceProvider.defaults = {
            size     : 100,
            "default": 'mm'
        };
        gravatarServiceProvider.secure = true;
    }
]);