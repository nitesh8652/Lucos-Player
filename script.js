async function fetchingsngs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    console.log(response)

    let container = document.createElement("container")
    container.innerHTML = response;
    let mp = container.getElementsByTagName("a")
    console.log(mp)
    let mp3 = []
    for (let index = 0; index < mp.length; index++) {
        const element = mp[index];
        if (element.href.includes(".mp3")) {
            mp3.push(element.href.split("/songs/")[1])
        }
    }
    return mp3
}

async function main(){
    let mp3 = await fetchingsngs();
    console.log(mp3);

let songlist=document.querySelector(".que").getElementsByTagName("ul")[0];
for (const song of mp3) {
    songlist.innerHTML = songlist.innerHTML + `<li><img src="assets/library.svg" alt="library" class="libimg">
                                <div class="info">
                                    <div> ${song.replaceAll("%20", " ")}</div>
                                    <div>Song Artist</div>
                                </div>
                                <div class="playmini">
                                    <span>Play</span>
                                <img src="assets/play-mini-card.svg" alt="play">
                            </div></li>`;
}
    // let audio = new Audio(mp3[0]);
    // audio.play();
    
    // audio.addEventListener("loadeddata",()=>{
    //     let duration = audio.duration;
    //     console.log(duration);
    // })


    

}

main();



function getSongMetadata(file) {
    jsmediatags.read(file, {
        onSuccess: function(tag) {
                        
            const artist = tag.tags.artist || "Unknown Artist";
            const title = tag.tags.title || "Unknown Title";
            console.log("Artist:", artist);
            console.log("Title:", title);
            displaySongInfo(title, artist); // Update display with song info
        },
        onError: function(error) {
            console.log("Error reading tags:", error);
        }
    });
}

function displaySongInfo(title, artist) {
    document.getElementById("songTitle").textContent = title;
    document.getElementById("songArtist").textContent = artist;
}

// Usage example: Pass in an actual file from an `<input type="file">`
document.getElementById("fileInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        getSongMetadata(file);
    }
});
