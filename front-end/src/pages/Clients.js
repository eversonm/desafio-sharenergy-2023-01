import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";

import Button from "../shared/components/FormElements/Button";
import ClientsList from "../components/ClientsList";

import "./Clients.css";

const Clients = () => {
  const auth = useContext(AuthContext);
  const clientId = useParams().clientId;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedClients, setLoadedClients] = useState([]);

  const clientDeletedHandler = (deletedClientId) => {
    setLoadedClients((prevClient) =>
      prevClient.filter((client) => client.id !== deletedClientId)
    );
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/clients/allClients`
          // "http://localhost:5000/api/clients/allClients"
        );

        setLoadedClients(responseData.clients);
      } catch (err) {
        setLoadedClients([]);
      }
    };
    fetchClients();
  }, [sendRequest, clientId]);

  return (
    <React.Fragment>
      <div className="client-button">
        <Button to="/newClient"> Cadastrar Cliente </Button>
      </div>
      {!isLoading && loadedClients && (
        <ClientsList
          items={loadedClients}
          onDeleteClient={clientDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Clients;
