(() => {

    let dataAccess = dataAccessModule,
        domManipulator = domManipulationModule;

    dataAccess.getInitialConfig(domManipulator.getStart);

    document.querySelector('.start-button').addEventListener('click',()=>{
        // domManipulator.resetGame();
        dataAccess.getResult(domManipulator.startSpin);        
    })

})();