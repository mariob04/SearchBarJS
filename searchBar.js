document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const resultsList = document.getElementById("results");

  searchButton.addEventListener("click", async function () {
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
  });
});
