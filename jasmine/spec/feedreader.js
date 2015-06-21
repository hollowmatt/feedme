/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test 1: A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        function testAllFeedUrls(feed) {
            //Thanks to http://regexr.com/37i6s for this URL RegEx matcher - modified to allow http.
            var urlMatch = /http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
            it('has url for the feed ' + feed.name, function() {
                expect(feed.url).toMatch(urlMatch);
                expect(feed.url).toBeDefined();
            });
        }

        /* Test 2: A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        function testAllFeedNames(feed) {
            it('has a name for the feed', function() {
                expect(feed.name).toBeDefined();
                expect(feed.name.length > 0).toBe(true);
            });
        }

        // run the loop tests for testAllFeedUrls and testAllFeedNames
        for(var i = 0; i < allFeeds.length; i++) {
            testAllFeedUrls(allFeeds[i]);
            testAllFeedNames(allFeeds[i]);
        }

    });

    /* Suite 2: A new test suite named "The menu" */
    describe('The menu', function() {
        //variable to hold the body element for testing class
        var body = null;
        beforeEach(function() {
            body = document.getElementsByTagName('body')[0];
        });

        /* Test 3: A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('has a hidden menu by default', function() {
            //body class menu-hidden is removed to show menu
            expect(body.className).toEqual('menu-hidden');
        });

        /* Test 4: A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
         it('toggles the menu visibility when clicked', function() {
            $('.menu-icon-link').click();
            expect(body.className).toEqual('');
            $('.menu-icon-link').click();
            expect(body.className).toEqual('menu-hidden');
         });
    });

    /* Suite 3: A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        var entries = null;
        //need to call the asynch function in the before each
        beforeEach(function(done) {
            //make the call to loadFeed, as is done in the app
            loadFeed(2, function() {
                done();
            });
        });

        /* Test 5: A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('has at least a single entry element within the feed', function(done) {
            entries = document.getElementsByClassName('feed')[0].getElementsByClassName('entry');
            expect(entries.length > 0).toBe(true);
            done();
        });
    });

    /* Suite 4: A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var initialEntry = null;
        /* Test 6: A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        beforeEach(function(done) {
            initialEntry = $('.entry:first').text();
            loadFeed(0, function() {
                done();
            });
        });

        it('updates the feed with new data when loadFeed is called', function(done) {
            newEntry = $('.entry:first').text();
            expect(newEntry).not.toEqual(initialEntry);
            done();
        });
    });
}());
