//Global
var width = "";
var videos = ["/menu/VersionLocal/img/dance.mp4","/menu/VersionLocal/img/rain.mp4"];

function createNote(){
   $.PostItAll.new("<p style='text-align:center'>Hello <b>world</b></p>"); 
}

function changeVideo(width){
    if (width >= 1096) {
        var mediaSource = document.getElementsByTagName('source')[0];
        mediaSource.src = videos[0];
        var player = document.getElementsByTagName('video')[0];
        player.load();
    } else {
        var mediaSource = document.getElementsByTagName('source')[0];
        mediaSource.src = videos[1];
        var player = document.getElementsByTagName('video')[0];
        player.load();
    }
}
window.addEventListener('load', function () {
    width = $(window).width();
    changeVideo(width);
    console.log(width);
})

window.onresize = function(event) {
    width = $(window).width();
    changeVideo(width);
};

function goHome(){
    document.location.href="/#slide01";
}