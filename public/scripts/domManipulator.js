let domManipulationModule = (() => {

    let columns,
        images,
        gameContainer,
        outcome = [],
        timers = 0,
        messages,
        spinRound,
        isBonusRoundActivated = false;

    /*
    *Called initially to set initial config to variables and load images and their container 
    * as per backend service.
    * Values from the API reaches this method as "config"
    * @param {config} is an object with initial column count, messages and images 
    */
    function start(config) {

        //setting initial configurations
        columns = config.columns;
        images = config.images;
        messages = config.messages;
        spinRound = config.spinRound;
        gameContainer = getSlotContainer();

        loadComponents();
    }

    //Adds container, images to DOM
    function loadComponents() {

        let imageCount = images.length,
            img, child;

        for (let a = 0; a < columns; a++) {

            child = gameContainer.appendChild(document.createElement("div"));
            child.className = "child";
            child.style.width = (100 / columns) + '%';
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

    //Method used to reset the game.
    function resetGame() {

        [].forEach.call(document.querySelectorAll('.current'), (e) => {
            e.classList.add('default-img');
        });

        [].forEach.call(document.querySelectorAll('.before-prev, .previous, .current'), (e) => {
            e.classList.remove('before-prev');
            e.classList.remove('previous');
            e.classList.remove('current');
        });

        //resetting timer count
        timers = 0;

        document.getElementsByClassName('message')[0].classList.remove('show');
        getSlotContainer().classList.remove('bonus-round');
    }

    /*
    *This method is called immediately after retriving the response from API:/result
    * @param {response} represet the spin result. Also contain a boolean value which decide 
    * whether or not to active bonus round
    * */
    function spin(response, topImages) {

        let blocks = getBlocks(),
            columnCount = columns;

        outcome = response.selection;
        isBonusRoundActivated = response.bonusRoundActivated;
        document.getElementsByClassName('start-button')[0].disabled = true;

        for (let j = 0; j < columnCount; j++) {

            (() => {
                let start = j;

                if (topImages && topImages.length) {
                    start = topImages[j];
                }
                else {
                    start = j + 1;
                }
                startTimer(j, start, blocks[j])
            })();

        }
    }

    /*
    *This method spin the columns individually. Necessary params are supplied as arguments
    * @param {index} represet the column no
    * @param {start} represet the first image to be shown
    * @param {slot} represet the column itself
    */
    function startTimer(index, start, slot) {
        let timer, prev, beforePrev,
            imageCount = images.length,
            beginner = start,
            rountCompleted = 0;

        timer = setInterval(() => {

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

            if (rountCompleted > spinRound && Number(slot.children[start - 1].alt) == outcome[index]) {
                clearInterval(timer);
                ++timers;
                if (columns === timers) {
                    setTimeout(() => {
                        displayWinStmt();
                    }, 500)
                }
            }
            start++;

        }, 200);
    }

    /*
    * This method is fired to display the wining statement on the top. This checks the count
    * of similar outcomes. 
    */
    function displayWinStmt() {
        let itemOccurence,
            highestOccurence = 0,
            clearNo = -999,
            selection = outcome.slice(0);

        for (let i = 0; i < outcome.length; i++) {
            itemOccurence = 1;
            for (let j = 0; j < outcome.length; j++) {
                if (i == j)
                    continue;
                if (selection[i] === clearNo)
                    break;

                if (selection[i] === selection[j]) {
                    itemOccurence++;
                    selection[j] = clearNo;
                }

                if ((selection.length - j - 1 + itemOccurence) <= highestOccurence) {
                    break;
                }
            }

            if (itemOccurence > highestOccurence)
                highestOccurence = itemOccurence;
        }

        let message = document.getElementsByClassName('message')[0];
        message.innerHTML = messages[highestOccurence - 1];
        message.classList.add('show');

        checkForBonusRound();

    }

    /*
    * This method is called to check whether bonus round is activated or not. 
    */
    function checkForBonusRound() {

        if (isBonusRoundActivated) {
            getSlotContainer().classList.add('bonus-round');
            setTimeout(() => {
                document.getElementsByClassName('start-button')[0].disabled = false;
                ativeBonusRound();
            }, 3000);

        }
        else
            document.getElementsByClassName('start-button')[0].disabled = false;

    }

    //This method is trigged if bonus round is activate as per theAPI response
    function ativeBonusRound() {
        document.getElementsByClassName('start-button')[0].click();
    }

    //Returns the parent dom elements of the columns
    function getSlotContainer() {
        return document.getElementsByClassName('container')[0];
    }

    //Returns the dom elements representing columns
    function getBlocks() {
        return document.getElementsByClassName('child');
    }

    return {
        getStart: function (config) {
            start(config);
        },
        startSpin: function (response) {
            spin(response, outcome);
        },
        resetGame: function () {
            resetGame();
        }
    }

})();

