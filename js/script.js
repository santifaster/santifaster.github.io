var indice = 1;
var sliders = null;
var image_viewer = null;

function setMediaOld(n) {
    "use strict";
    var i;
    var media = document.getElementById("slider").children;
    var num_media = media.length;
    /*var circulos = document.getElementById("circulos").children;*/
    if (n > num_media) {
        indice = 1;
    }
    if (n < 1) {
        indice = num_media;
    }

    for (i = 0; i < num_media; i += 1) {
        media[i].style.display = "none";
    }
    /*for (i = 0; i < circulos.length; i += 1) {
        circulos[i].className = "";
    }*/
    
    media[indice - 1].style.display = "block";
    /*circulos[indice - 1].className += "active";*/
    //setInterval(avanzaMedia(1), 2000);         //No funciona preguntar Carolina
}

function nextMedia(slider_index, add_index) {
    "use strict";
    setMedia(slider_index, indice += add_index);
}

/*function setMediaActual(slider_index, media_index) {
    "use strict";
    setMedia(slider_index, indice = media_index);
}*/

function setup() {
    "use strict";
    image_viewer = document.getElementById("image_viewer");

    sliders = document.getElementsByClassName("slider");

    for (var i = 0; i < sliders.length; i++)
    {
        setMedia(i, 0);
    }
}

function setMedia(slider_index, media_index) {

    "use strict";
    var media = sliders[slider_index].children;
    var media_count = media.length;

    media_index = checkInLength(media_index, media_count);
    var previous_media = checkInLength(media_index - 1, media_count);
    var next_media = checkInLength(media_index + 1, media_count);

    for (var j = 0; j < media.length; j++) {
        media[j].removeAttribute("onclick");
        /*Check if video*/
        if(media[j].children[0].nodeName == "VIDEO")
            stopVideo(media[j].children[0]);

        media[j].children[0].removeAttribute("controls");
        media[j].className = "hidden_media";
        
    }
    
    media[media_index].className = "media";
    media[media_index].children[0].setAttribute("controls", "");
    if(media[media_index].children[0].nodeName == "IMG")
        media[media_index].setAttribute("onclick", "viewImage(this)");

    media[previous_media].className = "previous_media";
    media[previous_media].setAttribute("onclick", "setMedia("+slider_index+","+previous_media+")");
    media[next_media].className = "next_media";
    media[next_media].setAttribute("onclick", "setMedia("+slider_index+","+next_media+")");

}

function checkInLength(index, length) {
    if (index >= length) index = 0;
    if (index < 0) index = length - 1;
    return index;
}

function stopVideo(video){
    if(video.currentTime == 0) return;

    video.pause();
    video.currentTime = 0;
}

function viewImage(source_figure){  
    var source_image = source_figure.children[0]
    image_viewer.className = "visible_image_viewer"
    image_viewer.children[1].setAttribute("src", source_image.getAttribute("src"))
    image_viewer.children[1].setAttribute("alt", source_image.getAttribute("alt"))
}

function hideImage(){
    image_viewer.className = "hidden_image_viewer"
    image_viewer.children[1].removeAttribute("src")
    image_viewer.children[1].removeAttribute("alt")
}

