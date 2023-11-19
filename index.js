const searchMovies = document.querySelector(".movie-name");
const searchBtn = document.querySelector(".search-btn");
const result = document.querySelector(".result");

async function getMovie() {
  try {
    let movieName = searchMovies.value;
    let url = `https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=${encodeURIComponent(
      movieName
    )}`;

    if (movieName.length <= 0) {
      result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    } else {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "9b4677a99bmsh050563c511f9313p1592e4jsn7a04efefceb6",
          "X-RapidAPI-Host": "imdb188.p.rapidapi.com",
        },
      });

      const data = await response.json();
      console.log(data.id);
      if (data.status === "true") {
        const resultContainer = document.createElement("div");

        data.forEach((movie) => {
          const idObject = movie.id || {};

          const movieDiv = document.createElement("div");
          movieDiv.classList.add("info");

          const img = document.createElement("img");
          img.src = movie.image;
          img.classList.add("poster");
          movieDiv.appendChild(img);

          const infoDiv = document.createElement("div");

          const title = document.createElement("h2");
          title.textContent = movie.title;
          infoDiv.appendChild(title);

          const ratingDiv = document.createElement("div");
          ratingDiv.classList.add("rating");

          const starImg = document.createElement("img");
          starImg.src = "star-icon.svg";

          const rating = document.createElement("h4");
          rating.textContent = movie.rating;

          ratingDiv.appendChild(starImg);
          ratingDiv.appendChild(rating);
          infoDiv.appendChild(ratingDiv);

          const detailsDiv = document.createElement("div");
          detailsDiv.classList.add("details");

          const rated = document.createElement("span");
          rated.textContent = movie.rated;

          const year = document.createElement("span");
          year.textContent = movie.year;

          const runtime = document.createElement("span");
          runtime.textContent = movie.runtime;

          detailsDiv.appendChild(rated);
          detailsDiv.appendChild(year);
          detailsDiv.appendChild(runtime);
          infoDiv.appendChild(detailsDiv);

          const genreDiv = document.createElement("div");
          genreDiv.classList.add("genre");

          const genre = document.createElement("div");
          genre.innerHTML = movie.genre.split(",").join("</div><div>");

          genreDiv.appendChild(genre);
          infoDiv.appendChild(genreDiv);

          const idDiv = document.createElement("div");
          idDiv.classList.add("id-info");

          const id = document.createElement("p");
          id.textContent = `ID: ${idObject.id || "N/A"}`;

          idDiv.appendChild(id);
          infoDiv.appendChild(idDiv);

          movieDiv.appendChild(infoDiv);
          const plotDiv = document.createElement("div");
          plotDiv.innerHTML = `<h3>Plot:</h3><p>${movie.plot}</p>`;
          movieDiv.appendChild(plotDiv);

          const actorsDiv = document.createElement("div");
          actorsDiv.innerHTML = `<h3>Cast:</h3><p>${movie.actors}</p>`;
          movieDiv.appendChild(actorsDiv);

          resultContainer.appendChild(movieDiv);
        });

        result.innerHTML = "";
        result.appendChild(resultContainer);
      } else {
        result.innerHTML = `<h3 class="msg">No movie found</h3>`;
      }
    }
  } catch (error) {
    result.innerHTML = `<h3 class="msg">Error Occurred: ${error.message}</h3>`;
  }
}

searchBtn.addEventListener("click", getMovie);
