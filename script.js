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
            songs.push(element.href)
        }
        
    }
    return songs;
}

getSongs()

async function main(){
    //Get the list of all songs
    let songs = await getSongs()
    console.log(songs)

    //Play the first song
    var audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener("loadeddata", ()=>{
        let duration = audio.duration;
        console.log(duration)
    })
}
main()