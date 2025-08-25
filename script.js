console.log("let's write javaScript")
let currentSong = new Audio();

function secondsToMinutes(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = Math.ceil(seconds % 60);

  // Add leading zeros
  let formattedMinutes = (minutes.toString().padStart(2, "0"));
  let formattedSeconds = (secs.toString().padStart(2, "0"));

  return `${formattedMinutes}:${formattedSeconds}`;
}


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

const playMusic = (track)=>{
    // let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track
    currentSong.play()
    play.src = "pause.svg"
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main(){

    //Get the list of all songs
    let songs = await getSongs()
    console.log(songs)

    //show the all in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img src="music.svg" alt="">
                <div class="info">
                 <div>${song}</div>
                  <div>Sahil</div>
                </div>
                <div class="playnow">
                  <span>Play</span>
                  <img src="play.svg" alt="">
                </div></li> `
    }

    // Attach an event listner to each song
   Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e)=>{
    e.addEventListener("click", element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML)

    })
   })

   // Attach an event listener to play, next and previous
   play.addEventListener("click", ()=>{
    if (currentSong.paused) {
        currentSong.play()
        play.src = "pause.svg"
    }
    else{
        currentSong.pause()
        play.src = "play.svg"
    }
   })

   // Listen for timeupdate event
   currentSong.addEventListener("timeupdate", ()=>{
    console.log(currentSong.currentTime, currentSong.duration)
    document.querySelector(".songtime").innerHTML = `${secondsToMinutes(currentSong.currentTime)}/${secondsToMinutes(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
   })

   // Add an event listener to seekbar
   document.querySelector(".seekbar").addEventListener("click", e=>{
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration) * percent) / 100
   })

    const hamburger = document.querySelector(".hamburger");
    const closeBtn = document.querySelector(".close");
    const left = document.querySelector(".left");

    // make sure close starts hidden
    closeBtn.style.display = "none";

    hamburger.addEventListener("click", () => {
    left.style.left = "0";

    // hide hamburger, show close
    hamburger.style.display = "none";
    closeBtn.style.display = "block";
    closeBtn.innerHTML = `<img class="invert" src="close.svg" alt="close" width="28" height="28">`;
    });

    closeBtn.addEventListener("click", () => {
    left.style.left = "-180%";

    // hide close, show hamburger
    closeBtn.style.display = "none";
    hamburger.style.display = "block";
    hamburger.innerHTML = `<img class="invert" src="hamburger.svg" alt="menu" width="28" height="28">`;
    });

}
main()