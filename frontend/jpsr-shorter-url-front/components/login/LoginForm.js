import Card from "../ui/Card";
import classes from "./LoginForm.module.css";
import useInput from "../hooks/useInput";
import { useRouter } from "next/router";
const validateEmail = (value) => {
  return value.includes("@");
};

const validatePassword = (value) => {
  return value.length >= 6;
};

function LoginForm(props) {
  const router = useRouter();
  const {
    value: email,
    valueIsValid: emailIsValid,
    valueIsInvalid: emailIsInvalid,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
    reset: resetEmail,
    setValueTouched: setEmailValueTouched,
  } = useInput(validateEmail);

  const {
    value: password,
    valueIsValid: passwordIsValid,
    valueIsInvalid: passwordIsInvalid,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
    reset: resetPassword,
    setValueTouched: setPasswordValueTouched,
  } = useInput(validatePassword);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
  function submitHandler(event) {
    event.preventDefault();
    setEmailValueTouched(true);
    setPasswordValueTouched(true);
    if (!formIsValid) {
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    props.addLoginData(loginData);

    resetEmail();
    resetPassword();
  }

  const emailClasses = emailIsInvalid
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const passwordClasses = passwordIsInvalid
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const handleBack = () => {
    router.push("/");
  };
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={emailClasses}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
        </div>
        {emailIsInvalid && (
          <p className={classes["error-text"]}>Please enter valid email.</p>
        )}
        <div className={passwordClasses}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
        </div>
        {passwordIsInvalid && (
          <p className={classes["error-text"]}>
            Please enter password more than 6 characters.
          </p>
        )}
        <div className={classes.backButton}>
          <button onClick={handleBack}>Volver</button>
        </div>
        <div className={classes.loginButton}>
          <button>Login</button>
        </div>
      </form>
    </Card>
  );
}

export default LoginForm;
