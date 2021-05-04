// const searchSongs = () => {
//    const searchText = document.getElementById('search-filed').value;
//    const url = `https://api.lyrics.ovh/suggest/${searchText}`
//    // load data
//    fetch(url)
//    .then(res => res.json())
//    .then(data => displaySongs(data.data))
//    .catch(error => displayError(error))
// }

const searchSongs = async () => {
   const searchText = document.getElementById('search-filed').value;
   const url = `https://api.lyrics.ovh/suggest/${searchText}`
   try{
      // load data
      toggleSpinner()
      const res = await fetch(url);
      const data = await res.json();
      displaySongs(data.data)
   }
   catch(error){
      displayError('Something went wrong! Please try again later.')
   }
}

const displaySongs = songs => {
   const songContainer = document.getElementById('song-container');
   songContainer.innerHTML = '';
   songs.forEach(song => {
      const songDiv = document.createElement('div');
      songDiv.className = 'single-result row align-items-center my-3 p-3';
      const songInfo = `
         <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
               <source src="${song.preview}" type="audio/mpeg">
            </audio>
         </div>
         <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
         </div>
      `;
      songDiv.innerHTML = songInfo;
      songContainer.appendChild(songDiv)
   });

   toggleSpinner()
}

// const getLyric =  (artist, title) => {
//    const url = `https://api.lyrics.ov/v1/${artist}/${title}`;
//    fetch(url)
//    .then(res => res.json())
//    .then(data => displayLyric(data.lyrics))
//    .catch(error => displayError('Something went wrong!! Please try again later'))
// }


const getLyric = async (artist, title) => {
   const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
   try{
      // load data
      toggleSpinner()
      const res = await fetch(url)
      const data = await res.json()
      displayLyric(data.lyrics)
   }
   catch(error){
      displayError("Sorry! Failed to load lyrics, Please try again later.")
   }
}

const displayLyric = lyrics => {
   const songLyric = document.getElementById('song-lyrics');
   songLyric.innerText = lyrics;
   toggleSpinner()
}

const displayError = error => {
   document.getElementById('custom-arror').innerText = error;
}

const toggleSpinner = (show) => {
   const spinner = document.getElementById('toggle-spinner');
   spinner.classList.toggle('d-none')
}