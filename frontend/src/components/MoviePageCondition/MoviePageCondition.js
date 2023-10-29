import '../MoviesCardList/MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import NotFoundMoviesText from '../NotFoundMoviesText/NotFoundMoviesText';

function MoviePageCondition(props) {
  return(
    <>
      {
        props.isPreloaderActive ?
        <Preloader /> :
        // eslint-disable-next-line eqeqeq
        props.shownMovies.length == 0 ?
        <NotFoundMoviesText text={ props.notFoundMoviesText } /> :
        props.shownMovies.map((movie) => <MoviesCard
          key={ props.isSavedMoviesPage ? movie.movieId : movie.id}
          data={ movie }
          handleMovieLike={ props.handleMovieLike }
          isSavedMoviesPage={ props.isSavedMoviesPage }
          isCardSaved={ props.isCardSaved }
          handleDeleteMovie={ props.handleDeleteMovie }
          savedMoviesData={ props.savedMoviesData }
        />)
      }
    </>
  )
}

export default MoviePageCondition;