const albumCard = function (songInfo) {
  return `
      <div class="col text-center" id=${songInfo.id}>
          <img class="img-fluid" src=${songInfo.album.cover_medium} alt="track" />
        <p>
            Track: "${songInfo.title.length < 16 ? `${songInfo.title}` : `${songInfo.title.substring(0, 16)}...`}"<br>
            Artist: ${songInfo.artist.name}
        </p>
      </div>`;
};

const handleSection = async (artistName, querySelector) => {
  try {
    let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem", {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
      },
    });
    if (response.ok) {
      let { data } = await response.json();
      let musicSection = document.querySelector(querySelector);
      for (let i = 0; i < 4; i++) {
        musicSection.innerHTML += albumCard(data[i]);
      }
    } else {
      throw new Error("Error in fetching songs");
    }
  } catch (err) {
    console.log("error", err);
  }
};

const search = async (event) => {
  event.preventDefault();
  let div = document.querySelector("#searchResults .row");
  div.innerHTML = "";
  let searchQuery = document.querySelector("#searchField").value;

  if (searchQuery.length > 2) {
    document.querySelector("#searchResults").style.display = "block";

    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + searchQuery, {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          "X-RapidAPI-Key": "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
        },
      });
      if (response.ok) {
        let result = await response.json();
        let { data } = result;
        for (let x = 0; x < data.length; x++) {
          div.innerHTML += albumCard(data[x]);
        }
      } else {
        throw new Error("error in search");
      }
    } catch (err) {
      console.log("error", err);
    }
  } else {
    document.querySelector("#searchResults").style.display = "none";
  }
};

handleSection("queen", "#rockSection");
handleSection("katyperry", "#popSection");
handleSection("eminem", "#hipHopSection");
