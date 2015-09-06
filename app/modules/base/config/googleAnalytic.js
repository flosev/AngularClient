/**
 *
 * AnalyticsProvider
 */
angular.module('base')
    .config(function(AnalyticsProvider) {
        // initial configuration
        AnalyticsProvider.setAccount('UA-63678919-2');
        // using multiple tracking objects (analytics.js only)
        // AnalyticsProvider.setAccount([
        //   { tracker: 'UA-12345-12', name: "tracker1" },
        //   { tracker: 'UA-12345-34', name: "tracker2" }
        // ]);

        // track all routes (or not)
        AnalyticsProvider.trackPages(true);

        // track all url query params (default is false)
        AnalyticsProvider.trackUrlParams(true);

        // Optional set domain (Use 'none' for testing on localhost)
        // AnalyticsProvider.setDomainName('XXX');

        // Use display features plugin
        AnalyticsProvider.useDisplayFeatures(true);

        // url prefix (default is empty)
        // - for example: when an app doesn't run in the root directory
        //AnalyticsProvider.trackPrefix('my-application');

        // Use analytics.js instead of ga.js
        AnalyticsProvider.useAnalytics(true);

        // Use cross domain linking
        //AnalyticsProvider.useCrossDomainLinker(true);
        //AnalyticsProvider.setCrossLinkDomains(['domain-1.com', 'domain-2.com']);

        // Ignore first page view... helpful when using hashes and whenever your bounce rate looks obscenely low.
        AnalyticsProvider.ignoreFirstPageLoad(false);

        // Enable enhanced link attribution
        AnalyticsProvider.useEnhancedLinkAttribution(true);

        // Enable analytics.js experiments
        //AnalyticsProvider.setExperimentId('12345');

        // Set custom cookie parameters for analytics.js
        /*AnalyticsProvider.setCookieConfig({
            cookieDomain: 'web-client.dev',
            cookieName: 'google-analytic',
            cookieExpires: 20000
        });*/



    }).run(function(Analytics) {
        //Analytics.trackTrans();
    });