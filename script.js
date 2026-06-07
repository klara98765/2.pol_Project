const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const moviesContainer = document.getElementById('movies');
const navbar=document.getElementById('navbar');
const random=document.getElementById('button333');
const watchbutton=document.getElementById('list');
const moodbuttons=document.getElementsByClassName('mood');

moodbuttons[0].addEventListener('click', ()=>{
    moviesContainer.innerHTML = 'Načítám...';
    randomFilm('dark');
})
moodbuttons[1].addEventListener('click', ()=>{
    moviesContainer.innerHTML = 'Načítám...';
    randomFilm('emotional');
})
moodbuttons[2].addEventListener('click', ()=>{
    moviesContainer.innerHTML = 'Načítám...';
    randomFilm('comfortiong');
})
moodbuttons[3].addEventListener('click', ()=>{
    moviesContainer.innerHTML = 'Načítám...';
    randomFilm('chaotic');
})
moodbuttons[4].addEventListener('click', ()=>{
    moviesContainer.innerHTML = 'Načítám...';
    randomFilm('weird');
})
moodbuttons[5].addEventListener('click', ()=>{
    moviesContainer.innerHTML = 'Načítám...';
    randomFilm('mysterious');
})

watchbutton.addEventListener('click', watchPage);

random.addEventListener('click', () => randomFilm('no'));

let firstRun = true;
window.addEventListener('load', () => {
    if (firstRun) {
        console.log('Spuštěno poprvé po načtení stránky');

        mainPage();

        firstRun = false;
    }
});

navbar.addEventListener('click', mainPage);

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchText = searchInput.value;
    fetch('http://www.omdbapi.com/?apikey=aa95c631&s='+searchText)
        .then(res => res.json())
        .then(res => onPage2(res.Search))
        .catch(err => console.error(err));
    console.log(searchText);
});

function mainPage(){
    moviesContainer.innerHTML = 'Main Page';
}
async function randomFilm(nch) {
    const myHeaders = new Headers();
    myHeaders.append("X-BetaSeries-Key", "cdb995feba8d");

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };
    if(nch=='no'){
        fetch("https://api.betaseries.com/movies/random", requestOptions)
            .then((response) => response.json())
            .then((result) => findFilm(result.movies[0].imdb_id))
    }else{
        fetch("https://api.betaseries.com/movies/random", requestOptions)
            .then((response) => response.json())
            .then((result) => check(result.movies[0], nch))
    }
}

function check(film, mood){
    console.log(film.genres);
    if(mood=='dark'){
        if(film.genres.includes('Horreur') || film.genres.includes('Thriller')|| film.genres.includes('Crime')){
            findFilm(film.imdb_id, mood);
        }else{
            randomFilm(mood);
        }
    }else if (mood == 'emotional') {
        if (film.genres.includes('Drame') ||film.genres.includes('Romance') ||film.genres.includes('Musique')){
            findFilm(film.imdb_id, mood);
        } else {
            randomFilm(mood);
        }
    }else if (mood == 'comforting') {
        if (film.genres.includes('Comédie') || film.genres.includes('Familial') || film.genres.includes('Animation')) {
            findFilm(film.imdb_id, mood);
        } else {
            randomFilm(mood);
        }
    }else if (mood == 'chaotic') {
        if (film.genres.includes('Action') ||film.genres.includes('Aventure') ||film.genres.includes('Guerre')) {
            findFilm(film.imdb_id, mood);
        } else {
            randomFilm(mood);
        }
    }else if (mood == 'weird') {
        if (film.genres.includes('Fantastique') || film.genres.includes('Science-Fiction') || film.genres.includes('Animation')) {
            findFilm(film.imdb_id, mood);
        } else {
            randomFilm(mood);
        }
    }else if (mood == 'mysterious') {
        if (film.genres.includes('Mystère') || film.genres.includes('Thriller') || film.genres.includes('Crime')) {
            findFilm(film.imdb_id, mood);
        } else {
            randomFilm(mood);
        }
    }
}

async function findFilm(id, mood) {
    fetch('http://www.omdbapi.com/?apikey=aa95c631&i='+id)
            .then(res => res.json())
            .then(res => onPage(res, mood))
            .catch(err => console.error(err));
}

function Add(movie){
    let watchlist2 = JSON.parse(localStorage.getItem('watchlist'));
    if(watchlist2 == null) {watchlist2=[]};
    const exists = watchlist2.some(
            item => item.imdbID === movie.imdbID
    );
    if(!exists){
        watchlist2.push(movie);
    }else{
        watchlist2 = watchlist2.filter(
            movie22 => movie22.imdbID !== movie.imdbID
        );
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist2));
    onPage(movie);
}

