/**
 * Main application object
 * @type {Object}
 */
var App = {

    /**
     * Authenticate to OAuth, load the graph data
     * @return {void}
     */
    init: function() {
        // Start by authenticating to OAuth
        var oauth = new OAuth(config);
        oauth.authenticate().then(this.startApplication, this.fatalError);
    },

    /**
     * Start the application behaviour when OAuth has completed
     * @param  {string} access_token access token for OAuth
     * @return {void}
     */
    startApplication: function(access_token){
        console.log(access_token);
        alert('app starting!');
        this.access_token = access_token;
        this.setupGraph();
        this.updateGraph();
    },

    /**
     * The access token for OAuth calls
     * @type {string}
     */
    access_token: undefined
,
    /**
     * Data for the graph
     * @type {Array} array of open task counts for today
     */
    data: [],

    /**
     * display an error message
     * @param  {string} message error message to show
     * @return {void}
     */
    fatalError: function(message) {
        alert('Fatal errror: '+message);
    },

    /**
     * Start the graph
     * @return {void}
     */
    setupGraph: function() {
        alert('oauth completed: '+this.access_token);
    },

    /**
     * Update the data in the graph
     * @return {void}
     */
    updateGraph: function() {
        // loadData().then
            //  draw graph
            // set timeout, call self

            //  fatalerror

    }
};

// Start on page load
if (document.readyState != 'loading'){
    App.init();
} else {
    document.addEventListener('DOMContentLoaded', App.init);
}
