import React from "react";
import Card from "../../shared/components/UIElements/Card";
import "./styles.css";

const UserItem = (props) => {
  // const name =
  //   props.name.title + " " + props.name.first + " " + props.name.last;
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <div className="user-div">
          {/* <div className="user-item__image">
            <Avatar image={props.image} alt={props.name.first} />
          </div> */}
          <img className="user-item__img" src={props.image} alt={props.name.first} ></img>
          <div className="text">
            <h2>{props.name}</h2>
            <h3>email: {props.email}</h3>
            <h3>username: {props.username}</h3>
            <h3>idade: {props.age}</h3>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default UserItem;
