const container = document.getElementById("container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

const API_KEY = "351e7c28b33b769ef2de67e341fca14e";

let moviesData = [];

// Fetch Movies
const getTrendingVideos = () => {

  fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {

      moviesData = data.results;
      displayMovies(moviesData);

    })
    .catch(err => console.log(err));
};

// Display Movies
const displayMovies = (movies) => {

  container.innerHTML = "";

  movies.map(movie => {

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const title = document.createElement("h3");
    title.innerText = movie.title;

    const rating = document.createElement("p");
    rating.innerText = "⭐ " + movie.vote_average;

    // Favorite Button
    const favBtn = document.createElement("button");
    favBtn.innerText = "❤️ Favorite";

    favBtn.addEventListener("click", () => addToFavorites(movie));

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(rating);
    card.appendChild(favBtn);

    container.appendChild(card);

  });
};


// Search Movies
searchInput.addEventListener("input", () => {

  const searchValue = searchInput.value.toLowerCase();

  const filteredMovies = moviesData.filter(movie =>
    movie.title.toLowerCase().includes(searchValue)
  );

  displayMovies(filteredMovies);

});


// Sort Movies
sortSelect.addEventListener("change", () => {

  let sortedMovies = [...moviesData];

  if (sortSelect.value === "high") {
    sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
  }

  if (sortSelect.value === "low") {
    sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
  }

  displayMovies(sortedMovies);

});


// Favorites
const addToFavorites = (movie) => {

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.push(movie);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  alert("Added to Favorites ❤️");
};


// Call Function
getTrendingVideos();