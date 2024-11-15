let currentsong = new Audio();
let mp3 = []
let rndmsgselected = false;




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

const playingmusic = (currenttrack) => {


    currentsong.src = "/songs/" + currenttrack;
    currentsong.play()
    play.src = "assets/pause.svg";
    document.querySelector(".runtime").innerHTML = "00:00";
    document.querySelector(".totaldura").innerHTML = "00:00";
    document.querySelector(".trackinfo").innerHTML = decodeURI
        (currenttrack);
    // document.querySelector(".heart-container").innerHTML=`<img src="assets/heart.svg" alt="heart">`;
    rndmsgselected = true;
}


async function main() {



    let mp3 = await fetchingsngs();
    console.log(mp3);

    let songlist = document.querySelector(".que").getElementsByTagName("ul")[0];


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

    Array.from(document.querySelector(".que").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playingmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })



    play.addEventListener("click", () => {

        if (!rndmsgselected) {
            const randomindex = Math.floor(Math.random() * mp3.length);
            const randomsong = mp3[randomindex];
            playingmusic(randomsong);
        } else {

            if (currentsong.paused) {
                currentsong.play();
                play.style.transform = "scale(1)";
                play.style.opacity="0";
                setTimeout(()=>{
                    play.src = "assets/pause.svg";
                    play.style.opacity="1";

                },200);
            } else {
                currentsong.pause()
                play.style.transform = "scale(1)";
                play.style.opacity="0";
                setTimeout(()=>{
                    play.style.opacity="1";
                },200);
                play.src = "assets/play.svg";

            }

        }

    });


    currentsong.addEventListener("loadedmetadata", () => {
        let duration = currentsong.duration;
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);
        let time = minutes + ":" + seconds;
        document.querySelector(".totaldura").innerHTML = `${minutes}:${seconds}`;
        console.log(time);
    })

    currentsong.addEventListener("timeupdate", () => {
        let duration = currentsong.duration;
        let currenttime = currentsong.currentTime;
        let min = Math.floor(currenttime / 60);
        let sec = Math.floor(currenttime % 60);
        let min1 = Math.floor(duration / 60);
        let sec1 = Math.floor(duration % 60);
        document.querySelector(".runtime").innerHTML = `${min}:${sec}`;
        document.querySelector(".circle").style.width = `${(currenttime / duration) * 100}%`
    })

    document.querySelector(".playbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width);
        document.querySelector(".circle").style.width = (percent * 100) + "%";
        currentsong.currentTime = percent * currentsong.duration;
        // console.log("Seek Percent:", percent, "New Current Time:", currentsong.currentTime);
    });

    previous.addEventListener("click",()=>{
        let previndex = mp3.indexOf(currentsong.src.split("/").slice(-1)[0]);
let previouslastindex= (previndex+1)%mp3.length;
playingmusic(mp3[previouslastindex]);
console.log("clic")

    })
    
    next.addEventListener("click",()=>{
       
        let nextindex =mp3.indexOf(currentsong.src.split("/").slice(-1)[0]);
        let nextlastindex = (nextindex + 1) % mp3.length;
        playingmusic(mp3[nextlastindex]);

         })
        // let index = mp3.indexOf(currentsong.src.split("/songs/")[1]);
        // console.log(currentsong.src.split("/songs/")[1])
        // console.log(mp3,index)

        // if ((index + 1) > length) {
        //     playingmusic(mp3[index+1]);
        // }
        
        // playingmusic(mp3[0]);


        // document.querySelector(".slider").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
            
        //     currentsong.volume = parseInt(e.target.value)/100;
        
        // })
        document.querySelector(".slider input").addEventListener("input",(e)=>{
        currentsong.volume = parseInt(e.target.value)/100

})





}

main();



function getSongMetadata(file) {
    jsmediatags.read(file, {
        onSuccess: function (tag) {

            const artist = tag.tags.artist || "Unknown Artist";
            const title = tag.tags.title || "Unknown Title";
            console.log("Artist:", artist);
            console.log("Title:", title);
            displaySongInfo(title, artist); // Update display with song info
        },
        onError: function (error) {
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