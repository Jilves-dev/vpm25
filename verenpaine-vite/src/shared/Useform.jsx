import { useState } from 'react';

const useForm = (callback, initialState = {}, resetOnSubmit = true) => {
  const [values, setValues] = useState(initialState);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
    if (resetOnSubmit) resetValues();
  };

  const handleChange = (event) => {
    event.persist();
    let value = event.target.value;
    setValues(values => ({ ...values, [event.target.name]: value }));
  };

  const resetValues = () => {
    setValues(initialState);
  };

  return {
    handleSubmit,
    handleChange,
    resetValues,
    setValues,
    values
  };
};

export default useForm;