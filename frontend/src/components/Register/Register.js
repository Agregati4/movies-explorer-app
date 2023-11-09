import * as React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import AuthForm from '../AuthForm/AuthForm';
import '../Header/Header.css';
import FormValidation from '../FormValidation/FormValidation';
import { useNavigate } from 'react-router-dom';

function Register(props) {
  const navigate = useNavigate();
  const formRef = React.createRef();
  const { handleInputChange, isFormValid, values, errors } = FormValidation(
    formRef, { "name-input": "", "email-input": "", "password-input": "" }, { "name-input": "", "email-input": "", "password-input": "" }
  );

  React.useEffect(() => {
    if (props.isLoggedIn) {
      props.navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSubmit(e) {
    e.preventDefault();

    props.setRegButtonText('Регистрация...');

    props.onSignUp({ name: values["name-input"], email: values["email-input"], password: values["password-input"] })
  }

  const navigateToSignIn = () => {
    navigate('/signin');
    props.setSignErrorMessage("");
  }

  return (
    <section className="register">
      <div className="register__container">
        <img onClick={ () => navigate('/') } src={ logo } className="logo" alt="Логотип" />
        <h1 className="register__title">Добро пожаловать!</h1>
        <AuthForm
          regButtonText={ props.regButtonText }
          onSubmit={ onSubmit }
          handleInputChange={ handleInputChange }
          isFormValid={ isFormValid }
          values={ values }
          errors={ errors }
          signErrorMessage={ props.signErrorMessage }
          formRef={ formRef }
        />
        <div className="register__underform-text-container">
          <p className="register__text">Уже зарегистрированы?</p>
          <span onClick={ navigateToSignIn } className="register__button">Войти</span>
        </div>
      </div>
    </section>
  )
}

export default Register;