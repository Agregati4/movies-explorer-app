import './AboutMe.css';
import photo from '../../images/about-me__photo.jpg';

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <figure className="about-me__container">
        <figcaption className="about-me__info-box">
          <h3 className="about-me__name">Иван</h3>
          <p className="about-me__activity">Веб-разработчик, 20 лет</p>
          <p className="about-me__info">Я родился в Сургуте, а сейчас живу и учусь в Москве.
          Я люблю слушать музыку, а ещё увлекаюсь баскетболом.
          Примерно год назад начал кодить.
          За это время успел закончить курс "Веб-разработчик" от Яндекс практикума и выполнить несколько проектов.
          Сейчас работаю над пет-проектом "Chatik", разрабатываю собственный чат.
          Стараюсь прокачивать свои навыки программирования каждый день и мечтаю найти работу в этой области.</p>
          <a href="https://github.com/Agregati4" rel="noreferrer" target="_blank" className="about-me__caption">Github</a>
        </figcaption>
        <img src={ photo } className="about-me__photo" alt="Фотография разработчика" />
      </figure>
    </section>
  )
}

export default AboutMe;