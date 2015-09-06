
angular.module('base').filter('capitalize', function() {
    'use strict';

    return function(input, all) {

        return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){
            if (txt.split('_')[2]) {
                var thirdWord = txt.split('_')[2].charAt(0).toUpperCase() + txt.split('_')[2].substr(1).toLowerCase()
            }else{ var thirdWord=''}
            return txt.split('_')[0].charAt(0).toUpperCase() + txt.split('_')[0].substr(1).toLowerCase() + ' '
                + txt.split('_')[1].charAt(0).toUpperCase()+ txt.split('_')[1].substr(1).toLowerCase()+' '
                + thirdWord;
        }) : '';

    };
});


