import * as React from 'react';
import '../Register/Register.css';
import '../Header/Header.css';
import logo from '../../images/logo.svg';
import AuthForm from '../AuthForm/AuthForm';
import FormValidation from '../FormValidation/FormValidation';

function Login(props) {
  const formRef = React.createRef();
  const { handleInputChange, isFormValid, values, errors } = FormValidation(
    formRef, { "email-input": "", "password-input": "" }, { "email-input": "", "password-input": "" }
  );

  React.useEffect(() => {
    if (props.isLoggedIn) {
      props.navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSubmit(e) {
    e.preventDefault();

    props.setLogButtonText('Вход...');

    props.onSignIn({ email: values["email-input"], password: values["password-input"] });
  };

  const handleNavigateToSignUp = () => {
    props.handleNavigate('/signup');
    props.setSignErrorMessage("");
  }

  return (
    <section className="register">
      <div className="register__container">
        <img onClick={ () => props.handleNavigate('/') } src={ logo } className="logo" alt="Логотип" />
        <h2 className="register__title">Рады видеть!</h2>
        <AuthForm
          login={ true }
          logButtonText={ props.logButtonText }
          onSubmit={ onSubmit }
          handleInputChange={ handleInputChange }
          isFormValid={ isFormValid }
          values={ values }
          errors={ errors }
          signErrorMessage={ props.signErrorMessage }
          formRef={ formRef }
        />
        <div className="register__underform-text-container">
          <p className="register__text">Ещё не зарегистрированы?</p>
          <span onClick={ handleNavigateToSignUp } className="register__button">Регистрация</span>
        </div>
      </div>
    </section>
  )
}

export default Login;