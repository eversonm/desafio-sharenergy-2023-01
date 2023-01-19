import React, { useState, useContext } from "react";

import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Checkbox from "../shared/components/FormElements/CheckBox";
import Button from "../shared/components/FormElements/Button";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../shared/util/validators";

import { useForm } from "../shared/hooks/form-hook";
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import "./Auth.css";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      remember: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    let expiration;
    if (formState.inputs.remember.value === "true") {
      expiration = new Date(new Date().getTime() + 1000 * 3600 * 24 * 15);
    } else {
      expiration = new Date(new Date().getTime() + 1000 * 3600);
    }
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        // "http://localhost:5000/api/users/login",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          remember: formState.inputs.remember.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.userId, responseData.token, expiration);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className="center">Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            id="email"
            element="input"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid e-mail address!"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characteres!"
            onInput={inputHandler}
          />
          <Checkbox
            id="remember"
            element="checkbox"
            type="checkbox"
            label="Remember Me"
            onInput={inputHandler}
            validators={[]}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Login
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
