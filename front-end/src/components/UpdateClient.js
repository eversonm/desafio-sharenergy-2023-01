import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import Card from "../shared/components/UIElements/Card";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import "./UpdateClient.css";

const UpdateClient = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedClient, setLoadedPlace] = useState();
  const clientId = useParams().clientId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
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
    },
    false
  );

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/clients/${clientId}`
          // `http://localhost:5000/api/clients/${clientId}`
        );
        setLoadedPlace(responseData.client);
        setFormData(
          {
            name: {
              value: responseData.name,
              isValid: true,
            },
            email: {
              value: responseData.email,
              isValid: true,
            },
            phone: {
              value: responseData.phone,
              isValid: true,
            },
            address: {
              value: responseData.address,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchClient();
  }, [sendRequest, clientId, setFormData]);

  const clientUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/clients/${clientId}`,
        // `http://localhost:5000/api/clients/${clientId}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          phone: formState.inputs.phone.value,
          address: formState.inputs.address.value,
        }),
        {
          "Content-Type": "application/json",
          "Authorization": `BEARER ${auth.token}`
        }
      );
      history.push("/clients");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <Card>
          <LoadingSpinner />
        </Card>
      </div>
    );
  }

  if (!loadedClient && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find Client!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedClient && (
        <form className="user-update" onSubmit={clientUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
            initialValue={loadedClient.name}
            initialValid={true}
          />
          <Input
            id="email"
            element="textarea"
            label="Email"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid email (min 5 characteres)."
            onInput={inputHandler}
            initialValue={loadedClient.email}
            initialValid={true}
          />
          <Input
            id="phone"
            element="textarea"
            label="Phone Number"
            validators={[VALIDATOR_MINLENGTH(12)]}
            errorText="Please enter a valid phone number (at least 12 characteres)."
            onInput={inputHandler}
            initialValue={loadedClient.phone}
            initialValid={true}
          />
          <Input
            id="address"
            element="textarea"
            type="text"
            label="Address"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid address (at least 5 characteres)."
            onInput={inputHandler}
            initialValue={loadedClient.address}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update Client
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateClient;