function watchPage(){
    let watchlist2 = JSON.parse(localStorage.getItem('watchlist'));
    if(watchlist2==null){
        moviesContainer.innerHTML = 'Your watchlist is empty.';
    }else{
        onPage2(watchlist2);
    }
}


function onPage(movie, mood){
    if (movie.Title==undefined){
        moviesContainer.innerHTML = 'Načítám...';
        randomFilm(mood);
    }
    console.log(movie);
    moviesContainer.innerHTML = '';

    let watchlist2 = JSON.parse(localStorage.getItem('watchlist'));
    if(watchlist2 == null) {watchlist2=[]};
    const exists = watchlist2.some(
            item => item.imdbID === movie.imdbID
    );
    if(exists){
        buttonAdd='Delete from watchlist';
    }else{
        buttonAdd='Add to watchlist'
    }
    
    const card = document.createElement('div');
    const fallbackPoster = 'https://payload.cargocollective.com/1/23/758880/13104445/NO-MOVIE-POSTERS-02-03-003_2000_c.jpg';
    card.innerHTML = `
             <div class="row g-4">
            <div class="col-md-4">
                <img
                    src="${movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : fallbackPoster}"
                    class="card-img-top"
                    alt="${movie.Title}"
                    onerror="this.onerror=null; this.src='${fallbackPoster}'"
                >
            </div>

            <div class="col-md-8">
                <h1 class="mb-2">${movie.Title}</h1>
                <p class="text-muted">
                    ${movie.Year} • ${movie.Rated} • ${movie.Runtime}
                </p>
                <p>${movie.Plot}</p>
                <div class="mb-3">
                    <span class="badge bg-primary me-1">
                        ${movie.Genre}
                    </span>
                </div>
                <ul class="list-group mb-3">
                    <li class="list-group-item">
                        <strong>Actors:</strong> ${movie.Actors}
                    </li>
                    <li class="list-group-item">
                        <strong>Director:</strong> ${movie.Director}
                    </li>
                    <li class="list-group-item">
                        <strong>Writer:</strong> ${movie.Writer}
                    </li>
                    <li class="list-group-item">
                        <strong>Country:</strong> ${movie.Country}
                    </li>
                    <li class="list-group-item">
                        <strong>Language:</strong> ${movie.Language}
                    </li>
                </ul>
                <div class="row text-center">
                    <div class="col">
                        <div class="p-2 border rounded">
                            <h5>${movie.imdbRating}</h5>
                            <small>IMDb rating</small>
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-2 border rounded">
                            <h5>${movie.imdbVotes}</h5>
                            <small>Votes</small>
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-2 border rounded">
                            <h5>${movie.totalSeasons || '-'}</h5>
                            <small>Seasons</small>
                        </div>
                    </div>
                </div>
            </div>
           <button type="button" class="btn btn-primary" id="add">${buttonAdd}</button>
        </div>
    `;
    moviesContainer.appendChild(card);
    const add=document.getElementById('add');
    const deletef=document.getElementById('delete');
    add.addEventListener('click', () =>Add(movie));
}



function onPage2(info){
    moviesContainer.innerHTML = '';
    console.log(info);
    info.forEach(movie => {
        const poster =
            movie.Poster && movie.Poster !== 'N/A'
                ? movie.Poster
                : 'https://payload.cargocollective.com/1/23/758880/13104445/NO-MOVIE-POSTERS-02-03-003_2000_c.jpg';
        const card = document.createElement('div');
        card.className = 'col-md-4 col-lg-3';
        card.innerHTML =  `
            <div class="movie-card card" style="width: 18rem; height: 38rem;">
                <img class="card-img-top" style="max-height: 25rem;" src="${poster}" alt="${movie.Title}">
                <div class="card-body">
                    <h5>${movie.Title}</h5>
                    <p>${movie.Year}</p>
                    <small>${movie.Type}</small>
                </div>
            </div>
        `;
        const button = card.querySelector('.movie-card');
        button.addEventListener('click', async function () {
            fetch('http://www.omdbapi.com/?apikey=aa95c631&i='+movie.imdbID)
                .then(res => res.json())
                .then(res => onPage(res, 'no'))
                .catch(err => console.error(err));
        });

        moviesContainer.appendChild(card);
    });

}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js")
        .then(() => console.log("SW registered"))
        .catch(err => console.log("SW error", err));
}

document.addEventListener("DOMContentLoaded", () => {

    window.addEventListener("offline", () => {
        console.log('offline');
    });

    window.addEventListener("online", () => {
        console.log('online');
    });

});