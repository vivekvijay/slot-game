
let domManipulationModule = (() => {

    let columns, images, gameContainer, outcome=[];

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

    function resetGame() {
        // while (gameContainer.firstChild) {
        //     gameContainer.removeChild(gameContainer.firstChild);
        // }
        // loadComponents();
        let blocks = getBlocks();
        [].forEach.call(document.querySelectorAll('.current'), function (e) {
            e.classList.add('default-img');
        });

        [].forEach.call(document.querySelectorAll('.before-prev, .previous, .current'), function (e) {
            e.classList.remove('before-prev');
            e.classList.remove('previous');
            e.classList.remove('current');
        });

    }

    function spin(response, topImages) {

        let blocks = getBlocks(),
            columnCount = columns,
            imageCount = images.length,
            timer = [];
            
            outcome = response.selection;            

        for (let j = 0; j < columnCount; j++) {

            timer[j] = (() => {
                let start = j,
                    slot = blocks[j],
                    rountCompleted = 0,
                    prev, beforePrev, beginner;

                if (topImages && topImages.length) {
                    start = topImages[j];
                }
                else {
                    start = j + 1;
                }
                beginner = start;

                return setInterval(() => {

                    if (start > imageCount) {
                        start = 1;
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

                    slot.children[start - 1].className = 'current';
                    slot.children[prev - 1].className = 'previous';
                    slot.children[beforePrev - 1].className = 'before-prev';

                    if (beginner == start)
                        ++rountCompleted;
                    if (rountCompleted > 2 && Number(slot.children[start - 1].alt) == outcome[j]) {
                        clearInterval(timer[j]);
                    }

                    start++;

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
            debugger;
            spin(response,outcome);
        },
        resetGame: function () {
            resetGame();
        }
    }

})();

