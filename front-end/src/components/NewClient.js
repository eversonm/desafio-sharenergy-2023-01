import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "../shared/hooks/form-hook";
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";

import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../shared/util/validators";
import "./newClient.css"

const NewClient = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      cpf: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const clientSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/clients/newClient`,
        // "http://localhost:5000/api/clients/newClient",
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          phone: formState.inputs.phone.value,
          address: formState.inputs.address.value,
          cpf: formState.inputs.cpf.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `BEARER ${auth.token}`,
        }
      );
      history.push("/clients");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <form className="newclient-form" onSubmit={clientSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Nome Completo"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name!"
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email!"
          onInput={inputHandler}
        />
        <Input
          id="phone"
          element="input"
          label="Telefone"
          validators={[VALIDATOR_REQUIRE(12)]}
          errorText="Please enter a valid phone number!"
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Endereço"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address!"
          onInput={inputHandler}
        />
        <Input
          id="cpf"
          element="input"
          label="CPF"
          validators={[VALIDATOR_REQUIRE(11)]}
          errorText="Please enter a valid cpf!"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Adicionar Cliente
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewClient;
