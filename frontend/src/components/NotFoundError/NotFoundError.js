import './NotFoundError.css';

function NotFoundError(props) {
  return (
    <section className="not-found-error">
      <h1 className="not-found-error__title">404</h1>
      <p className="not-found-error__text">Страница не найдена</p>
      <button type="button" onClick={ () => props.handleNavigate(-1) } className="not-found-error__exit-button">Назад</button>
    </section>
  )
}

export default NotFoundError;