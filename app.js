const searchSongs = () => {
  const searchText = document.getElementById("search-field").value;
  const songUrl = `https://api.lyrics.ovh/suggest/${searchText}`;

  //Load data
  fetch(songUrl)
    .then((res) => res.json())
    .then((response) => displaySongs(response.data))
    //* this is to catch error if any *
    .catch((error) => displayError(error));
  //   console.log(songUrl);
};

// //! using async await here
// const searchSongs = async () => {
//   const searchText = document.getElementById("search-field").value;
//   const songUrl = `https://api.lyrics.ovh/suggest/${searchText}`;

//   //Load data
//   const res = await fetch(songUrl);
//   const data = await res.json();
//   displaySongs(data.data);
//   //   console.log(data.data);
// };

const displaySongs = (songs) => {
  const songContainerDiv = document.getElementById("song-container");
  songContainerDiv.innerHTML = "";

  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}','${song.title}' )" class="btn btn-success">Get Lyrics</button>
        </div>
        
    `;
    songContainerDiv.appendChild(songDiv);
  });
  //   console.log(songs);
};

// const getLyrics = (artist, title) => {
//   const lyricsUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`;

//   fetch(lyricsUrl)
//     .then((res) => res.json())
//     .then((data) => displayLyrics(data.lyrics));
//   //   console.log(lyricsUrl);
// };

//! using async await here
const getLyrics = async (artist, title) => {
  const lyricsUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`;

  try {
    const res = await fetch(lyricsUrl);
    const data = await res.json();
    displayLyrics(data.lyrics);
  } catch (error) {
    //here we can give customized error message as well
    displayError(error);
  }

  //   console.log(lyricsUrl);
};

const displayLyrics = (lyrics) => {
  const songLyricsDiv = document.getElementById("song-lyrics");
  songLyricsDiv.innerText = lyrics;
  //   console.log("working");
};

const displayError = (error) => {
  const errorTag = document.getElementById("error-message");
  errorTag.innerText = error;
};
