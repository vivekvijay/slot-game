const config = require('./config');

/* 
* This method provide the initial configuration to the application.
* The 3 main properties within appConfig object can be used to customize the application.

* appConfig.columns : Decides no. of slots in the UI.
* appConfig.messages : Decides the output result. Can add more items to the list
* appConfig.images : Supplies initial set of images to the application.

* sends the resonse as JSON object
* @param {req} request object
* @param {res} response object
*/
function getInitialCOnfig(request, response) {
    response.json(config.appConfig);
}

/*
 * API handler method
 * generates winning number sequence array and flag indicating whether
 * or not to trigger bonus round and 
 * sends the resonse as JSON object
 * @param {req} request object
 * @param {res} response object
 */
function getResult(request, response) {
    const result = {
        selection: [],
        bonusRoundActivated: null
    },
        max = config.appConfig.images.length,
        min = 1,
        columns = config.appConfig.columns;

    let bonusRound;

    for (let i = 0; i < columns; i++) {
        result.selection.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    bonusRound = Math.floor(Math.random() * (max - min + 1)) + min

    result.bonusRoundActivated = (bonusRound == 2) ? true : false;

    response.json(result);
}

module.exports = {
    getInitialCOnfig,
    getResult
};