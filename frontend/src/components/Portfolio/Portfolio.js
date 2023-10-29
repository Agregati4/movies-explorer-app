import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__link-list">
        <li className="portfolio__list-element">
          <a href="https://agregati4.github.io/how-to-learn/" rel="noreferrer" target="_blank" className="portfolio__link">
            <p className="portfolio__list-text">Статичный сайт</p>
            <p className="portfolio__list-icon">↗</p>
          </a>
        </li>
        <li className="portfolio__list-element">
          <a href="https://agregati4.github.io/russian-travel/" rel="noreferrer" target="_blank" className="portfolio__link">
            <p className="portfolio__list-text">Адаптивный сайт</p>
            <p className="portfolio__list-icon">↗</p>
          </a>
        </li>
        <li className="portfolio__list-element">
          <a href="https://agregati4.github.io/mesto/" rel="noreferrer" target="_blank" className="portfolio__link">
            <p className="portfolio__list-text">Одностраничное приложение</p>
            <p className="portfolio__list-icon">↗</p>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;