const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelButton = addMovieModal.querySelector('.btn--passive');
const addButton = cancelButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal')

const movies =[];


const updateUI = () => {
if (movies.length === 0 ){
    entryTextSection.style.display = 'block';
} else {
    entryTextSection.style.display = 'none';
}
}

const toggleBackdrop  = function no () {
    backdrop.classList.toggle('visible');
}

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible')
}
const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};


const clearMovieInput = () => {
    // userInputs[0].value = '';
    for (const usrInputs of userInputs){
        usrInputs.value = '';
    }
}

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for(const movie of movies){
        if(movie.id===movieId){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    // listRoot.children[movieIndex].remove();
    listRoot.removeChild(listRoot.children[movieIndex]);
    closeMovieDeletionModal();
    updateUI();
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible')
}

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    // deleteMovie(movieId);
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive')
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

 confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

    cancelDeletionButton.addEventListener('click',  closeMovieDeletionModal)

    confirmDeletionButton.addEventListener('click',
     deleteMovieHandler.bind(null,movieId))
    
};
   

const renderNewMovieElement = (id,Title, ImageUrl, Rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class='movie-element__image'>
    <img src='${ImageUrl}' alt = '${Title}'>
    </div>
    <div class = 'movie-element__info'>
    <h2>${Title}</h2>
    <p>${Rating}/5</p>
    </div>
    `;
    newMovieElement.addEventListener('click',
     startDeleteMovieHandler.bind(null,id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};
const addClickHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' ||
     imageUrlValue.trim()==='' ||
     ratingValue.trim()===''||
     +ratingValue < 1 ||
     +ratingValue > 5){
         alert('Please enter valid values between 1 and 5 !')
     }

     const newMovie = {
         id: Math.random().toString(),
         Title: titleValue,
         ImageUrl: imageUrlValue,
         Rating: ratingValue
     };
     movies.push(newMovie);
     console.log(movies);
     closeMovieModal();
     toggleBackdrop();
     clearMovieInput();
     renderNewMovieElement(newMovie.id,newMovie.Title, newMovie.ImageUrl,newMovie.Rating)
     updateUI();
};
const backdropClickHandler = function  maybe() {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
}

const cancelClickHandler  = () => {
    closeMovieModal();
    clearMovieInput();
    toggleBackdrop();
}

startAddMovieButton.addEventListener('click', showMovieModal )
backdrop.addEventListener('click', backdropClickHandler);
cancelButton.addEventListener('click', cancelClickHandler);
addButton.addEventListener('click', addClickHandler);