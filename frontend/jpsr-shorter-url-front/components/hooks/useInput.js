const { useState } = require("react");

const useInput = (validateValue) => {
  const [value, setValue] = useState("");
  const [valueTouched, setValueTouched] = useState(false);

  const valueIsValid = validateValue(value);
  const valueIsInvalid = valueTouched && !valueIsValid;

  const handleChange = (e) => {
    setValue(e.target.value);
    setValueTouched(false);
  };

  const handleBlur = (e) => {
    setValueTouched(true);
  };

  const reset = () => {
    setValue("");
    setValueTouched(false);
  };

  return {
    value,
    valueIsValid,
    valueIsInvalid,
    handleChange,
    handleBlur,
    reset,
    setValueTouched,
  };
};
export default useInput;
