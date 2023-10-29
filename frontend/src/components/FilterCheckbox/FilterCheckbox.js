import './FilterCheckbox.css';

function FilterCheckbox(props) {
  function handleCheckbox() {
    props.setCheckboxCondition((state) => {
      state = !state;
      localStorage.setItem("checkboxCondition", JSON.stringify(state));
      return state;
    });
  }

  return (
    <div className="filter-checkbox"> 
      <label className="filter-checkbox__label" htmlFor="filter-checkbox__label">
        <input type="checkbox" className="filter-checkbox__checkbox" id="filter-checkbox__label" onChange={ handleCheckbox } checked={ props.checkboxCondition ? true : false } />
        <span className="filter-checkbox__pseudo-item"></span>
        <h2 className="filter-checkbox__label-text">Короткометражки</h2>
      </label>
    </div>
  );
}

export default FilterCheckbox;
