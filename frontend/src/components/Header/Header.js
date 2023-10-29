import * as React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const [ isPullOutMenuOpen, setIsPullOutMenuOpen ] = React.useState(false);

  function handlePullOutMenu() {
    setIsPullOutMenuOpen((state) => {
      state = !state;
      return(state);
    });
  }

  return (
    <header className={ `header ${ props.isLoggedIn && "header_loggedIn" }`}>
      <img onClick={ () => props.handleNavigate('/') } src={ logo } className="logo" alt="Логотип" />
      <Navigation
        isLoggedIn={ props.isLoggedIn }
        isPullOutMenuOpen={ isPullOutMenuOpen }
        handlePullOutMenu={ handlePullOutMenu }
        isMoviesPage={ props.isMoviesPage }
        isSavedMoviesPage={ props.isSavedMoviesPage }
        handleNavigate = { props.handleNavigate }
      />
      <button type="button" onClick={ handlePullOutMenu } className={ `header__mobile-icon ${ !props.isLoggedIn && "header__mobile-icon_mobile-display-none" }` }></button>
    </header>
  )
}

export default Header;