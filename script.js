console.log("let's write javaScript")

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".m4a")) {
            songs.push(element.href.split("/songs/")[1])
        }
        
    }
    return songs;
}

getSongs()

async function main(){
    //Get the list of all songs
    let songs = await getSongs()
    console.log(songs)

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `
        <li>
                <img src="music.svg" alt="">
                <div class="info">
                  ${song.replace("%5BOfficial_Music_Video%5D", "")}
                  <div></div>
                </div>
                <div class="playnow">
                  <span>Play</span>
                  <img class="invert" src="play.svg" alt="">
                </div>
              </li>
              `
    }

    //Play the first song
    var audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener("loadeddata", ()=>{
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    })
}
main()