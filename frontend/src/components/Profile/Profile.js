import './Profile.css';
import CurrentUserContext from '../../Contexts/CurrentUserContext';
import FormValidation from '../FormValidation/FormValidation';
import { createRef, useContext, useEffect, useState } from 'react';
import mainApi from '../../utils/MainApi';
import auth from '../Auth/Auth';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [ isProfileInputsActive, setIsProfileInputsActive ] = useState(false);
  const [ profileSaveInfoErrorText, setProfileSaveInfoErrorText ] = useState('');
  const [ profileSaveButtonText, setProfileSaveButtonText ] = useState('Сохранить');
  const [ isInputsActive, setIsInputsActive ] = useState(false);

  const formRef = createRef();
  const { handleInputChange, isFormValid, values, errors, setValues } = FormValidation(
    formRef,
    { "name-input": currentUser.name, "email-input": currentUser.email },
    { "name-input": "", "email-input": "" }
  );
  const isInputsNew = values["name-input"] !== currentUser.name || values["email-input"] !== currentUser.email;

  useEffect(() => {
    setValues({ "name-input": currentUser.name, "email-input": currentUser.email });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentUser ]);

  function handleSubmit(e) {
    e.preventDefault();

    setProfileSaveButtonText('Сохранение...');

    onUpdateUser({ name: values["name-input"], email: values["email-input"] });
  }

  function handleInputsActive() {
    setIsInputsActive(true);
  }
  
  function onUpdateUser(data) {
    mainApi.updateCurrentUser(data)
    .then((userInfo) => {
      props.setCurrentUser({ name: userInfo.data.name, email: userInfo.data.email });
      handleProfileInputsActive();
      setProfileSaveInfoErrorText("");

      props.setNotification({ text: 'Данные успешно обновлены!', isActive: true, isGood: true });
      setTimeout(() => {
        props.setNotification(state => ({ ...state, text: '', isActive: false }));
      }, 3000);
    })
    .catch((err) => {
      if (err.status === 409) {
        setProfileSaveInfoErrorText("Пользователь с таким email уже существует.");
        return;
      }

      if (err.status === 500) {
        setProfileSaveInfoErrorText("На сервере произошла ошибка.")
      } else {
        setProfileSaveInfoErrorText("При обновлении профиля произошла ошибка.");
      }
    })
    .finally(() => {
      setProfileSaveButtonText('Сохранить');
      setIsInputsActive(false);
    })
  }

  function handleProfileInputsActive() {
    setIsProfileInputsActive(!isProfileInputsActive);
  }

  function onSignOut() {
    auth.signOut()
    .then(() => {
      props.setIsLoggedIn(false);
      props.setCurrentUser({ name: "", email: "" });
      localStorage.clear();
      setIsProfileInputsActive(false);
    })
    .catch((err) => {
      if (err.status === 500) {
        setProfileSaveInfoErrorText("На сервере произошла ошибка.")
      } else {
        setProfileSaveInfoErrorText("Не удалось выйти из аккаунта. Попробуйте через 2 минуты.");
      }
    })
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
            className={ `profile__input ${ isInputsActive ? "profile__input_active" : "" }` }
            minLength="2"
            maxLength="30"
            placeholder="Имя"
            required
            readOnly={ isInputsActive ? false : true }
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
            className={ `profile__input ${ isInputsActive ? "profile__input_active" : "" }` }
            minLength="2"
            maxLength="30"
            placeholder="Email"
            required
            readOnly={ isInputsActive ? false : true }
          />
        </div>
        <span className={`profile__save-info-error ${ profileSaveInfoErrorText === "" ? "" : "profile__save-info-error_active" }`}>{ profileSaveInfoErrorText }</span>
        <button
          type="submit"
          className={
            `profile__save-button
            ${ isInputsActive ? "profile__save-button_active" : "" }
            ${ isFormValid && isInputsNew ? "" : "profile__save-button_disabled" }
            ${ profileSaveInfoErrorText === "" ? "" : "profile__save-button_error" }`
          }
          disabled={ isFormValid && isInputsNew ? false : true }
        >{ profileSaveButtonText }</button>
      </form>
      <div className={`profile__button-container ${ profileSaveInfoErrorText === "" ? "" : "profile__button-container_error" }`}>
        <button
          type="button"
          onClick={ handleInputsActive }
          className={ `profile__edit-button ${ isInputsActive ? "profile__edit-button_display-none" : ""}` }
        >Редактировать</button>
        <button
          type="button"
          onClick={ onSignOut }
          className={ `profile__exit-button ${ isInputsActive ? "profile__exit-button_display-none" : ""}` }
        >Выйти из аккаунта</button>
      </div>
    </section>
  )
}

export default Profile;