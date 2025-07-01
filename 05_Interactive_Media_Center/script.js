const songs = [
    {
        title: "Despacito",
        artist: "Luis Fonsi",
        file: "audio/Luis Fonsi - Despacito ft. Daddy Yankee.mp3",
        cover: "images/despacito.jpeg"
    },
    {
        title: "Señorita",
        artist: "Shawn Mendes & Camila Cabello",
        file: "audio/Shawn Mendes, Camila Cabello - Señorita.mp3",
        cover: "images/senorita.jpeg"
    },
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        file: "audio/Ed Sheeran - Shape of You (Official Music Video).mp3",
        cover: "images/shapeofyou.jpeg"
    }
];

let currentSong = 0;
const audio = document.getElementById("music-player");
const progressBar = document.getElementById("progress-bar");
const ctrlIcon = document.getElementById("ctrlIcon");

// DOM elements for dynamic update
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const source = document.getElementById("audio-source");

function loadSong(index) {
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;
    source.src = songs[index].file;
    audio.load(); // re-load the new audio file
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        audio.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        audio.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

// Sync progress bar
audio.ontimeupdate = function () {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;

    if (audio.ended) {
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
};

progressBar.oninput = function () {
    audio.currentTime = progressBar.value;
};

// Initial load
loadSong(currentSong);



// javascript for the Quote section
const quote = document.getElementById("quote-text");
const author = document.getElementById("quote-author");

const api_url = "https://api.api-ninjas.com/v1/quotes";
const api_key = "XchgGMcnD/bc4RJYoVlJ5A==kWPzLqr77YnmMwud";

async function getquote() {
    try {
        const response = await fetch(api_url, {
            method: 'GET',
            headers: {
                'X-Api-Key': api_key
            }
        });
        const data = await response.json();
        quote.innerHTML = `"${data[0].quote}"`;
        author.innerHTML = `- ${data[0].author}`;
    } catch (error) {
        quote.innerHTML = `"Could not fetch quote."`;
        author.innerHTML = `- Try again later`;
    }
}

getquote();  // Call initially on load

function tweet() {
    window.open(
        `https://twitter.com/intent/tweet?text=${quote.innerHTML} ${author.innerHTML}`,
        "_blank"
    );
}


// javascript for the text-to-speech section
function speakInput() {
    const text = document.getElementById("tts-input").value.trim();
    if (!text) {
        alert("Please type something to speak.");
        return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utter);
}


