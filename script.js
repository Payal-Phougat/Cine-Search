// Step 1: Select container
const container = document.getElementById("container");

// Step 2: API key
const API_KEY = "351e7c28b33b769ef2de67e341fca14e";

const getTrendingVideos = () => {
  return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {

      data.results.forEach(movie => {

        // Create elements
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const title = document.createElement("h3");
        title.innerText = movie.title;

        const rating = document.createElement("p");
        rating.innerText = "⭐ " + movie.vote_average;

        // Append elements
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(rating);



        container.appendChild(card);
      });
    })
    .catch(err => console.log(err));
};

// Call function
getTrendingVideos();