import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/hooks/http-hook";
import "./styles.css";

const ClientItem = (props) => {
  const auth = useContext(AuthContext);

  const cpf = props.cpf;
  const cpf_security = cpf.slice(0, 3) + cpf.slice(2).replace(/.(?=...)/g, '*');

  const phone = props.phone.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
  const phone_security = phone.slice(0, 4) + phone.slice(3).replace(/.(?=...)/g, '*');


  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/clients/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: `BEARER ${auth.token}`,
        }
      );
      props.onDelete(props.id);
      // history.push("/clients");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and Delete this Client?</p>
      </Modal>
      <li className="user-item">
        <Card className="client-item">
          <div className="client-container">
            <div className="client-div">
              <h2>{props.name}</h2>
              <h3>Email: {props.email}</h3>
              <h3>Telefone: {phone_security}</h3>
              <h3>Endereço: {props.address}</h3>
              <h3>CPF: {cpf_security}</h3>
            </div>
            <div className="client-div-button">
              <div className="inner1">
                <Button to={`/clients/${props.id}`}>Editar</Button>
              </div>
              <div className="inner2">
                <Button onClick={showDeleteWarningHandler}>Apagar</Button>
              </div>
            </div>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ClientItem;
