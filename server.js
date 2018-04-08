const config = require('./config');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/config',(request,response) => {
    response.json(config.appConfig);
});

app.get('/result',(request,response) => {
    const result={
        selection:[],
        bonusRoundActivated:null
    },
    max = config.appConfig.images.length,
    min=1,
    columns = config.appConfig.columns;
   
    let bonusRound;

    for(let i=0;i<columns;i++){
        result.selection.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    bonusRound = Math.floor(Math.random() * (max - min + 1)) + min

    result.bonusRoundActivated = (bonusRound == 2)?true:false;

    response.json(result);
});

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`));
