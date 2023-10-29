import './NotFoundMoviesText.css';

function NotFoundMoviesText(props) {
  return (
    <p className={`not-found-movies-text ${ props.text !== "Ничего не найдено" ? "not-found-movies-text_error" : ""}`}>{ props.text }</p>
  )
}

export default NotFoundMoviesText;