import React from "react";

import ClientItem from "../ClientItem";
import "./styles.css";

const ClientList = (props) => {
  console.log(props.items.length);
  if (props.items.length === 0) {
    return (
      <div className="center">
        <div>
          <h2>No Clients found!</h2>
        </div>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => {
        return (
          <ClientItem
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            phone={user.phone}
            address={user.address}
            cpf={user.cpf}
            onDelete={props.onDeleteClient}
          />
        );
      })}
    </ul>
  );
};

export default ClientList;
