const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to fetch movie details using OMDB API
const getMovieInfo = async (movie) => {
try{
    const myAPIKey = "56417072";
    const url = `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;
   
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Unable to fetch movie deta.")
        }
        const data = await response.json();

        showMovieData(data);
        
    } catch (error) {
        showErrorMessage(error.message || "An error occurred while fetching the movie.");
    }
    
};

// Function to show movie data on the screen
const showMovieData = (data) => {
    movieContainer.innerHTML = ""; // Clear the container before displaying new data


    movieContainer.classList.remove('noBackground');//remove the containers background when no movie name is search

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    // Create movie info container
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');

    // Add movie details
    movieElement.innerHTML = `
        <h2>${Title}</h2>
        <p><strong>Rating: &#11088;</strong> ${imdbRating}</p>
        <p><strong>Released Date:</strong> ${Released}</p>
        <p><strong>Duration:</strong> ${Runtime}</p>
        <p><strong>Cast:</strong> ${Actors}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
    `;

    // Create genre container
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    Genre.split(",").forEach((genre) => {
        const genreTag = document.createElement('p');
        genreTag.textContent = genre.trim();
        movieGenreElement.appendChild(genreTag);
    });

    movieElement.appendChild(movieGenreElement);

    // Add movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}" alt="${Title} Poster">`;

    // Append poster and info to the container
    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
};
//function to display error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');

}

//function to handle the form submission
const handleFormSubmission = (message) = (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        showErrorMessage("fetching movie Informmation...")
        getMovieInfo(movieName);
    }else{
       showErrorMessage("Enter movie name to get movie information");
    }
}
// Add event listener to the search form
searchForm.addEventListener('submit', handleFormSubmission);
