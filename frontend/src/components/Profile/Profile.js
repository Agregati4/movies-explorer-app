import * as React from 'react';
import './Profile.css';
import CurrentUserContext from '../../Contexts/CurrentUserContext';
import FormValidation from '../FormValidation/FormValidation';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const formRef = React.createRef();
  const { handleInputChange, isFormValid, values, errors, setValues } = FormValidation(
    formRef,
    { "name-input": currentUser.name, "email-input": currentUser.email },
    { "name-input": "", "email-input": "" }
  );
  const isInputsNew = values["name-input"] !== currentUser.name || values["email-input"] !== currentUser.email;

  React.useEffect(() => {
    setValues({ "name-input": currentUser.name, "email-input": currentUser.email });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentUser ]);

  function handleSubmit(e) {
    e.preventDefault();

    props.setProfileSaveButtonText('Сохранение');

    props.onUpdateUser({ name: values["name-input"], email: values["email-input"] });
  }

  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${ currentUser.name }!`}</h1>
      <form className="profile__form" onSubmit={ handleSubmit } ref={ formRef } noValidate>
        <div className="profile__info-container">
          <span className={ `profile__input-error profile__input-error_type_top ${ errors["name-input"] === "" ? "" : "profile__input-error_active" }` }>{ errors["name-input"] }</span>
          <label className="profile__name">Имя</label>
          <input
            type="text"
            name="name-input"
            pattern="[a-zA-ZА-Яа-яЁё\s\-]+"
            onChange={ handleInputChange }
            value={ values["name-input"] }
            className={ `profile__input ${ props.isInputsActive ? "profile__input_active" : "" }` }
            minLength="2"
            maxLength="30"
            placeholder="Имя"
            required
            readOnly={ props.isInputsActive ? false : true }
          />
        </div>
        <div className="profile__info-container">
          <span className={ `profile__input-error profile__input-error_type_bottom ${ errors["email-input"] === "" ? "" : "profile__input-error_active" }` }>{ errors["email-input"] }</span>
          <label className="profile__name">E-mail</label>
          <input
            type="email"
            onChange={ handleInputChange }
            value={ values["email-input"] }
            name="email-input"
            className={ `profile__input ${ props.isInputsActive ? "profile__input_active" : "" }` }
            minLength="2"
            maxLength="30"
            placeholder="Email"
            required
            readOnly={ props.isInputsActive ? false : true }
          />
        </div>
        <span className={`profile__save-info-error ${ props.profileSaveInfoErrorText === "" ? "" : "profile__save-info-error_active" }`}>{ props.profileSaveInfoErrorText }</span>
        <button
          type="submit"
          className={
            `profile__save-button
            ${ props.isInputsActive ? "profile__save-button_active" : "" }
            ${ isFormValid && isInputsNew ? "" : "profile__save-button_disabled" }
            ${ props.profileSaveInfoErrorText === "" ? "" : "profile__save-button_error" }`
          }
          disabled={ isFormValid && isInputsNew ? false : true }
        >{ props.profileSaveButtonText }</button>
      </form>
      <div className={`profile__button-container ${ props.profileSaveInfoErrorText === "" ? "" : "profile__button-container_error" }`}>
        <button
          type="button"
          onClick={ props.handleInputsActive }
          className={ `profile__edit-button ${ props.isInputsActive ? "profile__edit-button_display-none" : ""}` }
        >Редактировать</button>
        <button
          type="button"
          onClick={ props.onSignOut }
          className={ `profile__exit-button ${ props.isInputsActive ? "profile__exit-button_display-none" : ""}` }
        >Выйти из аккаунта</button>
      </div>
    </section>
  )
}

export default Profile;