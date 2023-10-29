import './Techs.css';

function Techs() {
  return (
    <section id="techs" className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__heading">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__row-tech-box">
          <li className="techs__mini-tech-box">HTML</li>
          <li className="techs__mini-tech-box">CSS</li>
          <li className="techs__mini-tech-box">JS</li>
          <li className="techs__mini-tech-box">React</li>
          <li className="techs__mini-tech-box">Git</li>
          <li className="techs__mini-tech-box">Express.js</li>
          <li className="techs__mini-tech-box">mongoDB</li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;