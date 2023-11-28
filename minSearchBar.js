document.addEventListener("DOMContentLoaded", function () {
  const e = document.getElementById("search-input"),
    t = document.getElementById("search-button"),
    n = document.getElementById("results");
  async function c() {
    const t = e.value.trim();
    if (t.length > 0)
      try {
        !(function (e) {
          if ((a(), 0 === e.length)) {
            const e = document.createElement("li");
            (e.textContent = "No results found."), n.appendChild(e);
          } else
            e.forEach((e) => {
              const t = document.createElement("div");
              t.className = "card";
              const c = document.createElement("img");
              (c.src = e.artworkUrl100), t.appendChild(c);
              const a = document.createElement("p");
              (a.className = "artist-name"),
                (a.textContent = `${e.artistName}`),
                t.appendChild(a);
              const s = document.createElement("p");
              (s.className = "track-name"),
                (s.textContent = `${e.trackName}`),
                t.appendChild(s),
                n.appendChild(t);
            });
        })(
          await (async function (e) {
            const t = `https://itunes.apple.com/search?term=${e}&entity=song`,
              n = await fetch(t);
            return (await n.json()).results;
          })(t)
        );
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    else a();
  }
  function a() {
    n.innerHTML = "";
  }
  t.addEventListener("click", async function () {
    c();
  }),
    e.addEventListener("keypress", async function (e) {
      "Enter" === e.key && c();
    });
});
