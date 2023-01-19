import React, { useEffect, useState } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import { useHttpClient } from "../shared/hooks/http-hook";

import Button from "../shared/components/FormElements/Button";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import LoadingImage from "../shared/images/loading2.jpg"

import "./Dogs.css";

const Dogs = (props) => {
  const [imageLoaded, setImageLoaded] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchImage = async () => {
      const name = ["webm", "mp4"];
      let link;
      do {
        const responseData = await sendRequest("https://random.dog/woof.json");
        link = responseData.url;
      } while (name.includes(link.split(".").pop()));

      setImageLoaded(link);
    };
    fetchImage();
  }, [sendRequest]);

  const fetchNewImage = async () => {
    const name = ["webm", "mp4", "gif"];
    let link;
    do {
      const responseData = await sendRequest("https://random.dog/woof.json");
      link = responseData.url;
    } while (name.includes(link.split(".").pop()));

    setImageLoaded(link);
  };

  return (
    <React.Fragment>
      <div className="refresh-center">
        <Button type="submit" onClick={fetchNewImage}>
          Refresh
        </Button>
      </div>
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="avatar">
        <ProgressiveImage src={imageLoaded} placeholder={LoadingImage}>
          {(src, loading) => (
            <img
              className={`image${loading ? " loading" : " loaded"}`}
              src={src}
              alt=""
            />
          )}
        </ProgressiveImage>
        {/* {!isLoading && <img src={imageLoaded} />} */}
      </div>
    </React.Fragment>
  );
};

export default Dogs;
