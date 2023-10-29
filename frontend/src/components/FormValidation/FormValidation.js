import * as React from 'react';

export default function FormValidation(formRef, inputValues, errorValues) {
  const [ values, setValues ] = React.useState(inputValues);
  const [ errors, setErrors ] = React.useState(errorValues);
  const [ isFormValid, setIsFormValid ] = React.useState(false);

  const handleInputChange = (e) => {
    setValues({ ...values, [ e.target.name ]: e.target.value });
    if (e.target.name === "email-input" && e.target.validationMessage === "Используйте требуемый формат.") {
      setErrors({ ...errors, [ e.target.name ]: "Поле email должно соответствовать формату: email@email.ru" });
    } else {
      if (e.target.name === "name-input" && e.target.validationMessage === "Используйте требуемый формат.") {
        setErrors({ ...errors, [ e.target.name ]: "Поле name может содержать только латиницу и кириллицу, а также пробел или дефис." });
      } else {
        setErrors({ ...errors, [ e.target.name ]: e.target.validationMessage });
      }
      setIsFormValid(formRef.current.checkValidity());
    }
  }

  return { isFormValid, handleInputChange, values, errors, setValues };
}