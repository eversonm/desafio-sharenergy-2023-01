import React, { useState } from "react";
import ProgressiveImage from "react-progressive-graceful-image";

import Button from "../shared/components/FormElements/Button";
import Input from "../shared/components/FormElements/Input";

import { VALIDATOR_REQUIRE } from "../shared/util/validators";
import statuses from "../shared/util/statuses";
import "./Cats.css";

const Cat = (props) => {
  const [imageLoader, setImageLoader] = useState("");

  const defaultImage =
    "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image-300x300.jpg";
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const authSubmitHandler = (event) => {
    event.preventDefault();
    const code = parseInt(event.target[0].value);
    if (statuses[code]) {
      setImageLoader(`https://http.cat/${code}`);
    } else {
      setImageLoader(
        `https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png`
      );
    }
  };
  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <div className="cats">
        <ProgressiveImage
          src={imageLoader}
          placeholder={defaultImage}
        >
          {(src, loading) => (
            <img
              className={`cats__img${loading ? " loading" : " loaded"}`}
              src={src}
              alt=""
            />
          )}
        </ProgressiveImage>
        <div className="center">
          <form className="cats-form" onSubmit={authSubmitHandler}>
            <Input
              element="input"
              id="name"
              type="number"
              label="Busque por um código HTTP"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid number"
              onInput={() => {}}
            />
            <Button type="submit">Procurar</Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cat;
