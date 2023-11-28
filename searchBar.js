document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const resultsList = document.getElementById("results");

  async function searchResults() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm.length > 0) {
      try {
        const songs = await searchSongs(searchTerm);
        displayResults(songs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      clearResults();
    }
  }

  searchButton.addEventListener("click", async function () {
    searchResults();
  });

  searchInput.addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
      searchResults();
    }
  });

  async function searchSongs(term) {
    const apiUrl = `https://itunes.apple.com/search?term=${term}&entity=song`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
  }

  function displayResults(songs) {
    clearResults();

    if (songs.length === 0) {
      const noResultsItem = document.createElement("li");
      noResultsItem.textContent = "No results found.";
      resultsList.appendChild(noResultsItem);
    } else {
      songs.forEach((song) => {
        const card = document.createElement("div");
        card.className = "card";

        const image = document.createElement("img");
        image.src = song.artworkUrl100;
        card.appendChild(image);

        const artistName = document.createElement("p");
        artistName.className = "artist-name";
        artistName.textContent = `${song.artistName}`;
        card.appendChild(artistName);

        const trackName = document.createElement("p");
        trackName.className = "track-name";
        trackName.textContent = `${song.trackName}`;
        card.appendChild(trackName);

        resultsList.appendChild(card);
      });
    }
  }

  function clearResults() {
    resultsList.innerHTML = "";
  }
});
