let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/unstoppable.jpg',
        name : 'Unstoppable',
        artist : 'by Sia',
        music : 'music/unstoppable.mp3'
    },
    {
        img : 'images/Kar-Har-Maidaan-Fateh-Sanju-500-500.jpg',
        name : 'Maidaan Fateh',
        artist : 'by Shreya Ghoshal, Sukhwinder Singh',
        music : 'music/Kar Har Maidaan Fateh.mp3'
    },
    {
        img : 'images/restart.jpg',
        name : 'Restart',
        artist : 'by Shaan, Swanand Kirkire',
        music : 'music/Restart(PagalWorldl).mp3'
    },
    {
        img : 'images/bandeya.jpg',
        name : 'Bandeya re Bandeya',
        artist : 'by Arijit Singh, Asees Kaur',
        music : 'music/Bandeya Rey Bandeya - Arijit Singh, Asees Kaur.m4a'
    }


];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i&lt;6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate(&#039;#&#039;);
    let Color2 = populate(&#039;#&#039;);
    var angle = &#039;to right&#039;;

    let gradient = &#039;linear-gradient(&#039; + angle + &#039;,&#039; + Color1 + &#039;, &#039; + Color2 + &quot;)&quot;;
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = &quot;00:00&quot;;
    total_duration.textContent = &quot;00:00&quot;;
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add(&#039;randomActive&#039;);
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove(&#039;randomActive&#039;);
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add(&#039;rotate&#039;);
    wave.classList.add(&#039;loader&#039;);
    playpause_btn.innerHTML = &#039;<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index &lt; music_list.length - 1 &amp;&amp; isRandom === false){
        track_index += 1;
    }else if(track_index  0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds &lt; 10) {currentSeconds = &quot;0&quot; + currentSeconds; }
        if(durationSeconds &lt; 10) { durationSeconds = &quot;0&quot; + durationSeconds; }
        if(currentMinutes &lt; 10) {currentMinutes = &quot;0&quot; + currentMinutes; }
        if(durationMinutes &lt; 10) { durationMinutes = &quot;0&quot; + durationMinutes; }

        curr_time.textContent = currentMinutes + &quot;:&quot; + currentSeconds;
        total_duration.textContent = durationMinutes + &quot;:&quot; + durationSeconds;
    }
} 
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add('randomActive');
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

// Shuffle function for randomly shuffling the music list
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

function nextTrack() {
  if (isRandom) {
      track_index = Math.floor(Math.random() * music_list.length);
  } else {
      track_index = (track_index + 1) % music_list.length;
  }
  loadTrack(track_index);
  playTrack();
}