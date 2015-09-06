var OAuth = (function(options){

    /**
     * Read the access token from the callback URL
     * @return {string} the access token or null
     */
    var getAuthorisationCodeFromURL = function() {
        regex = RegExp(/code=(.+?)(\&|$)/).exec(location.search);

        if (regex === null) {
            return null;
        }
        else {
            return regex[1];
        }
    };

    /**
     * Determine whether the user has refused access to the app
     * @return {boolean} true if refused, false otherwise
     */
    var userhasRefused = function() {
        regex = options.authorisation.access_denied.exec(location.search);
        return (regex !== null);
    }

    /**
     * Access token for OAuth
     * @type {string}
     */
    var access_token = null;

    /**
     * Authorisation code
     * @type {string}
     */
    var authorization_token = null;

    /**
     * Encode data as application/x-www-form-urlencoded
     * @param  {Object} data data to be encoded
     * @return {string}      query string
     */
    var encodeDataAsForm = function(data) {
        var query_string = [];
        for(var p in data) {
            if (data.hasOwnProperty(p)) {
                query_string.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
            }
        }
        return query_string.join('&');
    };

    /*
     * Public API
     */
    return {

        /**
         * Authenticate the client to OAuth
         * @return {Promise} resolved or rejected when done
         */
        authenticate: function(){
            // Construct the promise
            return new Promise(function(resolve, reject){

                // Read the authorisation token
                var authorization_token = getAuthorisationCodeFromURL();
                if (authorization_token === null) {
                    // Have we refused authentication before?
                    if (userhasRefused()) {
                        reject('user_refused');
                        return;
                    }
                    else {
                        // Not authenticated, must login
                        var url = options.authorisation.url;
                        window.location = url + '?' + encodeDataAsForm(options.authorisation.parameters);
                    }
                }
                else {
                    // Logged in, request access_token to access services
                    var parameters = options.access.parameters;
                    parameters.code = authorization_token;

                    var request = new XMLHttpRequest();
                    request.open('POST', options.access.url, true);
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

                    request.onload = function(){
                        if (this.status >= 200 && this.status < 400) {
                            // Store the access token for later usage
                            this.access_token = JSON.parse(this.response).access_token;
                            // Clear the browser URL for cleaner reloads
                            history.pushState(null, '', options.access.clean_url);

                            // Return success
                            resolve(this.access_token)
                        }
                        else {
                            reject(this.response);
                        }
                    };

                    request.onerror = function(){
                        console.log(this.response);
                        reject('connection_error');
                    };

                    request.send(encodeDataAsForm(parameters));
                }
            });
        }
    };
});
