(() => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                start(JSON.parse(xmlhttp.responseText));
            } else {
                alert('Some error occurred while retrieving config.');
            }
        }
    };
    xmlhttp.open("GET", "/config", true);
    xmlhttp.send();
})();


function start(config) {

    let columnCount = config.columns,
        imageCount = config.images.length,
        e = 0,        
        container = document.getElementsByClassName('container')[0],
        img, child, prev, beforePrev, blocks;


    for(let a=0;a<columnCount;a++){

        child = container.appendChild(document.createElement("div"));
        child.className="child";

        for(let i=0;i<imageCount;i++){
           img= child.appendChild(document.createElement("img"));
           img.src=config.images[i];
        }

    }

    blocks = document.getElementsByClassName('child');

    setInterval(function () {
        e++;
        if (e > imageCount) {
            e = 1;
        }
        prev = e - 1, beforePrev = e - 2;

        switch (prev) {
            case 0:
                prev = imageCount;
                beforePrev = imageCount - 1;
                break;
            case 1:
                beforePrev = imageCount;
        }

        for(let j=0;j<columnCount;j++){
            blocks[j].children[e - 1].className = 'current';
            blocks[j].children[prev - 1].className = 'previous';
            blocks[j].children[beforePrev - 1].className = 'before-prev';
        }
        

    }, 200);
}