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
    songlist.innerHTML = songlist.innerHTML + `<li> ${song.replaceAll("%20", " ")} </li>`;
}
    let audio = new Audio(mp3[0]);
    audio.play();
    
    audio.addEventListener("loadeddata",()=>{
        let duration = audio.duration;
        console.log(duration);
    })

}

main();