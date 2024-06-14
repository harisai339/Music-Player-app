const PlayButton = document.getElementById("play")
const AudioFile  = document.querySelector("audio")

let isMusicPlaying = false

function playMusic()
{
    //Logic to replace play icon with pause icon
    PlayButton.classList.replace("fa-play", "fa-pause")//<i class="fa-solid fa-play" id="play"></i>
    AudioFile.play()
    isMusicPlaying = true
}

function pauseMusic()
{
    PlayButton.classList.replace("fa-pause", "fa-play")
    AudioFile.pause()
    isMusicPlaying = false
}

PlayButton.addEventListener("click", function()
{
     if(isMusicPlaying)
     {
         pauseMusic()
     }
     else
    {
         playMusic()
    }
})
 

//I wanna to get know the  current time and the total duration of the audio file

 const TotalTime = document.querySelector(".totaltime")
 const CurrentTime = document.querySelector(".currenttime")
 const ProgressBar = document.querySelector(".progressbar")

 AudioFile.addEventListener("timeupdate", function(output)
 {
    let AudioCurrentTime = output.srcElement.currentTime
    let AudioTotalTime = output.srcElement.duration

  let MusicCompletedPercentage = AudioCurrentTime / AudioTotalTime * 100
  ProgressBar.style.width = `${MusicCompletedPercentage}%`


  let AudioTotalTimeInMinutes = Math.floor(AudioTotalTime / 60) //2 mints
  
  let AudioTotalTimeInSeconds = Math.floor(AudioTotalTime % 60) //seconds

  if(AudioTotalTimeInSeconds < 10) // 0 to 9 seconds
  {
      AudioTotalTimeInSeconds = `0${AudioTotalTimeInSeconds}`
  }

  TotalTime.textContent = `${AudioTotalTimeInMinutes}:${AudioTotalTimeInSeconds}`


  let AudioCurrentTimeInMinutes = Math.floor(AudioCurrentTime / 60) //2 mints

  let AudioCurrentTimeInSeconds = Math.floor(AudioCurrentTime  % 60) //seconds

  if(AudioCurrentTimeInSeconds < 10) // 0 to 9 seconds
  {
       AudioCurrentTimeInSeconds = `0${AudioCurrentTimeInSeconds}`
  }

  CurrentTime.textContent = `${AudioCurrentTimeInMinutes}:${AudioCurrentTimeInSeconds}`

})

//store song details

  const ForwardButton = document.getElementById("forward")

  const songsData = [
    {
        songName: "Calmdown",
        singerName: "Ed Sheeran",
        data: 2
     },
     {
         songName: "Unstoppable",
         singerName: "Sia",
         data: 3
     },
     {
         songName: "Driver license",
         singerName: "Olivia Rodrigo",
         data: 1
     }
]

   const SongName = document.getElementById("songname")
   const SingerName = document.getElementById("singername")
   const Image = document.getElementById("image")
   const BackwardButton = document.getElementById("backward")
   const Heart = document.getElementById("heart")

   let songIndex = 0

   function displaySong(){
   
    SongName.textContent = songsData[songIndex].songName
    SingerName.textContent = songsData[songIndex].singerName
    Image.src=`images/image-${songsData[songIndex].data}.jpg`
    AudioFile.src=`musics/music-${songsData[songIndex].data}.mp3`

    playMusic()

   }


  ForwardButton.addEventListener("click", function()
  {

     Heart.style.color = "white"
    //Logic to load the songs one by one on the web page
     displaySong()

      songIndex++

      //if songIndex = 1 --> reached the last song

      if(songIndex > songsData.length -1)
      {
        songIndex = 0
      }
    })
BackwardButton.addEventListener("click", function()
{
    Heart.style.color = "white"

//Logic to load the songs one by one on the web page

 displaySong()
 playMusic()

songIndex --

//if songIndex = 1 --> reached the last song

if(songIndex < 0)
{
   songIndex = songsData.length - 1
}

}) 

const ShuffleButton = document.getElementById("shuffle")

ShuffleButton.addEventListener("click", function()
{
    //Logic to play randomsong

    let randomsongIndex = Math.floor(Math.random () * 3)
    songIndex = randomsongIndex

    displaySong() 
})
Heart.addEventListener("click", function()
{
    // Change the color to red and also store the details(Song Name and Singer Name)
    Heart.style.color = "red"
    // Adding the details to local storage
    localStorage.setItem(SongName.textContent,SingerName.textContent)
})

Heart.addEventListener("dblclick", function()
{
    Heart.style.color = "white"

    localStorage.removeItem(SongName.textContent,SingerName.textContent)
})



const ProgressContainer = document.getElementById("progresscontainer")

ProgressContainer.addEventListener("click", function(event){

    //Logic to get the distance from the starting point
    let totalWidthFromTheStart = event.offsetX
    let totalWidth = event.srcElement.offsetWidth

    ProgressBar.style.width = `${event.offsetX}px`

    AudioFile.currentTime = totalWidthFromTheStart / totalWidth * AudioFile.duration


})





  

