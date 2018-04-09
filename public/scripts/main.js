(() => {

    let dataAccess = dataAccessModule,
        domManipulator = domManipulationModule;

    //Loading initial setups.
    dataAccess.getInitialConfig(domManipulator.getStart);

    //Binding Button click
    document.querySelector('.start-button').addEventListener('click',()=>{
        domManipulator.resetGame();
        dataAccess.getResult(domManipulator.startSpin);        
    })

})();