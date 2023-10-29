import * as React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  function handleMoviesInputChange(e) {
    props.setMoviesInputValue(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    !props.isSavedMoviesPage && props.setIsPreloaderActive(true);

    props.onSubmitSearchForm(props.savedMoviesData);
  }

  return (
    <section className="search-form">
      <form className="search-form__container" onSubmit={ onSubmit } noValidate>
        <div className="search-form__search">
          <input
            className="search-form__input"
            placeholder="Фильм"
            value={ props.moviesInputValue }
            onChange={ handleMoviesInputChange }
            required
          />
          <button type="submit" className="search-form__search-button" />
        </div>
        <FilterCheckbox setCheckboxCondition={ props.setCheckboxCondition } checkboxCondition={ props.checkboxCondition } />
      </form>
    </section>
  )
}

export default SearchForm;