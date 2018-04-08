let dataAccessModule= (() => {

    //Service URLs
    const initialConfigURL = '/config',
        resultURL = '/result';

    //Error messages
    const retriveFailed = 'Some error occurred while retrieving data.';
    
    //Method used for API calls
    function callAPI(url,callback){
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    callback(JSON.parse(xmlhttp.responseText));
                } else {
                    errorHandler(retriveFailed);
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
    
    //Private method called on application load for fetching initial configuration
    function fetchInitialConfig(callback) {
        callAPI(initialConfigURL,callback);
    }

    //Private method called on button click to fetch the outcomes
    function fetchResult(callback) {
        callAPI(resultURL,callback);
    }

    //Error handler
    function errorHandler(msg){
        alert(msg);
    }

    return{
        //Public methods for transferring API response.
        
        getInitialConfig : function(callback){
            fetchInitialConfig(callback);
        },
        getResult : function(callback){
            fetchResult(callback);
        }
    }
})();
