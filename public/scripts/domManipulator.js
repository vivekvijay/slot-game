
let domManipulationModule = (() => {

    let columns, images, gameContainer, outcome;

    function start(config) {

        //setting initial configurations
        columns = config.columns;
        images = config.images;
        gameContainer = getParent();

        loadComponents();
    }

    function loadComponents() {

        let imageCount = images.length,
            img, child;

        for (let a = 0; a < columns; a++) {

            child = gameContainer.appendChild(document.createElement("div"));
            child.className = "child";

            for (let i = 0; i < imageCount; i++) {
                img = child.appendChild(document.createElement("img"));
                img.src = images[i];
                img.alt = i + 1;
                if (i == a) {
                    img.className = 'default-img';
                }
            }
        }
    }

    function resetGame(){
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
        }
        loadComponents();
    }

    function spin(response,topImages) {

        let blocks = getBlocks(),
            columnCount = columns,
            imageCount = images.length,
            timer = [];

        for (let j = 0; j < columnCount; j++) {

            timer[j] = (() => {
                let prev, beforePrev, start = j, slot = blocks[j], outcome = response.selection,
                    rountCompleted = 0;
                
                return setInterval(() => {
                    start++;
                    if (start > imageCount) {
                        start = 1;
                        ++rountCompleted;
                    }
                    prev = start - 1,
                        beforePrev = start - 2;
                    switch (prev) {
                        case 0:
                            prev = imageCount;
                            beforePrev = imageCount - 1;
                            break;
                        case 1:
                            beforePrev = imageCount;
                    }

                    slot.children[start - 1].className ='current';
                    slot.children[prev - 1].className = 'previous';
                    slot.children[beforePrev - 1].className = 'before-prev';

                    if(rountCompleted==2 && Number(slot.children[start - 1].alt)==outcome[j]){
                        // slot.children[start - 1].classList='current';
                        clearInterval(timer[j]);
                    }
                }, 200);
            })();

        }
    }

    function getParent() {
        return document.getElementsByClassName('container')[0];
    }

    function getBlocks() {
        return document.getElementsByClassName('child');
    }

    return {
        getStart: function (config) {
            start(config);
        },
        startSpin: function (response) {
            spin(response);
        },
        resetGame:function(){
            resetGame();
        }
    }

})();

