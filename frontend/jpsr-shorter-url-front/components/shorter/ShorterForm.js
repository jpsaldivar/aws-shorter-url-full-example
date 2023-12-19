import Card from "../ui/Card";
import classes from "./ShorterForm.module.css";
import useInput from "../hooks/useInput";
import { useRouter } from "next/router";

const validateUrl = (value) => {
  return (value.includes(".") && value.includes("http"));
};


function ShorterForm(props) {
  const router = useRouter();

  let formIsValid = false;

  const {
    value: url,
    valueIsValid: urlIsValid,
    valueIsInvalid: urlIsInvalid,
    handleChange: handleUrlChange,
    handleBlur: handleUrlBlur,
    reset: resetUrl,
    setValueTouched: setUrlValueTouched,
  } = useInput(validateUrl);

  let newUrl = props.newUrl;

  if (urlIsValid) {
    formIsValid = true;
  }
  function submitHandler(event) {
    event.preventDefault();
    setUrlValueTouched(true);
    if (!formIsValid) {
      return;
    }

    const data = {
      url: url,
    };

    props.send(data);
    
  }



  const handleBack = () => {
    router.push("/");
  };
  
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={handleUrlChange}
            onBlur={handleUrlBlur}
          />
        </div>
        {urlIsInvalid && (
          <p className={classes["error-text"]}>Please enter valid URL. (with http or https)</p>
        )}

        <div className={classes.control}>
          <label htmlFor="newUrl">New URL</label>
          <input
            type="text"
            id="newUrl"
            value={newUrl}
            readOnly={true}
          />
        </div>

        <div className={classes.backButton}>
          <button onClick={handleBack}>Volver</button>
        </div>
        <div className={classes.loginButton}>
          <button>Generar</button>
        </div>
      </form>
    </Card>
  );
}

export default ShorterForm;
