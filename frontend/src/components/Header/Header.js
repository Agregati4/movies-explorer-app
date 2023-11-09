import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header(props) {
  const [ isPullOutMenuOpen, setIsPullOutMenuOpen ] = useState(false);
  const navigate = useNavigate();

  function handlePullOutMenu() {
    setIsPullOutMenuOpen((state) => {
      state = !state;
      return(state);
    });
  }

  return (
    <header className={ `header ${ props.isLoggedIn && "header_loggedIn" }`}>
      <img onClick={ () => navigate('/') } src={ logo } className="logo" alt="Логотип" />
      <Navigation
        isLoggedIn={ props.isLoggedIn }
        isPullOutMenuOpen={ isPullOutMenuOpen }
        handlePullOutMenu={ handlePullOutMenu }
        isMoviesPage={ props.isMoviesPage }
        isSavedMoviesPage={ props.isSavedMoviesPage }
      />
      <button type="button" onClick={ handlePullOutMenu } className={ `header__mobile-icon ${ !props.isLoggedIn && "header__mobile-icon_mobile-display-none" }` }></button>
    </header>
  )
}

export default Header;