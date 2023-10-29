import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <nav className="footer__container">
        <p className="footer__date">&copy; 2023</p>
        <ul className="footer__list">
          <li className="footer__list-element">
            <a href="https://practicum.yandex.ru" rel="noreferrer" target="_blank" className="footer__link">Яндекс.Практикум</a>
          </li>
          <li className="footer__list-element">
            <a href="https://github.com/Agregati4" rel="noreferrer" target="_blank" className="footer__link">Github</a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer;