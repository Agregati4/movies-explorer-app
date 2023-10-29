import './AboutProject.css';

function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">
        <article className="about-project__info-container">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="about-project__info-container">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="about-project__scale">
        <p className="about-project__first-scale-part">1 неделя</p>
        <p className="about-project__second-scale-part">4 недели</p>
      </div>
      <div className="about-project__caption-box">
        <p className="about-project__caption">Back-end</p>
        <p className="about-project__caption">Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;