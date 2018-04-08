let dataAccessModule= (() => {

    //Service URLs
    const initialConfigURL = '/config',
        resultURL = '/result';

    //Error messages
    const retriveFailed = 'Some error occurred while retrieving config.';
    
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
    
    function fetchInitialConfig(callback) {
        callAPI(initialConfigURL,callback);
    }

    function fetchResult(callback) {
        callAPI(resultURL,callback);
    }

    function errorHandler(msg){
        alert(msg);
    }

    return{
        getInitialConfig : function(callback){
            fetchInitialConfig(callback);
        },
        getResult : function(callback){
            fetchResult(callback);
        }
    }
})();
