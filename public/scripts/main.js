// window.onload = function () {
//     let count = 5,
//         i = -1,
//         j = -1;

//     // component.style=count*-115+'px';
//     setInterval(function () {
//         i++;
//         if(i>0){
//             document.querySelector('.img'+(i-1)).style.top = '-115px';
//         }
        
//         if (i ==count) {
//             i = 0;
//         document.querySelector('.img'+i).style.top = '0px';
//         }
        
//     }, 1000);

//     // setInterval(function () {
//     //     j++;
//     //     if (j ==count) {
//     //         j = 0;
//     //     }
//     //     document.querySelector('.img'+i).style.top = '-115px';
//     // }, 1000);
// }

(()=>{
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                start(JSON.parse(xmlhttp.responseText));
            }else{
                alert('Some error occurred while retrieving config.');
            }                       
        }
    };
    xmlhttp.open("GET", "/config", true);
    xmlhttp.send();
})();


function start(config){
    let count = 5,
        i = -1,
        j = -1;

    // component.style=count*-115+'px';
    setInterval(function () {
        i++;
        if(i>0){
            document.querySelector('.img'+(i-1)).style.top = '-115px';
        }
        
        if (i ==count) {
            i = 0;
        document.querySelector('.img'+i).style.top = '0px';
        }
        
    }, 1000);
}