import * as React from 'react';
import './AuthForm.css';
import '../../vendor/displayNone.css';

function AuthForm(props) {
  return (
    <form className="auth-form" onSubmit={ props.onSubmit } ref={ props.formRef } noValidate>
      <label className={ `auth-form__input-title ${ props.login && "display-none"}` }>Имя</label>
      <input
        type="text"
        className={ `auth-form__input ${ props.login && "display-none"}` }
        pattern="[a-zA-ZА-Яа-яЁё\s\-]+"
        name="name-input"
        value={ props.values["name-input"] }
        onChange={ props.handleInputChange }
        placeholder="Имя"
        minLength="2"
        maxLength="30"
        required={ props.login ? false : true}
      />
      <span className={ `auth-form__input-title auth-form__input-title_error ${ !props.errors["name-input"] ? "display-none" : ""}` }>{ props.errors["name-input"] }</span>
      <label className={ `auth-form__input-title ${ props.login && "auth-form__input-title_none-margin"}` }>E-mail</label>
      <input
        type="email"
        className="auth-form__input"
        pattern="^\S+@\S+\.\S+$"
        name="email-input"
        value={ props.values["email-input"] }
        onChange={ props.handleInputChange }
        placeholder="email@email.ru"
        required
      />
      <span className={ `auth-form__input-title auth-form__input-title_error ${ !props.errors["email-input"] ? "display-none" : ""}` }>{ props.errors["email-input"] }</span>
      <label className="auth-form__input-title">Пароль</label>
      <input
        type="password"
        className="auth-form__input"
        name="password-input"
        value={ props.values["password-input"] }
        onChange={ props.handleInputChange }
        placeholder="Пароль"
        minLength="2"
        maxLength="30"
        required
      />
      <span className={ `auth-form__input-title auth-form__input-title_error ${ !props.errors["password-input"] ? "display-none" : ""}` }>{ props.errors["password-input"] }</span>
      <span className={ `auth-form__error-message ${ props.login ? "auth-form__error-message_login": "" } ${ props.signErrorMessage === "" ? "display-none" : ""}` }>{ props.signErrorMessage }</span>
      <button
        type="submit"
        className={
          `auth-form__button
          ${ props.login ? "auth-form__button_login": "" }
          ${ props.isFormValid ? "" : "auth-form__button_disabled" }
          ${ props.signErrorMessage === "" ? "" : "auth-form__button_isError" }`
        }
        disabled={ props.isFormValid ? false : true }
      >{ props.login ? props.logButtonText : props.regButtonText }</button>
    </form>
  )
}

export default AuthForm;